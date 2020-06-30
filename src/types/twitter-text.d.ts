// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/twitter-text/index.d.ts
declare module 'twitter-text' {
  export interface ParseTweetOptions {
    version?: number
    maxWeightedTweetLength?: number
    scale?: number
    defaultWeight?: number
    transformedURLLength?: number
    ranges?: Array<{
      start: number
      end: number
      weight: number
    }>
  }

  export interface ParsedTweet {
    weightedLength: number
    permillage: number
    valid: boolean
    displayRangeEnd: number
    displayRangeStart: number
    validRangeEnd: number
    validRangeStart: number
  }

  function parseTweet(text: string, options?: ParseTweetOptions): ParsedTweet

  const TwitterText: {
    parseTweet: typeof parseTweet
  }

  export default TwitterText
}
