import AccessToken from "./access_token";

class AccessTokenRepository {

    private readonly oauthTokenKey: string;
    private readonly oauthTokenSecretKey: string;

    constructor(oauthScope: string) {
        this.oauthTokenKey = `oauth_token${encodeURI(oauthScope)}`;
        this.oauthTokenSecretKey = `oauth_token_secret${encodeURI(oauthScope)}`;
    }

    setAccessToken(token: AccessToken) {
        localStorage[this.oauthTokenKey] = token.token;
        localStorage[this.oauthTokenSecretKey] = token.tokenSecret;
    }

    getAccessToken(): AccessToken {
        const token: string = localStorage[this.oauthTokenKey];
        const secret: string = localStorage[this.oauthTokenSecretKey];
        return new AccessToken(token, secret);
    }

    clear() {
        delete localStorage[this.oauthTokenKey];
        delete localStorage[this.oauthTokenSecretKey];
    }
}
