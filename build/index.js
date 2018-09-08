const { roundedCorner, minify: min, svg, makeElement } = require('@svag/lib');
let Toolbar = require('@svag/toolbar'); if (Toolbar && Toolbar.__esModule) Toolbar = Toolbar.default;
let Shadow = require('@svag/shadow'); if (Shadow && Shadow.__esModule) Shadow = Shadow.default;

/**
 * Create an SVG showing for a simple macOS window with the given content.
 * @param {WindowOptions} options
 * @param {string} options.content The content to display inside of the window.
 * @param {number} options.width The width of the content.
 * @param {number} options.height The height of the content.
 * @param {string} [options.backgroundColor="#000000"] The color of the window. Default `#000000`.
 * @param {string} [options.foregroundColor="#FFFFFF"] The foreground color of the container group which will hold the content. Default `#FFFFFF`.
 * @param {boolean} [options.noStretch=false] Do not stretch the SVG when embedded as an image. This is achieved by explicitly setting width and height attributes on the `svg` element. Default `false`.
 * @param {string} [options.title] An optional title for the window.
 * @param {object} [options.attributes] Any additional attributes to set on the holder of the content, e.g., `font-family`.
 * @param {number} [options.minWidth] The minimum width that the window should take. If the content's width is greater than this value, the height will adjust to the content.
 * @param {number} [options.minHeight] The minimum height that the window should take. If the content's height is greater than this value, the height will adjust to the content.
 * @param {number} [options.paddingY=5] The padding on the Y-axis (top and bottom). Default `5`.
 * @param {number} [options.paddingX=5] The padding on the X-axis (left and right). Default `5`.
 * @param {boolean} [options.noShadow=false] Disable the dropping shadow. Default `false`.
 * @param {boolean} [options.minify=true] Remove whitespace between tags (e.g., between `>` and `<`). If there are any problems with generated SVG, this could be disabled. Default `true`.
 */
const terminal = (options) => {
  const {
    content, width, height, attributes = {}, backgroundColor = '#FFFFFF',
    foregroundColor = '#000000', noStretch = false, title = '', minWidth = 0,
    minHeight = 0, paddingY = 5, paddingX = 5, noShadow = false, minify = true,
  } = options
  const tbHeight = 22
  const w = Math.max(minWidth, width + (paddingX * 2))
  const h = Math.max(minHeight, height + tbHeight + (paddingY * 2))
  const lineY = tbHeight
  const lnHeight = 1
  const bodyY = lineY + lnHeight
  const rd = 3
  const rd2 = rd * 2
  const borderColor = '#000000'
  const bAlpha = '0.2'
  const blurStd = 27.5
  const blurOffsetY = 25
  const ww = (noShadow ? 0 : blurStd * 4) + w + 2
  const hh = (noShadow ? 0 : blurStd * 4) + h + 2

  const filter = noShadow ? undefined : Shadow({
    width: w, height: h,
  })
  const toolbar = Toolbar({
    width: w,
    title,
  })
  const rect = makeElement({ // the rounded stroke around the window
    name: 'rect',
    attributes: {
      height: h,
      width: w,
      rx: rd2,
      stroke: borderColor,
      'stroke-opacity': bAlpha,
    },
  })
  const line = makeElement({
    name: 'line',
    attributes: {
      x1: 0,
      y1: lineY + 0.5,
      x2: w,
      y2: lineY + 0.5,
      stroke: '#7E7E7E',
      'shape-rendering': 'crispEdges',
    },
  })
  const bg = `<path d="M${w},${lineY} L${w},${h - rd2} ${roundedCorner({ x: w, y: h - rd2 }, { x: w - rd2, y: h })} L${rd2},${h} ${roundedCorner({ x: rd2, y: h }, { x: 0, y: h - rd2 })} L0,${lineY} Z" fill="${backgroundColor}"/>`
  const holder = makeElement({
    name: 'g',
    attributes: {
      transform: `translate(${paddingX}, ${bodyY + paddingY})`,
      fill: foregroundColor,
      ...attributes,
    },
    content,
  })
  const rootElement = makeElement({
    name: 'g',
    attributes: {
      transform: noShadow ? 'translate(1, 1)' : `translate(${blurStd * 2}, ${blurOffsetY})`,
      filter: noShadow ? undefined : 'url(#shadow)',
      fill: 'none',
    },
    content: [
      filter,
      rect,
      toolbar,
      bg,
      line,
      holder,
    ].join('\n'),
  })
  const image = svg({
    width: ww,
    height: hh,
    content: `\n${rootElement}`,
    stretch: !noStretch,
  })
  const win = `<?xml version="1.0" encoding="utf-8"?>
${image}`
  const res = minify ? min(win) : win
  return res
}

/* documentary types/index.xml */
/**
 * @typedef {Object} WindowOptions
 * @prop {string} content The content to display inside of the window.
 * @prop {number} width The width of the content.
 * @prop {number} height The height of the content.
 * @prop {string} [backgroundColor="#000000"] The color of the window. Default `#000000`.
 * @prop {string} [foregroundColor="#FFFFFF"] The foreground color of the container group which will hold the content. Default `#FFFFFF`.
 * @prop {boolean} [noStretch=false] Do not stretch the SVG when embedded as an image. This is achieved by explicitly setting width and height attributes on the `svg` element. Default `false`.
 * @prop {string} [title] An optional title for the window.
 * @prop {object} [attributes] Any additional attributes to set on the holder of the content, e.g., `font-family`.
 * @prop {number} [minWidth] The minimum width that the window should take. If the content's width is greater than this value, the height will adjust to the content.
 * @prop {number} [minHeight] The minimum height that the window should take. If the content's height is greater than this value, the height will adjust to the content.
 * @prop {number} [paddingY=5] The padding on the Y-axis (top and bottom). Default `5`.
 * @prop {number} [paddingX=5] The padding on the X-axis (left and right). Default `5`.
 * @prop {boolean} [noShadow=false] Disable the dropping shadow. Default `false`.
 * @prop {boolean} [minify=true] Remove whitespace between tags (e.g., between `>` and `<`). If there are any problems with generated SVG, this could be disabled. Default `true`.
 */

module.exports=terminal
//# sourceMappingURL=index.js.map