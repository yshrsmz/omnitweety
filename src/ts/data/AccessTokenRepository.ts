import AccessToken from './AccessToken'
import configDataSource from './ConfigDataSource'

class AccessTokenRepository {
  public async set(token: AccessToken): Promise<void> {
    await configDataSource.setAccessTokenValues({
      token: token.token,
      secret: token.tokenSecret,
    })
  }

  public async get(): Promise<AccessToken> {
    const { token, secret } = await configDataSource.getAccessTokenValues()
    return new AccessToken(token, secret)
  }

  public async isAuthorized(): Promise<boolean> {
    return (await this.get()).isAuthorized()
  }

  public async clear(): Promise<void> {
    await configDataSource.clearAccessTokenValues()
  }
}

export default new AccessTokenRepository()
