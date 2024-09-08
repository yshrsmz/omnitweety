import { Clock, DefaultClock } from '../Clock'
import { TwitterConfig } from '../Config'
import AccessToken from '../data/AccessToken'
import ConsumerKeys from '../data/ConsumerKeys'
import { OAuthConfig } from './OAuthConfig'
import { OAuthFlowHeader } from './OAuthHeader'
import { postSignedRequest } from './request'

export class AuthFlow {
  private readonly authHeader: OAuthFlowHeader

  private oauthToken = ''
  // @ts-expect-error
  private oauthTokenSecret = ''

  constructor(
    consumerKeys: ConsumerKeys,
    oAuthConfig: OAuthConfig,
    clock: Clock = new DefaultClock()
  ) {
    this.authHeader = new OAuthFlowHeader(consumerKeys, oAuthConfig, clock)
  }

  public async fetchRequestToken(): Promise<string> {
    const url = new URL(TwitterConfig.URL_REQUEST_TOKEN)
    url.searchParams.append('oauth_callback', 'oob')
    const response: Response = await postSignedRequest(url, {}, this.authHeader)

    const responseParams = new URLSearchParams(await response.text())
    this.oauthToken = responseParams.get('oauth_token') || ''
    this.oauthTokenSecret = responseParams.get('oauth_token_secret') || ''

    return this.oauthToken
  }

  public async fetchAccessToken(oauthVerifier: string): Promise<AccessToken> {
    const url = new URL(TwitterConfig.URL_ACCESS_TOKEN)
    url.searchParams.append('oauth_verifier', oauthVerifier)
    url.searchParams.append('oauth_token', this.oauthToken)
    const response: Response = await postSignedRequest(url, {}, this.authHeader)

    const responseParams = new URLSearchParams(await response.text())
    const accessToken = responseParams.get('oauth_token') || ''
    const accessTokenSecret = responseParams.get('oauth_token_secret') || ''

    return new AccessToken(accessToken, accessTokenSecret)
  }
}
