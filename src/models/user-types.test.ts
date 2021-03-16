import 'mocha'
import { expect } from 'chai'
import { UserTypesModel } from './'

describe('src/models/user-types.ts', () => {
  describe('schema', () => {
    it('shold contain UserType fields', () => {
      expect(UserTypesModel.schema.hasOwnProperty('id')).to.equal(true)
      expect(UserTypesModel.schema.hasOwnProperty('name')).to.equal(true)
      expect(UserTypesModel.schema.hasOwnProperty('description')).to.equal(true)
      expect(UserTypesModel.schema.hasOwnProperty('createdAt')).to.equal(true)
      expect(UserTypesModel.schema.hasOwnProperty('deleted')).to.equal(true)
      expect(UserTypesModel.schema.hasOwnProperty('updatedAt')).to.equal(true)
    })
  })
})
