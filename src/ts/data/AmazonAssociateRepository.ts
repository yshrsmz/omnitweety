import configDataStore from './ConfigDataSource'
import AmazonAssociate from './AmazonAssociate'

class AmazonAssociateRepository {
  public set(amazonAssociate: AmazonAssociate) {
    configDataStore.setAmazonAssociateDomain(amazonAssociate.domain)
    configDataStore.setAmazonAssociateId(amazonAssociate.associateId)
  }

  public get(): AmazonAssociate {
    const domain: string = configDataStore.getAmazonAssociateDomain()
    const associateId: string = configDataStore.getAmazonAssociateId()
    return new AmazonAssociate(domain, associateId)
  }

  public clear() {
    configDataStore.clearAmazonAssociateDomain()
    configDataStore.clearAmazonAssociateId()
  }

  public getAmazonDomains(): string[] {
    return AmazonAssociate.AMAZON_DOMAINS
  }
}

export default new AmazonAssociateRepository()
