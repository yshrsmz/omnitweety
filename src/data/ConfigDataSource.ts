import { AppConfig } from '../Config'
import consola from 'consola'

const load = async <T extends { [key: string]: string | number | boolean }>(
  keysAndDefaults: T
): Promise<{ [K in keyof T]: T[K] }> => {
  return new Promise((resolve) => {
    chrome.storage.local.get(keysAndDefaults, (data) =>
      resolve(data as { [K in keyof T]: T[K] })
    )
  })
}

const save = async (
  values: Record<string, string | number | boolean>
): Promise<void> => {
  return new Promise((resolve) => {
    chrome.storage.local.set(values, () => resolve())
  })
}

const remove = async (keys: string[]): Promise<void> => {
  return new Promise((resolve) => {
    chrome.storage.local.remove(keys, () => resolve())
  })
}

type AccessTokenValues = {
  token: string
  secret: string
}

type AmazonAssociateValues = {
  domain: string
  associateId: string
}

export class ConfigDataSource {
  private static readonly KEY_STORAGE_VERSION = 'storage_version'

  private static readonly KEY_TWITTER_TOKEN = `oauth_token`
  private static readonly KEY_TWITTER_SECRET = `oauth_token_secret`
  private static readonly KEY_STATUS_PREFIX = 'status_prefix'
  private static readonly KEY_TWITTER_NAME = 'twitter_name'
  private static readonly KEY_TWITTER_SCREEN_NAME = 'twitter_screen_name'
  private static readonly KEY_TWITTER_THUMB_URL = 'twitter_thumb_url'
  private static readonly KEY_AMAZON_ASSOCIATE_DOMAIN =
    'amazon_associate_domain'
  private static readonly KEY_AMAZON_ASSOCIATE_ID = 'amazon_associate_id'
  public static readonly KEY_LOGGING_ACTIVE = 'logging_active'

  private static readonly STORAGE_VERSION = 2

  public async migrateIfNeeded(): Promise<{
    previous: number
    current: number
  }> {
    const previousVersion = await this.getStorageVersion()
    let version = previousVersion

    if (previousVersion === ConfigDataSource.STORAGE_VERSION) {
      // no migration is needed
      return {
        previous: previousVersion,
        current: version,
      }
    }

    if (version === 0) {
      // 0 -> 1
      // v1
      version++
    }

    if (version === 1) {
      // 1 -> 2
      // add KEY_LOGGING_ACTIVE
      version++
    }

    const result = {
      previous: previousVersion,
      current: version,
    }

    consola.debug('migrateIfNeeded:result', result)

    if (previousVersion !== version) {
      await this.setStorageVersion(version)
    }

    return result
  }

  public async getStorageVersion(): Promise<number> {
    const { [ConfigDataSource.KEY_STORAGE_VERSION]: version } = await load({
      [ConfigDataSource.KEY_STORAGE_VERSION]: 0,
    })
    return version
  }

  public async setStorageVersion(version: number): Promise<void> {
    await save({ [ConfigDataSource.KEY_STORAGE_VERSION]: version })
  }

  public async getAccessToken(): Promise<string> {
    const { [ConfigDataSource.KEY_TWITTER_TOKEN]: token } = await load({
      [ConfigDataSource.KEY_TWITTER_TOKEN]: '',
    })
    return token
  }

  public async getAccessTokenValues(): Promise<AccessTokenValues> {
    const {
      [ConfigDataSource.KEY_TWITTER_TOKEN]: token,
      [ConfigDataSource.KEY_TWITTER_SECRET]: secret,
    } = await load({
      [ConfigDataSource.KEY_TWITTER_TOKEN]: '',
      [ConfigDataSource.KEY_TWITTER_SECRET]: '',
    })

    return { token, secret }
  }

  public async setAccessTokenValues({
    token,
    secret,
  }: AccessTokenValues): Promise<void> {
    await save({
      [ConfigDataSource.KEY_TWITTER_TOKEN]: token,
      [ConfigDataSource.KEY_TWITTER_SECRET]: secret,
    })
  }

  public async clearAccessTokenValues(): Promise<void> {
    await remove([
      ConfigDataSource.KEY_TWITTER_TOKEN,
      ConfigDataSource.KEY_TWITTER_SECRET,
    ])
  }

