export default class TweetTemplate {
    public constructor(
        public readonly prefix: string
    ) {
        // no-op
    }

    public static empty(): TweetTemplate {
        return new TweetTemplate('');
    }
}
