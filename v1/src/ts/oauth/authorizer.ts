import { OAuth } from "oauth";

import { TwitterConfig } from "../common/config";
import AccessToken from "./access_token";

class Authorizer {

    private readonly apiKey: String;
    private readonly apiSecret: String;

    private oauthToken: String;
    private oauthTokenSecret: String;

    private readonly oauth: OAuth;

    constructor(apiKey: String, apiSecret: String) {
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

    public request(): Promise<String> {
        return new Promise<String>((resolve, reject) => {
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

    public accept(pinCode: String): Promise<AccessToken> {
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