  public async getStatusPrefix(): Promise<string> {
    const { [ConfigDataSource.KEY_STATUS_PREFIX]: prefix } = await load({
      [ConfigDataSource.KEY_STATUS_PREFIX]: AppConfig.PREFIX,
    })
    return prefix ? prefix : AppConfig.PREFIX
  }

  public async setStatusPrefix(prefix: string): Promise<void> {
    await save({ [ConfigDataSource.KEY_STATUS_PREFIX]: prefix })
  }

  public async clearStatusPrefix(): Promise<void> {
    await remove([ConfigDataSource.KEY_STATUS_PREFIX])
  }

  public async getTwitterName(): Promise<string> {
    const { [ConfigDataSource.KEY_TWITTER_NAME]: name } = await load({
      [ConfigDataSource.KEY_TWITTER_NAME]: '',
    })
    return name
  }

  public async setTwitterName(name: string): Promise<void> {
    await save({ [ConfigDataSource.KEY_TWITTER_NAME]: name })
  }

  public async clearTwitterName(): Promise<void> {
    await remove([ConfigDataSource.KEY_TWITTER_NAME])
  }

  public async getTwitterScreenName(): Promise<string> {
    const { [ConfigDataSource.KEY_TWITTER_SCREEN_NAME]: screenName } =
      await load({ [ConfigDataSource.KEY_TWITTER_SCREEN_NAME]: '' })
    return screenName
  }

  public async setTwitterScreenName(screenName: string): Promise<void> {
    await save({ [ConfigDataSource.KEY_TWITTER_SCREEN_NAME]: screenName })
  }

  public async clearTwitterScreenName(): Promise<void> {
    await remove([ConfigDataSource.KEY_TWITTER_SCREEN_NAME])
  }

  public async getTwitterThumbUrl(): Promise<string> {
    const { [ConfigDataSource.KEY_TWITTER_THUMB_URL]: thumbUrl } = await load({
      [ConfigDataSource.KEY_TWITTER_THUMB_URL]: '',
    })
    return thumbUrl
  }

  public async setTwitterThumbUrl(thumbUrl: string): Promise<void> {
    await save({ [ConfigDataSource.KEY_TWITTER_THUMB_URL]: thumbUrl })
  }

  public async clearTwitterThumbUrl(): Promise<void> {
    await remove([ConfigDataSource.KEY_TWITTER_THUMB_URL])
  }

  public async getAmazonAssociateValues(): Promise<AmazonAssociateValues> {
    const {
      [ConfigDataSource.KEY_AMAZON_ASSOCIATE_DOMAIN]: domain,
      [ConfigDataSource.KEY_AMAZON_ASSOCIATE_ID]: associateId,
    } = await load({
      [ConfigDataSource.KEY_AMAZON_ASSOCIATE_DOMAIN]: '',
      [ConfigDataSource.KEY_AMAZON_ASSOCIATE_ID]: '',
    })

    return { domain, associateId }
  }

  public async setAmazonAssociateValues({
    domain,
    associateId,
  }: AmazonAssociateValues): Promise<void> {
    await save({
      [ConfigDataSource.KEY_AMAZON_ASSOCIATE_DOMAIN]: domain,
      [ConfigDataSource.KEY_AMAZON_ASSOCIATE_ID]: associateId,
    })
  }

  public async clearAmazonAssociateValues(): Promise<void> {
    await remove([
      ConfigDataSource.KEY_AMAZON_ASSOCIATE_DOMAIN,
      ConfigDataSource.KEY_AMAZON_ASSOCIATE_ID,
    ])
  }

  public async isLoggingActive(): Promise<boolean> {
    const { [ConfigDataSource.KEY_LOGGING_ACTIVE]: loggingActive } = await load(
      {
        [ConfigDataSource.KEY_LOGGING_ACTIVE]: false,
      }
    )
    return loggingActive
  }

  public async setLoggingActive(loggingActive: boolean): Promise<void> {
    await save({ [ConfigDataSource.KEY_LOGGING_ACTIVE]: loggingActive })
  }

  public async clearLoggingActive(): Promise<void> {
    await remove([ConfigDataSource.KEY_LOGGING_ACTIVE])
  }
}

export default new ConfigDataSource()
