import ts from 'rollup-plugin-typescript2'
import path from 'path'

const resolve = p => path.resolve(__dirname, p)

const tsPlugin = ts({
  tsconfig: resolve('tsconfig.json')
})

const defaultFormat = ['esm-bundler', 'cjs']

const outputConfig = {
  'esm-bundler': {
    file: resolve('./dist/esm-bundler.js'),
    format: 'es'
  },
  'esm-browser': {
    file: resolve('./dist/esm-browser.js'),
    format: 'es'
  },
  cjs: {
    file: resolve('./dist/cjs.js'),
    format: 'cjs'
  },
  global: {
    file: resolve('./dist/global.js'),
    format: 'iife'
  }
}
const inlineFormats = process.env.FORMATS && process.env.FORMATS.split(',')

const formats = inlineFormats || defaultFormat

const configJS = formats.map(format => createConfig(format, outputConfig[format]))

function createConfig(format, output, plugin = []) {
  if (!output) {
    console.log(require('chalk').yellow(`invalid format: ${format}`))
    process.exit(1)
  }
  const entryFile = './src/index.ts'
  output.sourcemap = true
  output.name = 'toolkit'
  return {
    input: resolve(entryFile),
    output,
    plugins: [
      tsPlugin,
    ]
  }
}

export default configJS