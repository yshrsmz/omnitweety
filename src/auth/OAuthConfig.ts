export class OAuthConfig {
  constructor(
    readonly callback: string = 'oob' // ,readonly xAuthAccessType?: 'read' | 'write'
  ) {}
}
