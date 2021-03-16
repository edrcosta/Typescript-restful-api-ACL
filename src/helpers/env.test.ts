import 'mocha'
import { expect } from 'chai'
import { ENV } from '../helpers'

describe('src/helpers/env.ts', () => {
  describe('initialize', () => {
    it('shold return an env json', () => {
      const env = ENV.initialize()

      expect(env.hasOwnProperty('DATABASE')).to.equal(true)
      expect(env.DATABASE.hasOwnProperty('SCHEMA')).to.equal(true)
      expect(env.DATABASE.hasOwnProperty('HOST')).to.equal(true)
      expect(env.DATABASE.hasOwnProperty('PASSWORD')).to.equal(true)
      expect(env.DATABASE.hasOwnProperty('USER')).to.equal(true)
      expect(env.DATABASE.hasOwnProperty('DIALECT')).to.equal(true)
      expect(env.hasOwnProperty('SERVER_PORT')).to.equal(true)
      expect(env.hasOwnProperty('JWT_SECRET')).to.equal(true)
      expect(env.hasOwnProperty('CRYPTO_SECRET')).to.equal(true)
    })
  })
})
