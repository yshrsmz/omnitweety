export default class AccessToken {

    public readonly token: string;
    public readonly tokenSecret: string;

    public constructor(
        token: string,
        tokenSecret: string
    ) {
        this.token = token;
        this.tokenSecret = tokenSecret;
    }

    public isAuthorized(): boolean {
        return !!this.token || !!this.tokenSecret;
    }

    public static empty(): AccessToken {
        return new AccessToken('', '');
    }
}
