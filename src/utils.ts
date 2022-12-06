export type Chrome = typeof chrome

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

export const openNewTab = function (url: string, active: boolean): void {
  chrome.tabs.create({ url, active })
}
