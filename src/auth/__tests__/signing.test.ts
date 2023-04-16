/**
 * @vitest-environment jsdom
 */

import { expect, describe, it } from 'vitest'
import AccessToken from '../../data/AccessToken'
import ConsumerKeys from '../../data/ConsumerKeys'
import { createSignature } from '../signing'
import { TwitterConfig } from '../../Config'

describe('createSignature', () => {
  it('test', async () => {
    const result = await createSignature(
      'POST',
      new URL(TwitterConfig.URL_STATUS_UPDATE),
      {
        oauth_consumer_key: TwitterConfig.API_KEY,
        oauth_nonce: 'nonce',
        oauth_signature_method: 'HMAC-SHA1',
        oauth_timestamp: '1670316508',
        oauth_version: '1.0',
      },
      null,
      new ConsumerKeys(TwitterConfig.API_KEY, TwitterConfig.API_SECRET),
      new AccessToken('access_token', 'access_token_secret')
    )

    expect(result).toBe('nelLkI0KxaosWP3yfcqGcp4AniI%3D')
  })
})
