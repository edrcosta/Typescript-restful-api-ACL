import 'mocha'
import { LOG } from '../helpers'
import { spy } from 'sinon'

describe('src/helpers/log.ts', () => {
  describe('LOG.error', () => {
    it('shold throw an error', () => {
      const spyLog = spy(LOG, 'error')

      try {
        LOG.error(new Error('teste'))
      } catch (error) {}

      spyLog.threw()
    })
  })
})
