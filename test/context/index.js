import { resolve } from 'path'
import { debuglog } from 'util'

const LOG = debuglog('@svag/window')

const FIXTURE = resolve(__dirname, '../fixture')

/**
 * A testing context for the package.
 */
export default class Context {
  async _init() {
    LOG('init context')
  }
  get content() {
    return `<rect width="${this.width - this.x}" height="${this.height - this.y}" x="${10}" y="${10}" />`
  }
  get y() {
    return 10
  }
  get x() {
    return 10
  }
  get width() {
    return 50
  }
  get height() {
    return 50
  }
  /**
   * Example method.
   */
  example() {
    return 'OK'
  }
  /**
   * Path to the fixture file.
   */
  get FIXTURE() {
    return resolve(FIXTURE, 'test.txt')
  }
  get SNAPSHOT_DIR() {
    return resolve(__dirname, '../snapshot')
  }
  async _destroy() {
    LOG('destroy context')
  }
}