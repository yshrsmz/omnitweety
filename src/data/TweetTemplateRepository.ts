import configDataSource from './ConfigDataSource'
import TweetTemplate from './TweetTemplate'

export class TweetTemplateRepository {
  public async get(): Promise<TweetTemplate> {
    const prefix = await configDataSource.getStatusPrefix()
    return new TweetTemplate(prefix)
  }

  public async set(template: TweetTemplate) {
    await configDataSource.setStatusPrefix(template.prefix)
  }

  public async clear() {
    await configDataSource.clearStatusPrefix()
  }
}

export default new TweetTemplateRepository()
