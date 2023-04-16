import AccessToken from '../data/AccessToken'
import ConsumerKeys from '../data/ConsumerKeys'

const percentEncode = (value: string): string => {
  return encodeURIComponent(value).replace(
    /[!'()*]/g,
    (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`
  )
}

const stringToUint8Array = (value: string): Uint8Array => {
  return Uint8Array.from(Array.from(value).map((char) => char.charCodeAt(0)))
}

const arrayBufferToBase64String = (arrayBuffer: ArrayBuffer): string => {
  const string = new Uint8Array(arrayBuffer)
    .reduce<string[]>((data, char) => {
      data.push(String.fromCharCode(char))
      return data
    }, [])
    .join('')

  return btoa(string)
}

export const createSignature = async (
  method: 'GET' | 'POST',
  url: URL,
  headers: Record<string, string>,
  requestBody: Record<string, string> | null,
  consumerKeys: ConsumerKeys,
  accessToken: AccessToken | null
): Promise<string> => {
  const oauthParameters = Object.keys(headers).reduce<Record<string, string[]>>(
    (data, key) => {
      data[key] = [headers[key]]
      return data
    },
    {}
  )
  url.searchParams.forEach((value, key) => {
    const current = oauthParameters[key] || []
    oauthParameters[key] = [...current, percentEncode(value)]
  })

  // It seems like we don't need to include request body in the signature
  // if (requestBody) {
  //   Object.keys(requestBody).forEach((key) => {
  //     const current = oauthParameters[key] || []
  //     oauthParameters[key] = [...current, percentEncode(requestBody[key])]
  //   })
  // }

  const params = Object.entries(oauthParameters)
    .sort(([keyA], [keyB]) => {
      if (keyA < keyB) return -1
      if (keyA > keyB) return 1
      return 0
    })
    .flatMap(([key, values]) => values.map((value) => `${key}=${value}`))
    .join('&')

  const requestUrl = new URL(url)
  requestUrl.searchParams.forEach((_value, key) => {
    requestUrl.searchParams.delete(key)
  })

  const baseString = [
    method,
    percentEncode(requestUrl.toString()),
    percentEncode(params),
  ].join('&')

  // console.log('baseString', baseString)

  const signingKey = [
    percentEncode(consumerKeys.secret),
    percentEncode(accessToken?.tokenSecret ?? ''),
  ].join('&')

  const signatureCryptoKey = await crypto.subtle.importKey(
    'raw',
    stringToUint8Array(signingKey),
    { name: 'HMAC', hash: 'SHA-1' },
    true,
    ['sign']
  )

  const signatureArrayBuffer = await crypto.subtle.sign(
    'HMAC',
    signatureCryptoKey,
    stringToUint8Array(baseString)
  )

  return percentEncode(arrayBufferToBase64String(signatureArrayBuffer))
}
