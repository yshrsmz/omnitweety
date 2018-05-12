import { OAuth } from 'oauth';
import { TwitterConfig } from '../Config';
import AccessToken from '../data/AccessToken';

class AuthFlow {

    private oauth: OAuth;

    private oauthToken: string;
    private oauthTokenSecret: string;

    public constructor(){
        this.oauth = new OAuth(
            TwitterConfig.URL_REQUEST_TOKEN,
            TwitterConfig.URL_ACCESS_TOKEN,
            TwitterConfig.API_KEY,
            TwitterConfig.API_SECRET,
            '1.0A',
            null,
            'HMAC-SHA1'
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
                (error, accessToken: string, accessTokenSecret: string, results) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(new AccessToken(accessToken, accessTokenSecret));
                }
            );
        });
    }
}

export default new AuthFlow();
