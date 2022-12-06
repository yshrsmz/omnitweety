export interface NonceGenerator {
  newNonce(size?: number): string
}

class DefaultNonceGenerator implements NonceGenerator {
  newNonce(size = 32): string {
    const array = new Uint8Array(size)
    crypto.getRandomValues(array)
    return [...array].map((uint) => uint.toString(16).padStart(2, '0')).join('')
  }
}

export default new DefaultNonceGenerator()
