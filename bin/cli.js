#!/usr/bin/env node

const chalk = require('chalk');
const debug = require('debug')('check-npm-client');
const { checkNpmClient, getLockFileExists } = require('../lib');

const helpText = `
${chalk.green('Usage')}
  add check script as the pre-hook script in your package.json
  to ensure that your script is executed by specific npm client (${chalk.green('npm')} or ${chalk.green('yarn')}).

${chalk.green('Example')}
  $ check-npm-client
  $ check-npm-client --npm-only
  $ check-npm-client --yarn-only
`;

const args = process.argv.slice(2);
const script = args[0];

debug('cmd:', process.cwd());
debug('script:', script);
debug('npm user agent', process.env.npm_config_user_agent);

function ensureYarn () {
  if (!checkNpmClient('yarn')) {
    console.error(`[check-npm-client] please use ${chalk.green('yarn')} instead of ${chalk.red('npm')}`);
    process.exit(-1);
  }
  debug('the script is executed by yarn');
}

function ensureNpm () {
  if (!checkNpmClient('npm')) {
    console.error(`[check-npm-client] please use ${chalk.green('npm')} instead of ${chalk.red('yarn')}`);
    process.exit(-1);
  }
  debug('the script is executed by npm');
}

//  check only for the first params to decide which to use
switch (script) {
  //  allow npm to run script only
  case '--npm-only':
  case 'npmOnly':
    ensureNpm();
    break;
  //  allow yarn to run script only
  case '--yarn-only':
  case 'yarnOnly':
    ensureYarn();
    break;
  //  auto detect if yarn or npm is more suitable according to lock files
  default:
    if (script === undefined) {
      debug('auto detect lock')
      const lockFiles = getLockFileExists();
      if (lockFiles.npm && !lockFiles.yarn) {
        debug('only npm lock found. try ensure npm');
        ensureNpm();
      } else if (lockFiles.yarn && !lockFiles.npm) {
        debug('only yarn lock found. try ensure yarn');
        ensureYarn();
      } else {
        debug('cannot decide which client to use');
      }
    } else {
      //  unrecognized command
      console.log(
        `${chalk.yellow('Unrecognized Command')} "${chalk.red(script)}"`
      );
      console.log(helpText);
    }
}