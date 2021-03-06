import { writeFileSync } from 'fs'
/* start example */
import { makeElement } from '@svag/lib'
import Window from '../src'

const line = makeElement('text', {
  attributes: {
    'font-family': 'Monaco, Courier',
    'font-size': '12px',
    x: 0,
    y: 10,
  },
  content: `Last login: ${new Date().toDateString()} on ttys013`,
})
const line2 = makeElement('text', {
  attributes: {
    'font-family': 'Monaco, Courier',
    'font-size': '12px',
    x: 0,
    y: 25,
  },
  content: 'svag-macbook:~ svag$ ',
})

const res = Window({
  title: '🚞 Terminal',
  width: 350,
  height: 100,
  noStretch: true,
  content: [line, line2],
  minify: false,
})

/* end example */
console.log(res)
writeFileSync('images/window.svg', res)