import { OAuth } from 'oauth'
import AccessToken from './data/AccessToken'

export const openNewTab = function (url: string, active: boolean): void {
  chrome.tabs.create({ url, active })
}

export const openOptionsPage = function (): void {
  chrome.runtime.openOptionsPage(null)
}

export const notify = function (
  iconUrl: string,
  title: string,
  message: string
): void {
  chrome.notifications.create(
    'omnitweety',
    {
      type: 'basic',
      iconUrl: iconUrl,
      title: title,
      message: message,
    },
    (id) => {
      window.setTimeout(() => {
        chrome.notifications.clear(id, null)
      }, 3000)
    }
  )
}

export const escapeText = function (text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export const escapeOAuthText = function (text: string): string {
  return encodeURIComponent(text)
    .replace(/!/g, '%21')
    .replace(/\*/g, '%2A')
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
}

export const showDefaultSuggestion = function (message: string): void {
  chrome.omnibox.setDefaultSuggestion({ description: escapeText(message) })
}

export const getCurrentPage = function (): Promise<chrome.tabs.Tab | null> {
  return new Promise<chrome.tabs.Tab | null>((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (pages) => {
      if (pages.length > 0) {
        resolve(pages[0])
      } else {
        reject(null)
      }
    })
  })
}

export const getAppVersion = function (): string {
  return chrome.runtime.getManifest().version
}

interface OAuthPostOptions {
  url: string
  oauthToken: AccessToken
  body: string
  contentType: string
}

export const sendSignedPostRequest = function <T>(
  oauth: OAuth,
  options: OAuthPostOptions
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    oauth.post(
      options.url,
      options.oauthToken.token,
      options.oauthToken.tokenSecret,
      options.body,
      options.contentType,
      (err, result: string) => {
        if (err) {
          reject(err)
          return
        }
        resolve(JSON.parse(result))
      }
    )
  })
}

interface OAuthGetOptions {
  url: string
  oauthToken: AccessToken
}
export const sendSignedGetRequest = function <T>(
  oauth: OAuth,
  options: OAuthGetOptions
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    oauth.get(
      options.url,
      options.oauthToken.token,
      options.oauthToken.tokenSecret,
      (err, result: string) => {
        if (err) {
          reject(err)
          return
        }
        resolve(JSON.parse(result))
      }
    )
  })
}
