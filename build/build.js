const execa = require('execa')
const path = require('path')
const fs = require('fs-extra')

const args  = require('minimist')((process.argv.slice(2)))

const formats = args.formats || args.f

build()

async function build() {
  if (!formats) {
    await fs.remove(path.resolve('dist'))
  }
  await execa(
    'rollup',
    [
      '-c',
      '--environment',
      [
        `NODE_ENV:${true}`,
        formats ? `FORMATS:${formats}` : ''
      ].filter(Boolean).join(',')
    ],
    { stdio: 'inherit' }
  )

  const { Extractor, ExtractorConfig } = require('@microsoft/api-extractor')
  const apiConfigPath = path.resolve('api-extractor.json')
  const extractorConfig = ExtractorConfig.loadFileAndPrepare(apiConfigPath)
  const result = Extractor.invoke(extractorConfig, {
    localBuild: true,
    showVerboseMessages: true,
  })

  if (result.succeeded) {
    console.log('build successed')
  } else {
    console.error(
      `API Extractor completed with ${extractorResult.errorCount} errors` +
        ` and ${extractorResult.warningCount} warnings`
    )
    process.exitCode = 1
  }
}