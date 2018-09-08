import { debuglog } from 'util'

const LOG = debuglog('@svag/window')

/**
 * A simple window with a shadow and toolbar.
 * @param {Config} config Options for the program.
 * @param {boolean} config.shouldRun A boolean option.
 */
export default async function window(config) {
  const {
    type,
  } = config
  LOG('@svag/window called with %s', type)
  return type
}

/* documentary types/index.xml */
/**
 * @typedef {Object} Config Options for the program.
 * @prop {boolean} shouldRun A boolean option.
 */
