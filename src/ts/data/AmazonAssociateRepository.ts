import configDataStore from './ConfigDataSource';
import AmazonAssociate from './AmazonAssociate';

class AmazonAssociateRepository {

  public set(amazonAssociate: AmazonAssociate){
    configDataStore.setAmazonAssociateDomain(amazonAssociate.domain)
    configDataStore.setAmazonAssociateId(amazonAssociate.asscociateId)
  }

  public get(): AmazonAssociate{
    const domain: string = configDataStore.getAmazonAssociateDomain()
    const asscociateId: string = configDataStore.getAmazonAssociateId()
    return new AmazonAssociate(domain, asscociateId)
  }

  public clear() {
    configDataStore.clearAmazonAssociateDomain()
    configDataStore.clearAmazonAssociateId()
  }

  public getAmazonDomains(): string[] {
    return AmazonAssociate.AMAZON_DOMAINS
  }
}

export default new AmazonAssociateRepository();
