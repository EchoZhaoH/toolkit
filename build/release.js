const chalk = require('chalk')
const execa = require('execa')
const args = require('minimist')(process.argv.slice(2))
const version = args._[0]

const step = msg => console.log(chalk.cyan(msg))
const run  = (bin, args, option = {}) => execa(
  bin,
  args,
  {stdio: 'inherit', ...option}
)

build()
async function build() {
  step('Start testing...')
  await run('yarn', ['test'])
  step('\nStart building...')
  await run('yarn', ['build'])

  step('\nPublihing packages...')
  try {
    await run(
      'npm',
      [
        'publish',
        '--new-version',
        version,
        '--access',
        'public'
      ],
      {
        stdio: 'pipe'
      }
    )
    console.log(chalk.green('Successfully published'))
  } catch (err) {
    throw err
  }
}