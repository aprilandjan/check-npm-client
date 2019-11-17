#!/usr/bin/env node

const chalk = require('chalk');
const { debug, ensureNpm, ensureYarn } = require('../lib/utils');

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
    if (script !== undefined) {
      console.log(
        `${chalk.yellow('Unrecognized Command')} "${chalk.red(script)}"`
      );
    }
    console.log(process.env.npm_config_user_agent);
    console.log(helpText);
}