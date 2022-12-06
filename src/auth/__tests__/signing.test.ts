/**
 * @vitest-environment jsdom
 */

import { expect, describe, it } from 'vitest'
import AccessToken from '../../data/AccessToken'
import ConsumerKeys from '../../data/ConsumerKeys'
import { createSignature } from '../signing'

describe('createSignature', () => {
  it('test', async () => {
    const result = await createSignature(
      'POST',
      new URL(
        'https://api.twitter.com/1.1/statuses/update.json?status=test%20test'
      ),
      {
        oauth_consumer_key: 'consumer_key',
        oauth_nonce: 'nonce',
        oauth_signature_method: 'HMAC-SHA1',
        oauth_timestamp: '1670316508',
        oauth_versionn: '1.0',
      },
      null,
      new ConsumerKeys('consumer_key', 'consumer_secret'),
      new AccessToken('access_token', 'access_token_secret')
    )

    expect(result).toBe('bvJQJI5Sn0nzGx5dM6womvqW3BQ%3D')
  })
})
