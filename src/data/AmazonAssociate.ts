export default class AmazonAssociate {
  public constructor(
    public readonly domain: string,
    public readonly associateId: string
  ) {
    // no-op
  }

  public isEnabled(): boolean {
    return this.associateId != '' && this.isValidAmazonDomain(this.domain)
  }

  public buildAssociateUrlOrReturnAsIs(url: URL): string {
    if (
      this.isEnabled() &&
      this.isUrlForCurrentDomain(url) &&
      AmazonAssociate.isAmazonProductUrl(url)
    ) {
      const productId = AmazonAssociate.getProductId(url)
      return `https://${url.hostname}/dp/${productId}/?tag=${this.associateId}`
    } else {
      return url.href
    }
  }

  public isUrlForCurrentDomain(url: URL): boolean {
    return url.hostname === this.domain
  }

  public isValidAmazonDomain(domain: string): boolean {
    return AmazonAssociate.AMAZON_DOMAINS.indexOf(domain) >= 0
  }

  public static isAmazonProductUrl(url: URL): boolean {
    return (
      AmazonAssociate.AMAZON_DOMAINS.indexOf(url.hostname) >= 0 &&
      url.pathname.search(AmazonAssociate.PRODUCT_ID_REGEXP) >= 0
    )
  }

  public static getProductId(url: URL): string {
    return url.pathname.match(AmazonAssociate.PRODUCT_ID_REGEXP)![1]
  }

  public static empty(): AmazonAssociate {
    return new AmazonAssociate('', '')
  }

  private static PRODUCT_ID_REGEXP = /[^0-9A-Z]([B0-9][0-9A-Z]{9})([^0-9A-Z]|$)/

  public static AMAZON_DOMAINS = [
    'www.amazon.com.au',
    'www.amazon.com.br',
    'www.amazon.ca',
    'www.amazon.cn',
    'www.amazon.fr',
    'www.amazon.de',
    'www.amazon.in',
    'www.amazon.it',
    'www.amazon.co.jp',
    'www.amazon.com.mx',
    'www.amazon.nl',
    'www.amazon.sg',
    'www.amazon.es',
    'www.amazon.com.tr',
    'www.amazon.ae',
    'www.amazon.co.uk',
    'www.amazon.com',
  ].sort()
}
