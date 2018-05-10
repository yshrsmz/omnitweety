import AccessToken from "./AccessToken";
import configDataSource from "./ConfigDataSource";

class AccessTokenRepository {

    set(token: AccessToken) {
        configDataSource.setAccessToken(token.token);
        configDataSource.setAccessTokenSecret(token.tokenSecret);
    }

    get(): AccessToken {
        const token: string = configDataSource.getAccessToken();
        const secret: string = configDataSource.getAccessTokenSecret();
        return new AccessToken(token, secret);
    }

    isAuthorized(): boolean {
        return this.get().isAuthorized();
    }

    clear() {
        configDataSource.clearAccessToken();
        configDataSource.clearAccesTokenSecret();
    }
}

export default new AccessTokenRepository();
