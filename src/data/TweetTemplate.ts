import TwitterText from 'twitter-text'
import { TwitterConfig } from '../Config'

export default class TweetTemplate {
  public constructor(public readonly prefix: string) {
    // no-op
  }

  public buildTweet(userInput: string, title: string, url: string): string {
    const actualPrefix = userInput || this.prefix
    const baseMessage = `${actualPrefix} ${title}`
    const baseResultText = `${baseMessage} ${url}`
    const baseResult = TwitterText.parseTweet(baseResultText)

    if (baseResult.valid) {
      return baseResultText
    }
    const diff = TwitterConfig.STATUS_LENGTH - baseResult.weightedLength
    return `${baseMessage.slice(0, diff)} ${url}`
  }

  public static empty(): TweetTemplate {
    return new TweetTemplate('')
  }
}
