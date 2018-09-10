const { roundedCorner, minify: min, svg, makeElement, rect } = require('@svag/lib');
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
const simpleWindow = (options) => {
  const {
    content, width: contentWidth, height: contentHeight, attributes = {}, backgroundColor = '#FFFFFF',
    foregroundColor = '#000000', noStretch = false, title = '', minWidth = 0,
    minHeight = 0, paddingY = 5, paddingX = 5, noShadow = false, minify = true,
  } = options
  const tbHeight = 22
  const windowWidth = Math.max(minWidth, contentWidth + (paddingX * 2))
  const windowHeight = Math.max(minHeight, contentHeight + tbHeight + (paddingY * 2))
  const lineY = tbHeight
  const lnHeight = 1
  const bodyY = lineY + lnHeight
  const rd = 3
  const rd2 = rd * 2
  const borderColor = '#000000'
  const bAlpha = '0.2'
  const blurStd = 27.5
  const margin = (noShadow ? 0 : blurStd * 4)
  const svgWidth = margin + windowWidth + 2
  const svgHeight = margin + windowHeight + 2

  const { translateX, translateY, shadow } = noShadow ? { translateX: 1, translateY: 1 } : Shadow({
    width: windowWidth,
    height: windowHeight,
  })
  const translate = `translate(${translateX}, ${translateY})`
  const toolbar = Toolbar({
    width: windowWidth,
    title,
  })
  const border = rect({ // the rounded stroke around the window
    width: windowWidth,
    height: windowHeight,
    rx: rd2,
    ry: rd2,
    stroke: borderColor,
    'stroke-opacity': bAlpha,
  })
  const line = makeElement('line', {
    attributes: {
      y1: lineY,
      x2: windowWidth,
      y2: lineY,
      stroke: '#7E7E7E',
      'shape-rendering': 'crispEdges',
    },
  })
  const bg = makeElement('path', {
    attributes: {
      d: `M${windowWidth},${lineY} L${windowWidth},${windowHeight - rd2} ${roundedCorner({ x: windowWidth, y: windowHeight - rd2 }, { x: windowWidth - rd2, y: windowHeight })} L${rd2},${windowHeight} ${roundedCorner({ x: rd2, y: windowHeight }, { x: 0, y: windowHeight - rd2 })} L0,${lineY} Z`,
      fill: backgroundColor,
    },
  })
  const holder = makeElement('g', {
    attributes: {
      transform: `translate(${paddingX}, ${bodyY + paddingY})`,
      fill: foregroundColor,
      ...attributes,
    },
    content,
  })
  const window = makeElement('g', {
    attributes: {
      transform: translate,
      fill: 'none',
    },
    content: [
      border,
      toolbar,
      bg,
      line,
      holder,
    ],
  })
  const image = svg({
    width: svgWidth,
    height: svgHeight,
    content: [shadow, window],
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

module.exports=simpleWindow
//# sourceMappingURL=index.js.map