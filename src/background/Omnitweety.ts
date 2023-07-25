import TwitterText from 'twitter-text'
import { OAuthRequestHeader } from '../auth/OAuthHeader'
import { postSignedRequest } from '../auth/request'
import { ChromeDelegate } from '../ChromeDelegate'
import { Clock } from '../Clock'
import { AppConfig, TwitterConfig } from '../Config'
import accessTokenRepository from '../data/AccessTokenRepository'
import ConsumerKeys from '../data/ConsumerKeys'
import SubCommands from './SubCommands'
import { Logger } from '../logger'

interface TweetResponse {
  data: {
    id: string
    text: string
  }
}

class Omnitweety {
  private oAuthRequestHeader: OAuthRequestHeader | null = null

  private readonly clock: Clock

  private readonly logger: Logger

  constructor(clock: Clock, logger: Logger) {
    this.clock = clock
    this.logger = logger
  }

  async initialize() {
    const token = await accessTokenRepository.get()

    if (token.isAuthorized()) {
      this.oAuthRequestHeader = new OAuthRequestHeader(
        new ConsumerKeys(TwitterConfig.API_KEY, TwitterConfig.API_SECRET),
        token,
        this.clock
      )
    }
  }

  async isAuthorized(): Promise<boolean> {
    return await accessTokenRepository.isAuthorized()
  }

  async postStatus(message: string, chrome: ChromeDelegate) {
    if (!message || !this.oAuthRequestHeader) {
      this.logger.info(
        'message or oAuthRequestHeader is null',
        message,
        this.oAuthRequestHeader
      )
      return
    }

    const token = await accessTokenRepository.get()

    this.logger.debug('token', token)

    this.oAuthRequestHeader.updateAccessToken(token)

    try {
      const response = await postSignedRequest(
        new URL(TwitterConfig.URL_STATUS_UPDATE),
        { text: message },
        this.oAuthRequestHeader
      )

      const body = await response.json()

      if (!response.ok) {
        chrome.createNotification(
          './src/assets/icon_128.png',
          `Oops! there was an error: ${response.status}`,
          body?.errors?.[0]?.message || `Error: ${response.statusText}`
        )
        return
      }

      const res: TweetResponse = body
      chrome.createNotification(
        './src/assets/icon_128.png',
        AppConfig.NAME,
        res.data.text
      )
    } catch (error) {
      chrome.createNotification(
        './src/assets/icon_128.png',
        `Oops! there was an error`,
        `${error}`
      )
    }
  }

  async handleInputChangedEvent(text: string, chrome: ChromeDelegate) {
    if (!(await this.isAuthorized())) {
      chrome.showDefaultSuggestion(
        'To use Omnitweety, login to twitter first(press Enter to login)'
      )
      return
    }

    const subCommand = SubCommands.find((subCommand) => subCommand.test(text))
    if (subCommand) {
      subCommand.handleInputEvent(text, chrome)
      return
    }

    const parsedTweet = TwitterText.parseTweet(text)
    const message = `${280 - parsedTweet.weightedLength} characters left`
    chrome.showDefaultSuggestion(message)
  }

  async handleInputEnteredEvent(text: string, chrome: ChromeDelegate) {
    if (!(await this.isAuthorized())) {
      chrome.openOptionsPage()
      return
    }

    let message: string | null = text
    const subCommand = SubCommands.find((subCommand) => subCommand.test(text))
    if (subCommand) {
      message = await subCommand.handleEnterEvent(text, chrome)
    }

    if (message) {
      await this.postStatus(message, chrome)
    }
  }
}

export default Omnitweety
