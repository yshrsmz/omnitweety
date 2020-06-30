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

  public getAccessToken(): string {
    return load(ConfigDataSource.KEY_TWITTER_TOKEN)
  }

  public setAccessToken(token: string): void {
    save(ConfigDataSource.KEY_TWITTER_TOKEN, token)
  }

  public clearAccessToken(): void {
    clear(ConfigDataSource.KEY_TWITTER_TOKEN)
  }

  public getAccessTokenSecret(): string {
    return load(ConfigDataSource.KEY_TWITTER_SECRET)
  }

  public setAccessTokenSecret(secret: string): void {
    save(ConfigDataSource.KEY_TWITTER_SECRET, secret)
  }

  public clearAccesTokenSecret(): void {
    clear(ConfigDataSource.KEY_TWITTER_SECRET)
  }

  public getStatusPrefix(): string {
    const result: string = load(ConfigDataSource.KEY_STATUS_PREFIX)
    return result ? result : AppConfig.PREFIX
  }

  public setStatusPrefix(prefix: string): void {
    save(ConfigDataSource.KEY_STATUS_PREFIX, prefix)
  }

  public clearStatusPrefix(): void {
    clear(ConfigDataSource.KEY_STATUS_PREFIX)
  }

  public getTwitterName(): string {
    return load(ConfigDataSource.KEY_TWITTER_NAME) || ''
  }

  public setTwitterName(name: string): void {
    save(ConfigDataSource.KEY_TWITTER_NAME, name)
  }

  public clearTwitterName(): void {
    clear(ConfigDataSource.KEY_TWITTER_NAME)
  }

  public getTwitterScreenName(): string {
    return load(ConfigDataSource.KEY_TWITTER_SCREEN_NAME) || ''
  }

  public setTwitterScreenName(screenName: string): void {
    save(ConfigDataSource.KEY_TWITTER_SCREEN_NAME, screenName)
  }

  public clearTwitterScreenName(): void {
    clear(ConfigDataSource.KEY_TWITTER_SCREEN_NAME)
  }

  public getTwitterThumbUrl(): string {
    return load(ConfigDataSource.KEY_TWITTER_THUMB_URL) || ''
  }

  public setTwitterThumbUrl(thumbUrl: string): void {
    save(ConfigDataSource.KEY_TWITTER_THUMB_URL, thumbUrl)
  }

  public clearTwitterThumbUrl(): void {
    clear(ConfigDataSource.KEY_TWITTER_THUMB_URL)
  }

  public getAmazonAssociateDomain(): string {
    return load(ConfigDataSource.KEY_AMAZON_ASSOCIATE_DOMAIN) || ''
  }

  public setAmazonAssociateDomain(domain: string): void {
    save(ConfigDataSource.KEY_AMAZON_ASSOCIATE_DOMAIN, domain)
  }

  public clearAmazonAssociateDomain(): void {
    clear(ConfigDataSource.KEY_AMAZON_ASSOCIATE_DOMAIN)
  }

  public getAmazonAssociateId(): string {
    return (load(ConfigDataSource.KEY_AMAZON_ASSOCIATE_ID) || '').trim()
  }

  public setAmazonAssociateId(id: string): void {
    save(ConfigDataSource.KEY_AMAZON_ASSOCIATE_ID, id.trim())
  }

  public clearAmazonAssociateId(): void {
    clear(ConfigDataSource.KEY_AMAZON_ASSOCIATE_ID)
  }
}

export default new ConfigDataSource()
