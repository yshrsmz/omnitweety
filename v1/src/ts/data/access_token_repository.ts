import { TwitterConfig } from "../common/config";
import AccessToken from "./access_token";

class AccessTokenRepository {

    private readonly oauthTokenKey: string;
    private readonly oauthTokenSecretKey: string;

    constructor(oauthScope: string) {
        this.oauthTokenKey = `oauth_token${encodeURI(oauthScope)}`;
        this.oauthTokenSecretKey = `oauth_token_secret${encodeURI(oauthScope)}`;
    }

    public setAccessToken(token: AccessToken) {
        localStorage[this.oauthTokenKey] = token.token;
        localStorage[this.oauthTokenSecretKey] = token.tokenSecret;
    }

    public getAccessToken(): AccessToken {
        const token: string = localStorage[this.oauthTokenKey];
        const secret: string = localStorage[this.oauthTokenSecretKey];
        return new AccessToken(token, secret);
    }

    public isAuthorized(): boolean {
        return !!this.getAccessToken().token;
    }

    public clear() {
        delete localStorage[this.oauthTokenKey];
        delete localStorage[this.oauthTokenSecretKey];
    }
}

export default new AccessTokenRepository(TwitterConfig.OAUTH_SCOPE);
