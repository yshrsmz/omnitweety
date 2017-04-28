export function navigateToOptionsPage() {
    chrome.tabs.create({ url: chrome.extension.getURL("options.html") });
}

export function navigateToAuthPage() {
    chrome.tabs.create({ url: chrome.extension.getURL("oauth.html") });
}
