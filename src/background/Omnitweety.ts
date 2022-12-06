import TwitterText from 'twitter-text'
import { OAuthRequestHeader } from '../auth/OAuthHeader'
import { postSignedRequest } from '../auth/request'
import { ChromeDelegate } from '../ChromeDelegate'
import { Clock } from '../Clock'
import { TwitterConfig } from '../Config'
import accesstokenRepository from '../data/accesstokenRepository'
import ConsumerKeys from '../data/ConsumerKeys'
import { escapeOAuthText } from '../utils'
import SubCommands from './SubCommands'

interface TweetResponse {
  user: {
    profile_image_url_https: string
    name: string
  }
  text: string
}

class Omnitweety {
  private oAuthRequestHeader: OAuthRequestHeader | null = null

  private readonly clock: Clock

  constructor(clock: Clock) {
    this.clock = clock
  }

  async initialize() {
    const token = await accesstokenRepository.get()

    if (token.isAuthorized()) {
      this.oAuthRequestHeader = new OAuthRequestHeader(
        new ConsumerKeys(TwitterConfig.API_KEY, TwitterConfig.API_SECRET),
        token,
        this.clock
      )
    }
  }

  async isAuthorized(): Promise<boolean> {
    return await accesstokenRepository.isAuthorized()
  }

  async postStatus(message: string, chrome: ChromeDelegate) {
    if (!message || !this.oAuthRequestHeader) {
      return
    }

    this.oAuthRequestHeader.updateAccessToken(await accesstokenRepository.get())

    // URLSearchParams encode space as '+', but Twitter API requires '%20'
    const url = new URL(
      `${TwitterConfig.URL_STATUS_UPDATE}?status=${escapeOAuthText(message)}`
    )

    try {
      const response = await postSignedRequest(
        url,
        null,
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
        res.user.profile_image_url_https,
        res.user.name,
        res.text
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
