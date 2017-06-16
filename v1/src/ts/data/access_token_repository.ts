import { TwitterConfig } from "../common/config";
import AccessToken from "./access_token";
import configDataStore from "./config_datastore";

class AccessTokenRepository {

    constructor() {
    }

    public set(token: AccessToken) {
        configDataStore.setAccessToken(token.token);
        configDataStore.setAccessTokenSecret(token.tokenSecret);
    }

    public get(): AccessToken {
        const token: string = configDataStore.getAccessToken();
        const secret: string = configDataStore.getAccessTokenSecret();
        return new AccessToken(token, secret);
    }

    public isAuthorized(): boolean {
        return !!this.get().token;
    }

    public clear() {
        configDataStore.clearAccessToken();
        configDataStore.clearAccesTokenSecret();
    }
}

export default new AccessTokenRepository();
