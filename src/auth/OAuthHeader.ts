import { Clock } from '../Clock'
import AccessToken from '../data/AccessToken'
import ConsumerKeys from '../data/ConsumerKeys'
import nonceGenerator, { NonceGenerator } from './nonce'
import { OAuthConfig } from './OAuthConfig'
import { createSignature } from './signing'

export interface AuthHeader {
  applyAuthHeader(
    method: 'POST' | 'GET',
    url: URL,
    body: Record<string, string> | null,
    headers: Headers
  ): Promise<Headers>
}

export class OAuthFlowHeader implements AuthHeader {
  constructor(
    private readonly consumerKeys: ConsumerKeys,
    // @ts-expect-error - injected for future OAuth config extensions
    private readonly oAuthConfig: OAuthConfig,
    private readonly clock: Clock,
    private readonly nonceGen: NonceGenerator = nonceGenerator
  ) {}

  applyAuthHeader(
    method: 'POST' | 'GET',
    url: URL,
    body: Record<string, string> | null,
    headers: Headers
  ): Promise<Headers> {
    return applyRequestHeaders(
      method,
      url,
      body,
      headers,
      this.clock,
      this.nonceGen,
      this.consumerKeys,
      null
    )
  }
}

export class OAuthRequestHeader implements AuthHeader {
  constructor(
    private readonly consumerKeys: ConsumerKeys,
    private accessToken: AccessToken,
    private readonly clock: Clock,
    private readonly nonceGen: NonceGenerator = nonceGenerator
  ) {}

  public updateAccessToken(accessToken: AccessToken) {
    this.accessToken = accessToken
  }

  applyAuthHeader(
    method: 'POST' | 'GET',
    url: URL,
    body: Record<string, string> | null,
    headers: Headers
  ): Promise<Headers> {
    return applyRequestHeaders(
      method,
      url,
      body,
      headers,
      this.clock,
      this.nonceGen,
      this.consumerKeys,
      this.accessToken
    )
  }
}

const initialBaseNonSignedOAuthHeaders = (
  consumerKeys: ConsumerKeys,
  accessToken: AccessToken | null,
  nonce: string,
  timestamp: string
): Record<string, string> => {
  return {
    oauth_consumer_key: consumerKeys.key,
    ...(accessToken ? { oauth_token: accessToken.token } : {}),
    oauth_nonce: nonce,
    oauth_signature_method: 'HMAC-SHA1',
    oauth_version: '1.0',
    oauth_timestamp: timestamp,
  }
}

const applyRequestHeaders = async (
  method: 'GET' | 'POST',
  url: URL,
  requestBody: Record<string, string> | null,
  headers: Headers,
  clock: Clock,
  nonceGenerator: NonceGenerator,
  consumerKeys: ConsumerKeys,
  accessToken: AccessToken | null,
  extraHeaders: Record<string, string> = {}
): Promise<Headers> => {
  const authHeaderValues = (() => {
    const initial = initialBaseNonSignedOAuthHeaders(
      consumerKeys,
      accessToken,
      nonceGenerator.newNonce(),
      `${clock.currentTimeSeconds()}`
    )
    return { ...initial, ...extraHeaders }
  })()

  const signature = await createSignature(
    method,
    url,
    authHeaderValues,
    requestBody,
    consumerKeys,
    accessToken
  )

  const authHeader = Object.entries({
    ...authHeaderValues,
    oauth_signature: signature,
  })
    .map(([key, value]) => `${key}=${value}`)
    .join(',')

  headers.append('Authorization', `OAuth ${authHeader}`)

  return headers
}
