export default class AccessToken {

    public readonly token: string;
    public readonly tokenSecret: string;

    constructor(
        token: string,
        tokenSecret: string
    ) {
        this.token = token;
        this.tokenSecret = tokenSecret;
    }
}
