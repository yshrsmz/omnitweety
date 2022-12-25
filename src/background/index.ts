import { DefaultChromeDelegate } from '../ChromeDelegate'
import { DefaultClock } from '../Clock'
import logger from '../logger'
import Omnitweety from './Omnitweety'

declare const self: ServiceWorkerGlobalScope
export {}

const omnitweety = new Omnitweety(new DefaultClock())
omnitweety.initialize()

chrome.runtime.onInstalled.addListener(async (detail) => {
  await self.skipWaiting()
  await new Promise((r) => setTimeout(r, 100))

  logger.info("onInstalled:", detail)
  if (detail.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.runtime.openOptionsPage()
  }
})

chrome.omnibox.onInputChanged.addListener((text: string) => {
  logger.debug('onInputChanged', text)
  omnitweety.handleInputChangedEvent(text, new DefaultChromeDelegate(chrome))
})

chrome.omnibox.onInputEntered.addListener((text: string) => {
  logger.debug('onInputEntered', text)
  omnitweety.handleInputEnteredEvent(text, new DefaultChromeDelegate(chrome))
})
