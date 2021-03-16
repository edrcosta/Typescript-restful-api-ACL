import 'mocha'
import { spy, assert } from 'sinon'
import { expect } from 'chai'
import { LoadEndpoints } from './endpoints'

describe('src/endpoints.ts', () => {
  describe('LoadEndpoints', () => {
    it('shold LoadEndpoints', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const spyExpress: any = {
        post: spy(),
        delete: spy(),
        get: spy(),
        put: spy(),
      }

      LoadEndpoints(spyExpress)

      assert.calledWith(spyExpress.post, '/login')
      assert.calledWith(spyExpress.post, '/users')

      assert.calledWith(spyExpress.get, '/users')
      assert.calledWith(spyExpress.get, '/users/:id')
      assert.calledWith(spyExpress.get, '/types')
      assert.calledWith(spyExpress.get, '/types/:id')

      assert.calledWith(spyExpress.put, '/users/:id')
      assert.calledWith(spyExpress.delete, '/users/:id')

      expect(spyExpress.post.callCount).to.equal(2)
      expect(spyExpress.get.callCount).to.equal(4)
      expect(spyExpress.put.callCount).to.equal(1)
      expect(spyExpress.delete.callCount).to.equal(1)
    })
  })
})
