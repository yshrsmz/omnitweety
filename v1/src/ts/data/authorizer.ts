import { OAuth } from "oauth";

import { TwitterConfig } from "../common/config";
import AccessToken from "./access_token";

class Authorizer {

    private readonly apiKey: string;
    private readonly apiSecret: string;

    private oauthToken: string;
    private oauthTokenSecret: string;

    private readonly oauth: OAuth;

    constructor(apiKey: string, apiSecret: string) {
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;

        this.oauth = new OAuth(
            TwitterConfig.URL_REQUEST_TOKEN,
            TwitterConfig.URL_ACCESS_TOKEN,
            this.apiKey,
            this.apiSecret,
            "1.0A",
            null,
            "HMAC-SHA1",
        );
    }

    public request(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.oauth.getOAuthRequestToken((error, oauthToken, oauthTokenSecret, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                this.oauthToken = oauthToken;
                this.oauthTokenSecret = oauthTokenSecret;
                const authUrl = `${TwitterConfig.URL_AUTHORIZE}?oauth_token=${oauthToken}`;
                resolve(authUrl);
            });
        });
    }

    public accept(pinCode: string): Promise<AccessToken> {
        return new Promise<AccessToken>((resolve, reject) => {
            this.oauth.getOAuthAccessToken(
                this.oauthToken,
                this.oauthTokenSecret,
                pinCode,
                (error, oauthAccessToken, oauthAccessTokenSecret, results) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    console.log("accept:", oauthAccessToken, oauthAccessTokenSecret);
                    resolve(new AccessToken(oauthAccessToken, oauthAccessTokenSecret));
                });
        });
    }
}

export default new Authorizer(TwitterConfig.API_KEY, TwitterConfig.API_SECRET);
