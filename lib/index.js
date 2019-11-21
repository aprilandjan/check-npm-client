const debug = require('debug')('check-npm-client');
const parseNpmUserAgent = require('npm-config-user-agent-parser');
const fs = require('fs');
const path = require('path');

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

/** check if lock file exists for yarn & npm */
function getLockFileExists () {
  const result = {};
  const cwd = process.cwd();
  if (!fs.existsSync(path.join(cwd, 'package.json'))) {
    return result;
  }
  if (fs.existsSync(path.join(cwd, 'yarn.lock'))) {
    result.yarn = true;
  }
  if (fs.existsSync(path.join(cwd, 'package-lock.json'))
    || fs.existsSync(path.join(cwd, 'npm-shrinkwrap.json'))
  ) {
    result.npm = true;
  }
  return result;
}

module.exports = {
  checkNpmClient,
  getLockFileExists,
};
