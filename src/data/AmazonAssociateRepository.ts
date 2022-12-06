import configDataStore from './ConfigDataSource'
import AmazonAssociate from './AmazonAssociate'

export class AmazonAssociateRepository {
  public async set(amazonAssociate: AmazonAssociate) {
    await configDataStore.setAmazonAssociateValues({
      domain: amazonAssociate.domain,
      associateId: amazonAssociate.associateId,
    })
  }

  public async get(): Promise<AmazonAssociate> {
    const { domain, associateId } =
      await configDataStore.getAmazonAssociateValues()
    return new AmazonAssociate(domain, associateId)
  }

  public async clear() {
    await configDataStore.clearAmazonAssociateValues()
  }

  public getAmazonDomains(): string[] {
    return AmazonAssociate.AMAZON_DOMAINS
  }
}

export default new AmazonAssociateRepository()
