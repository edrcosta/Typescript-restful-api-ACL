import { Authentication } from './authentication'
import 'mocha'
import { stub } from 'sinon'
import { expect, assert } from 'chai'
import { ENV } from '../helpers'
import { ModelCtor } from 'sequelize'
import { Database } from '../bussiness'
import { stubInterface } from 'ts-sinon'
import { iUserSchema, iUserTypeSchema } from '../interfaces'

describe('src/bussiness/authentication.ts', () => {
  const auth = new Authentication()

  describe('constants', () => {
    it('shold setup constants', () => {
      assert.deepEqual(auth.authenticationError, {
        error: 'Unauthorized client',
        statusCode: 401,
        accessToken: '',
      })

      assert.deepEqual(auth.userTypesEnum, {
        geral: 'geral',
      })

      assert.deepEqual(auth.env, ENV.initialize())
    })
  })

  describe('generateToken', () => {
    it('Shold generate an jwt access token', async () => {
      const UsersMock = stubInterface<ModelCtor<iUserSchema>>()
      const UserTypesMock = stubInterface<ModelCtor<iUserTypeSchema>>()

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      UsersMock.findOne.callsFake((): any =>
        Promise.resolve({
          name: 'Eder',
          typeId: 1,
          UserType: {
            id: 1,
            name: 'root',
          },
          email: 'eder@teste.com',
          password: '75d3e3d389868c4e8d60e30e1ff0e0d7bda6e7a9900b125086bb39fc0096d37d',
          status: 'ATIVO',
          passwordSalt: '123',
        })
      )

      const dbMock = stub(Database, 'initialize').callsFake(() => {
        Database.tables = {
          Users: UsersMock,
          UserTypes: UserTypesMock,
        }
      })

      Database.initialize({
        SCHEMA: 'devires_test',
        HOST: 'localhost',
        PASSWORD: 'root',
        USER: 'root',
        DIALECT: 'mysql',
      })

      const accessToken = await auth.generateToken('teste@teste.com', '123')

      expect(accessToken.statusCode).to.equal(200)
      expect(typeof accessToken.accessToken).to.equal('string')
      expect(typeof accessToken.accessToken).to.equal('string')
      expect(accessToken.accessToken.length).to.equal(191)

      dbMock.restore()
      UsersMock.restore()
      UserTypesMock.restore()
    })
  })
})
