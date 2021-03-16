import 'mocha'
import { expect } from 'chai'
import { CryptoHelper } from '../helpers'

describe('src/helpers/crypto.ts', () => {
  describe('enchiper', () => {
    it('shold enchiper an string', () => {
      const hash = CryptoHelper.encipher('123')

      expect(hash).to.equal('f59a3e8592e2c5fb1d337fb4147bb0f43248cff8fc452febdc0341c866634378')
    })
  })

  describe('getPasswordHash', () => {
    it('shold enchiper an password with a salt', () => {
      const pass = CryptoHelper.getPasswordHash('123')

      expect(pass.salt.length).to.equal(172)
      expect(pass.hash.length).to.equal(64)
    })
  })
})
