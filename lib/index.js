const debug = require('debug')('check-npm-client');
const chalk = require('chalk');
const findProcess = require('find-process');
const parseNpmUserAgent = require('npm-config-user-agent-parser');

/** find all ancestor process info by pid. If failed to failed to found ppid, then exit. */
async function findAncestorProcessInfo (pid) {
  let id = pid;
  let finished = false;
  let iteration = 1;
  while(!finished) {
    const [info] = await findProcess('pid', id, true);
    //  cannot found this process info, or process is not invoked by node
    if (!info) {
      debug(`cannot found process info by id ${id}.`)
      finished = true;
    } else {
      debug(`round ${iteration++}`);
      debug(`pid = ${info.pid}, cmd = ${info.cmd}`, info);
      id = info.ppid;
      // TODO: check npm client here
    }
  }
}

/** get current npm client */
function checkNpmClient (client) {
  const current = parseNpmUserAgent(process.env.npm_config_user_agent);
  // debug('parsed npm user agent:', current);
  if (client === 'yarn' && !current.yarn
    || client === 'npm' && !current.npm
  ) {
    return false;
  }
  return true;
}

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

module.exports = {
  debug,
  findAncestorProcessInfo,
  checkNpmClient,
  ensureYarn,
  ensureNpm,
};
