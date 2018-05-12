import { parseTweet } from 'twitter-text';
import { TwitterConfig } from '../Config';

export default class TweetTemplate {
    public constructor(
        public readonly prefix: string
    ) {
        // no-op
    }

    public buildTweet(userInput: string, title: string, url: string): string {
        let actualPrefix = userInput || this.prefix;
        let baseMessage = `${actualPrefix} ${title}`;
        let baseResultText = `${baseMessage} ${url}`;
        let baseResult = parseTweet(baseResultText);

        let resultText = '';
        if (baseResult.valid) {
            resultText = baseResultText;
        } else {
            let diff = TwitterConfig.STATUS_LENGTH - baseResult.weightedLength;
            resultText = `${baseMessage.slice(0, diff)} ${url}`;
        }
        return resultText;
    }

    public static empty(): TweetTemplate {
        return new TweetTemplate('');
    }
}
