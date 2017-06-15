export default class AccessToken {
    constructor(public readonly token: string,
                public readonly tokenSecret: string) {
        // no-op
    }
}
