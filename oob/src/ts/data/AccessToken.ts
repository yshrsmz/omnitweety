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

    isAuthorized(): boolean {
        return !!this.token || !!this.tokenSecret;
    }

    static empty(): AccessToken {
        return new AccessToken("", "");
    }
}
