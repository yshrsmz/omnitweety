export default class ConsumerKeys {
  public readonly key: string
  public readonly secret: string

  public constructor(key: string, secret: string) {
    this.key = key
    this.secret = secret
  }
}
