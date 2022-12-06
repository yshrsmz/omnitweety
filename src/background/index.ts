import { DefaultChromeDelegate } from '../ChromeDelegate'
import { DefaultClock } from '../Clock'
import Omnitweety from './Omnitweety'

declare const self: ServiceWorkerGlobalScope
export {}

const omnitweety = new Omnitweety(new DefaultClock())
omnitweety.initialize()

chrome.runtime.onInstalled.addListener(async () => {
  await self.skipWaiting()
  await new Promise((r) => setTimeout(r, 100))
  chrome.runtime.openOptionsPage()
})

chrome.omnibox.onInputChanged.addListener((text: string) => {
  omnitweety.handleInputChangedEvent(text, new DefaultChromeDelegate(chrome))
})

chrome.omnibox.onInputEntered.addListener((text: string) => {
  omnitweety.handleInputEnteredEvent(text, new DefaultChromeDelegate(chrome))
})
