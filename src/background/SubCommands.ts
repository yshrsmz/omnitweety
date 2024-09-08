import { ChromeDelegate } from '../ChromeDelegate'
import { AppConfig } from '../Config'
import amazonAssociateRepository, {
  AmazonAssociateRepository,
} from '../data/AmazonAssociateRepository'
import tweetTemplateRepository, {
  TweetTemplateRepository,
} from '../data/TweetTemplateRepository'

export interface SubCommand {
  name: string
  description: string
  test: (command: string) => boolean
  handleInputEvent: (command: string, chrome: ChromeDelegate) => Promise<void>

  /**
   * @return message string to tweet or null
   */
  handleEnterEvent: (
    command: string,
    chrome: ChromeDelegate
  ) => Promise<string | null>
}

class Options implements SubCommand {
  name = ':options'
  description = 'Open options page'

  test(command: string): boolean {
    return /^:options(\s*|\s+[\w\W]*)$/i.test(command)
  }

  // @ts-expect-error
  async handleInputEvent(command: string, chrome: ChromeDelegate) {
    chrome.showDefaultSuggestion('Open options page')
  }

  // @ts-expect-error
  async handleEnterEvent(command: string, chrome: ChromeDelegate) {
    chrome.openOptionsPage()
    return null
  }
}

class Version implements SubCommand {
  name = ':version'
  description = `Show Omnitweety's version`

  test(command: string): boolean {
    return /^:version(\s*|\s+[\w\W]*)$/i.test(command)
  }

  private buildVersionString(chrome: ChromeDelegate): string {
    const version = chrome.appVersion()
    const url = AppConfig.URL_CHROME_WEBSTORE
    return `I'm using Omnitweety for Chrome Version ${version} - ${url}`
  }

  // @ts-expect-error
  async handleInputEvent(command: string, chrome: ChromeDelegate) {
    chrome.showDefaultSuggestion(this.buildVersionString(chrome))
  }

  // @ts-expect-error
  async handleEnterEvent(command: string, chrome: ChromeDelegate) {
    return this.buildVersionString(chrome)
  }
}

class Share implements SubCommand {
  name = ':share'
  description = 'Share url to twitter'

  constructor(
    private readonly tweetTemplateRepository: TweetTemplateRepository,
    private readonly amazonAssociateRepository: AmazonAssociateRepository
  ) {}

  test(command: string) {
    return /^:share(\s*|\s+[\w\W]*)$/i.test(command)
  }

  async buildShareMessage(command: string, chrome: ChromeDelegate) {
    const currentPage = await chrome.currentPage()
    const template = await this.tweetTemplateRepository.get()
    const associate = await this.amazonAssociateRepository.get()

    let message = 'unable to share this page'
    if (currentPage && currentPage.url && currentPage.title) {
      const userInput = (() => {
        const match = /^:share\s+([\w\W]+)$/i.exec(command)
        if (match && match.length > 1) {
          return match[1]
        } else {
          return null
        }
      })()

      message = template.buildTweet(
        userInput ?? '',
        currentPage.title,
        associate.buildAssociateUrlOrReturnAsIs(new URL(currentPage.url))
      )
    }
    return message
  }

  async handleInputEvent(command: string, chrome: ChromeDelegate) {
    chrome.showDefaultSuggestion(await this.buildShareMessage(command, chrome))
  }

  async handleEnterEvent(command: string, chrome: ChromeDelegate) {
    return await this.buildShareMessage(command, chrome)
  }
}

export default [
  new Options(),
  new Version(),
  new Share(tweetTemplateRepository, amazonAssociateRepository),
]
