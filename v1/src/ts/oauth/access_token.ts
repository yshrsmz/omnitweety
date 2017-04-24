export default class AccessToken {

    public readonly token: String;
    public readonly tokenSecret: String;

    constructor(token: String, tokenSecret: String) {
        this.token = token;
        this.tokenSecret = tokenSecret;
    }
}
