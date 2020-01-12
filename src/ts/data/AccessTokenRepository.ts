import AccessToken from './AccessToken';
import configDataSource from './ConfigDataSource';

class AccessTokenRepository {

  public set(token: AccessToken): void {
    configDataSource.setAccessToken(token.token);
    configDataSource.setAccessTokenSecret(token.tokenSecret);
  }

  public get(): AccessToken {
    const token: string = configDataSource.getAccessToken();
    const secret: string = configDataSource.getAccessTokenSecret();
    return new AccessToken(token, secret);
  }

  public isAuthorized(): boolean {
    return this.get().isAuthorized();
  }

  public clear(): void {
    configDataSource.clearAccessToken();
    configDataSource.clearAccesTokenSecret();
  }
}

export default new AccessTokenRepository();
