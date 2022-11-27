import { TwitterConfig, AppConfig } from '../Config'

const save = (key: string, value: string): void => {
  localStorage[key] = value
}

const load = (key: string): string => {
  return localStorage[key]
}

const clear = (key: string): void => {
  delete localStorage[key]
}

const getStorage = async <T extends { [key: string]: string | number }>(
  keysAndDefaults: T
): Promise<{ [K in keyof T]: T[K] }> => {
  return new Promise((resolve) => {
    chrome.storage.local.get(keysAndDefaults, (data) =>
      resolve(data as { [K in keyof T]: T[K] })
    )
  })
}

const setStorage = async (
  values: Record<string, string | number>
): Promise<void> => {
  return new Promise((resolve) => {
    chrome.storage.local.set(values, () => resolve())
  })
}

const removeStorage = async (keys: string[]): Promise<void> => {
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

class ConfigDataSource {
  private static readonly KEY_TWITTER_TOKEN = `oauth_token${encodeURI(
    TwitterConfig.OAUTH_SCOPE
  )}`
  private static readonly KEY_TWITTER_SECRET = `oauth_token_secret${encodeURI(
    TwitterConfig.OAUTH_SCOPE
  )}`
  private static readonly KEY_STATUS_PREFIX = 'status_prefix'
  private static readonly KEY_TWITTER_NAME = 'twitter_name'
  private static readonly KEY_TWITTER_SCREEN_NAME = 'twitter_screen_name'
  private static readonly KEY_TWITTER_THUMB_URL = 'twitter_thumb_url'
  private static readonly KEY_AMAZON_ASSOCIATE_DOMAIN =
    'amazon_associate_domain'
  private static readonly KEY_AMAZON_ASSOCIATE_ID = 'amazon_associate_id'

  constructor() {
    this.migrateToStorageAPI()
  }

  public async migrateToStorageAPI() {
    const { storage_version } = await getStorage({ storage_version: 0 })
    if (storage_version > 0) {
      return
    }

    const values = [
      ConfigDataSource.KEY_TWITTER_TOKEN,
      ConfigDataSource.KEY_TWITTER_SECRET,
      ConfigDataSource.KEY_STATUS_PREFIX,
      ConfigDataSource.KEY_TWITTER_NAME,
      ConfigDataSource.KEY_TWITTER_SCREEN_NAME,
      ConfigDataSource.KEY_TWITTER_THUMB_URL,
      ConfigDataSource.KEY_AMAZON_ASSOCIATE_DOMAIN,
      ConfigDataSource.KEY_AMAZON_ASSOCIATE_ID,
    ]
      .map((key) => [key, load(key) ?? ''])
      .filter((values) => !!values[1])
      .reduce<Record<string, string>>(
        (acc, [key, value]) => ({ ...acc, [key]: value }),
        {}
      )

    await setStorage({ ...values, storage_version: 1 })
  }

  public async getAccessToken(): Promise<string> {
    const { [ConfigDataSource.KEY_TWITTER_TOKEN]: token } = await getStorage({
      [ConfigDataSource.KEY_TWITTER_TOKEN]: '',
    })
    return token
  }

  public async getAccessTokenValues(): Promise<AccessTokenValues> {
    const {
      [ConfigDataSource.KEY_TWITTER_TOKEN]: token,
      [ConfigDataSource.KEY_TWITTER_SECRET]: secret,
    } = await getStorage({
      [ConfigDataSource.KEY_TWITTER_TOKEN]: '',
      [ConfigDataSource.KEY_TWITTER_SECRET]: '',
    })

    return { token, secret }
  }

  public async setAccessTokenValues({
    token,
    secret,
  }: AccessTokenValues): Promise<void> {
    await setStorage({
      [ConfigDataSource.KEY_TWITTER_TOKEN]: token,
      [ConfigDataSource.KEY_TWITTER_SECRET]: secret,
    })
  }

  public async clearAccessTokenValues(): Promise<void> {
    await removeStorage([
      ConfigDataSource.KEY_TWITTER_TOKEN,
      ConfigDataSource.KEY_TWITTER_SECRET,
    ])
  }

  public async getStatusPrefix(): Promise<string> {
    const { [ConfigDataSource.KEY_STATUS_PREFIX]: prefix } = await getStorage({
      [ConfigDataSource.KEY_STATUS_PREFIX]: AppConfig.PREFIX,
    })
    return prefix ? prefix : AppConfig.PREFIX
  }

  public async setStatusPrefix(prefix: string): Promise<void> {
    await setStorage({ [ConfigDataSource.KEY_STATUS_PREFIX]: prefix })
  }

  public async clearStatusPrefix(): Promise<void> {
    await removeStorage([ConfigDataSource.KEY_STATUS_PREFIX])
  }

  public async getTwitterName(): Promise<string> {
    const { [ConfigDataSource.KEY_TWITTER_NAME]: name } = await getStorage({
      [ConfigDataSource.KEY_TWITTER_NAME]: '',
    })
    return name
  }

  public async setTwitterName(name: string): Promise<void> {
    await setStorage({ [ConfigDataSource.KEY_TWITTER_NAME]: name })
  }

  public async clearTwitterName(): Promise<void> {
    await removeStorage([ConfigDataSource.KEY_TWITTER_NAME])
  }

  public async getTwitterScreenName(): Promise<string> {
    const { [ConfigDataSource.KEY_TWITTER_SCREEN_NAME]: screenName } =
      await getStorage({ [ConfigDataSource.KEY_TWITTER_SCREEN_NAME]: '' })
    return screenName
  }

  public async setTwitterScreenName(screenName: string): Promise<void> {
    await setStorage({ [ConfigDataSource.KEY_TWITTER_SCREEN_NAME]: screenName })
  }

  public async clearTwitterScreenName(): Promise<void> {
    await removeStorage([ConfigDataSource.KEY_TWITTER_SCREEN_NAME])
  }

  public async getTwitterThumbUrl(): Promise<string> {
    const { [ConfigDataSource.KEY_TWITTER_THUMB_URL]: thumbUrl } =
      await getStorage({ [ConfigDataSource.KEY_TWITTER_THUMB_URL]: '' })
    return thumbUrl
  }

  public async setTwitterThumbUrl(thumbUrl: string): Promise<void> {
    await setStorage({ [ConfigDataSource.KEY_TWITTER_THUMB_URL]: thumbUrl })
  }

  public async clearTwitterThumbUrl(): Promise<void> {
    await removeStorage([ConfigDataSource.KEY_TWITTER_THUMB_URL])
  }

  public async getAmazonAssociateValues(): Promise<AmazonAssociateValues> {
    const {
      [ConfigDataSource.KEY_AMAZON_ASSOCIATE_DOMAIN]: domain,
      [ConfigDataSource.KEY_AMAZON_ASSOCIATE_ID]: associateId,
    } = await getStorage({
      [ConfigDataSource.KEY_AMAZON_ASSOCIATE_DOMAIN]: '',
      [ConfigDataSource.KEY_AMAZON_ASSOCIATE_ID]: '',
    })

    return { domain, associateId }
  }

  public async setAmazonAssociateValues({
    domain,
    associateId,
  }: AmazonAssociateValues): Promise<void> {
    await setStorage({
      [ConfigDataSource.KEY_AMAZON_ASSOCIATE_DOMAIN]: domain,
      [ConfigDataSource.KEY_AMAZON_ASSOCIATE_ID]: associateId,
    })
  }

  public async clearAmazonAssociateValues(): Promise<void> {
    await removeStorage([
      ConfigDataSource.KEY_AMAZON_ASSOCIATE_DOMAIN,
      ConfigDataSource.KEY_AMAZON_ASSOCIATE_ID,
    ])
  }
}

export default new ConfigDataSource()
