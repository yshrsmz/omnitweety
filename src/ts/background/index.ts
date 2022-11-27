import { OAuth } from 'oauth'
import TwitterText from 'twitter-text'
import { AppConfig, TwitterConfig } from '../Config'
import accessTokenRepository from '../data/AccessTokenRepository'
import tweetTemplateRepository from '../data/TweetTemplateRepository'
import amazonAssociateRepository from '../data/AmazonAssociateRepository'
import SubCommands from '../SubCommands'
import {
  openOptionsPage,
  notify,
  showDefaultSuggestion,
  getCurrentPage,
  getAppVersion,
  sendSignedPostRequest,
  escapeOAuthText,
} from '../Util'

class Omnitweety {
  private readonly oauth: OAuth

  public constructor() {
    this.oauth = new OAuth(
      TwitterConfig.URL_REQUEST_TOKEN,
      TwitterConfig.URL_ACCESS_TOKEN,
      TwitterConfig.API_KEY,
      TwitterConfig.API_SECRET,
      '1.0A',
      null,
      'HMAC-SHA1'
    )

    accessTokenRepository.isAuthorized().then((authorized) => {
      if (!authorized) {
        openOptionsPage()
      }
    })

    this.handleEvents()
  }

  private isShareCommand(text: string): boolean {
    return (
      SubCommands.share.regex.test(text) ||
      SubCommands.share.textRegex.test(text)
    )
  }

  private isOptionsCommand(text: string): boolean {
    return SubCommands.options.regex.test(text)
  }

  private isVersionCommand(text: string): boolean {
    return SubCommands.version.regex.test(text)
  }

  private getShareCommandRegex(): RegExp {
    return SubCommands.share.textRegex
  }

  private getUserInputContent(text: string, regex: RegExp): string | null {
    const ary = regex.exec(text)
    // return first match or null
    if (ary && ary.length > 1) {
      return ary[1]
    } else {
      return null
    }
  }

  private getVersionString(): string {
    return `I'm using Omnitweety for Chrome Version ${getAppVersion()} - ${
      AppConfig.URL_CHROME_WEBSTORE
    }`
  }

  private handleEvents(): void {
    this.handleInputChangedEvent()
    this.handleInputEnteredEvent()
  }

  private handleInputChangedEvent(): void {
    chrome.omnibox.onInputChanged.addListener((text: string) => {
      accessTokenRepository.isAuthorized().then((authorized) => {
        if (!authorized) {
          showDefaultSuggestion(
            'To use Omnitweety, login to twitter first(press Enter to login)'
          )
          return
        }

        if (this.isShareCommand(text)) {
          getCurrentPage().then(async (page: chrome.tabs.Tab) => {
            const template = await tweetTemplateRepository.get()
            const associate = await amazonAssociateRepository.get()
            let message = 'unable to share this page'
            if (page) {
              message = template.buildTweet(
                this.getUserInputContent(text, this.getShareCommandRegex()),
                page.title,
                associate.buildAssociateUrlOrReturnAsIs(new URL(page.url))
              )
            }

            showDefaultSuggestion(message)
          })
        } else if (this.isOptionsCommand(text)) {
          showDefaultSuggestion('Open options page')
        } else if (this.isVersionCommand(text)) {
          showDefaultSuggestion(this.getVersionString())
        } else {
          const lengthInfo = TwitterText.parseTweet(text)
          const message = `${
            280 - lengthInfo.weightedLength
          } characters remaining.`
          showDefaultSuggestion(message)
        }
      })
    })
  }

  private handleInputEnteredEvent(): void {
    chrome.omnibox.onInputEntered.addListener((text: string) => {
      accessTokenRepository.isAuthorized().then((authorized) => {
        if (!authorized) {
          openOptionsPage()
          return
        }

        if (this.isShareCommand(text)) {
          getCurrentPage().then(async (page: chrome.tabs.Tab) => {
            const template = await tweetTemplateRepository.get()
            const associate = await amazonAssociateRepository.get()
            const message = template.buildTweet(
              this.getUserInputContent(text, this.getShareCommandRegex()),
              page.title,
              associate.buildAssociateUrlOrReturnAsIs(new URL(page.url))
            )
            this.postStatus(message)
          })
        } else if (this.isOptionsCommand(text)) {
          openOptionsPage()
        } else if (this.isVersionCommand(text)) {
          this.postStatus(this.getVersionString())
        } else {
          this.postStatus(text)
        }
      })
    })
  }

  private async postStatus(message: string): Promise<void> {
    const token = await accessTokenRepository.get()
    sendSignedPostRequest<TweetResponse>(this.oauth, {
      url: `${TwitterConfig.URL_STATUS_UPDATE}?status=${escapeOAuthText(
        message
      )}`,
      oauthToken: token,
      body: null,
      contentType: 'text/plain',
    })
      .then((res) => {
        notify(res.user.profile_image_url_https, res.user.name, res.text)
      })
      .catch((e) => {
        console.log(e)
        const actual = JSON.parse(e.data)
        notify(
          './assets/icon_128.png',
          'Oops! There was an error.',
          actual.errors[0].message
        )
      })
  }
}

interface TweetResponse {
  user: {
    profile_image_url_https: string
    name: string
  }
  text: string
}

new Omnitweety()
