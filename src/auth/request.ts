import { AuthHeader } from './OAuthHeader'

export const postSignedRequest = async (
  url: URL,
  body: Record<string, string> | null,
  oauthHeader: AuthHeader
): Promise<Response> => {
  const headers = await (async () => {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    return await oauthHeader.applyAuthHeader('POST', url, body, headers)
  })()

  // return Promise.resolve('') as T

  return await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: headers,
    body: JSON.stringify(body),
  })
}

export const getSignedRequest = async (
  url: URL,
  oauthHeader: AuthHeader
): Promise<Response> => {
  const headers = await (async () => {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    return await oauthHeader.applyAuthHeader('GET', url, null, headers)
  })()

  return await fetch(url, {
    method: 'GET',
    credentials: 'include',
    headers: headers,
  })
}
