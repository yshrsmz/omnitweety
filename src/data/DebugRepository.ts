import configDataSource from './ConfigDataSource'

export class DebugRepository {
  public async isLoggingActive(): Promise<boolean> {
    return await configDataSource.isLoggingActive()
  }

  public async setLoggingActive(active: boolean): Promise<void> {
    await configDataSource.setLoggingActive(active)
  }

  public async clearLoggingActive(): Promise<void> {
    await configDataSource.clearLoggingActive()
  }
}

export default new DebugRepository()
