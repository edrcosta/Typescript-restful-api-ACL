import { randomBytes, createHmac } from 'crypto'
import { iPasswordAndSaltHash } from '../interfaces'
import { ENV } from './'

export class CryptoHelper {
  static encipher = (str: string): string =>
    createHmac('sha256', str)
      .update(ENV.initialize().CRYPTO_SECRET)
      .digest('hex')

  static getPasswordHash(password: string): iPasswordAndSaltHash {
    const salt = randomBytes(128).toString('base64')

    return {
      salt: salt,
      hash: CryptoHelper.encipher(password + salt),
    }
  }
}
