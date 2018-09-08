import { equal, ok } from 'zoroaster/assert'
import Context from '../context'
import window from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof window, 'function')
  },
  async 'calls package without error'() {
    await window()
  },
  async 'gets a link to the fixture'({ FIXTURE }) {
    const res = await window({
      type: FIXTURE,
    })
    ok(res, FIXTURE)
  },
}

export default T