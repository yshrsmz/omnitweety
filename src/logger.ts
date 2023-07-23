import consola, { ConsolaInstance } from 'consola'
import { ChromeDelegate, DefaultChromeDelegate } from './ChromeDelegate'
import { ConfigDataSource } from './data/ConfigDataSource'
import debugRepository, { DebugRepository } from './data/DebugRepository'

export interface Logger {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  info(message?: any, ...optionalParams: any[]): void
}

class DefaultLogger implements Logger {
  private enabled = true

  constructor(
    private readonly consola: ConsolaInstance,
    private readonly chromeDelegate: ChromeDelegate,
    private readonly debugRepository: DebugRepository
  ) {
    chromeDelegate.onStorageChanged((changes) => {
      const { [ConfigDataSource.KEY_LOGGING_ACTIVE]: loggingActiveChange } =
        changes

      const { newValue = false } = loggingActiveChange ?? {}
      consola.level = newValue ? 4 : -999
    })

    debugRepository.isLoggingActive().then((loggingActive) => {
      consola.level = loggingActive ? 4 : -999
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  info(message?: any, ...optionalParams: any[]): void {
    this.consola.info(message, ...optionalParams)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  debug(message?: any, ...optionalParams: any[]): void {
    if (this.enabled) {
      this.consola.debug(message, ...optionalParams)
    }
  }
}

export default new DefaultLogger(
  consola,
  new DefaultChromeDelegate(chrome),
  debugRepository
)
