import 'mocha'
import { assert, stub } from 'sinon'
import { expect } from 'chai'
import { UserModel } from './'
import { ModelCtor } from 'sequelize'
import { Database } from '../bussiness'
import { stubInterface } from 'ts-sinon'
import { iUserSchema, iUserTypeSchema } from '../interfaces'
import { CryptoHelper } from '../helpers'

describe('src/models/users.ts', () => {
  describe('schema', () => {
    it('shold contain user fields', () => {
      expect(UserModel.schema.hasOwnProperty('id')).to.equal(true)
      expect(UserModel.schema.hasOwnProperty('name')).to.equal(true)
      expect(UserModel.schema.hasOwnProperty('typeId')).to.equal(true)
      expect(UserModel.schema.hasOwnProperty('email')).to.equal(true)
      expect(UserModel.schema.hasOwnProperty('status')).to.equal(true)
      expect(UserModel.schema.hasOwnProperty('password')).to.equal(true)
      expect(UserModel.schema.hasOwnProperty('passwordSalt')).to.equal(true)
      expect(UserModel.schema.hasOwnProperty('createdAt')).to.equal(true)
      expect(UserModel.schema.hasOwnProperty('updatedAt')).to.equal(true)
      expect(UserModel.schema.hasOwnProperty('deleted')).to.equal(true)
    })

    it('shold validate email field', () => {
      expect(UserModel.schema.email.validate.isEmail).to.equal(true)
    })
  })

  describe('create', () => {
    it('shold create a new user with a hash password', async () => {
      const UsersMock = stubInterface<ModelCtor<iUserSchema>>()
      const UserTypesMock = stubInterface<ModelCtor<iUserTypeSchema>>()

      UsersMock.findOne.callsFake(() => Promise.resolve(null))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      UsersMock.create.callsFake((): any => Promise.resolve({ created: true, id: 1 }))
      UsersMock.findAll.callsFake(() => Promise.resolve([]))

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

      const cryptoHelperMock = stub(CryptoHelper)

      cryptoHelperMock.getPasswordHash.callsFake(() => {
        return {
          hash: 'hash',
          salt: 'hash',
        }
      })

      const resId = await UserModel.create({
        name: 'Eder',
        typeId: 1,
        email: 'eder@teste.com',
        password: '123',
        status: 'ATIVO',
        passwordSalt: '123',
      })

      expect(resId).to.equal(1)

      assert.called(cryptoHelperMock.getPasswordHash)
      assert.called(UsersMock.create)

      dbMock.restore()
      UsersMock.restore()
      UserTypesMock.restore()
    })
  })

  describe('checkExist', () => {
    it('shold find a user by email', async () => {
      const UsersMock = stubInterface<ModelCtor<iUserSchema>>()
      const UserTypesMock = stubInterface<ModelCtor<iUserTypeSchema>>()

      UsersMock.findOne.onCall(0).returns(Promise.resolve(null))

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

      await UserModel.checkExist('teste@teste.com')

      assert.calledOnceWithMatch(UsersMock.findOne, {
        where: {
          ...Database.softDelete,
          email: 'teste@teste.com',
          status: 'ATIVO',
        },
        include: [Database.tables.UserTypes],
      })

      dbMock.restore()
      UsersMock.restore()
      UserTypesMock.restore()
    })
  })

  describe('listWithPagination', () => {
    it('shold list Users with pagination', async () => {
      const UsersMock = stubInterface<ModelCtor<iUserSchema>>()
      const UserTypesMock = stubInterface<ModelCtor<iUserTypeSchema>>()

      UsersMock.findOne.onCall(0).returns(Promise.resolve(null))

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

      await UserModel.listWithPagination(0)

      assert.calledOnceWithMatch(UsersMock.findAll, {
        where: {
          deleted: null,
          status: 'ATIVO',
        },
        limit: 10,
        attributes: {
          exclude: ['passwordSalt', 'password', 'deleted'],
        },
        include: [Database.tables.UserTypes],
        offset: 0,
      })

      dbMock.restore()
      UsersMock.restore()
      UserTypesMock.restore()
    })
  })
})
