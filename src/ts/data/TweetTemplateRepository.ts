import configDataSource from './ConfigDataSource'
import TweetTemplate from './TweetTemplate'

class TweetTemplateRepository {
  public get(): TweetTemplate {
    const prefix = configDataSource.getStatusPrefix()
    return new TweetTemplate(prefix)
  }

  public set(template: TweetTemplate): void {
    configDataSource.setStatusPrefix(template.prefix)
  }

  public clear(): void {
    configDataSource.clearStatusPrefix()
  }
}

export default new TweetTemplateRepository()
