export default class AccessToken {

    public readonly token;
    public readonly tokenSecret;

    constructor(token: String, tokenSecret: String) {
        this.token = token;
        this.tokenSecret = tokenSecret;
    }
}
