import { equal } from 'zoroaster/assert'
import Context from '../context'
import SnapshotContext from 'snapshot-context'
import window from '../../src'

/** @type {Object.<string, (c: Context, sc: SnapshotContext)>} */
const T = {
  context: [Context, SnapshotContext],
  'is a function'() {
    equal(typeof window, 'function')
  },
  async 'produces correct output'(
    { content, width, height, SNAPSHOT_DIR }, { setDir, test },
  ) {
    setDir(SNAPSHOT_DIR)
    const res = window({
      content,
      height,
      width,
      minify: false,
    })
    await test('window.svg', res)
  },
}

export default T