const path = require('path');
const exec = require('child_process').execSync;
const assert = require('assert');

const cwd = path.resolve(__dirname, './fixture/project');
function runTest (cmd, cwd) {
  let success = true;
  try {
    exec(cmd, { cwd });
  } catch (e) {
    success = false;
  }
  return success;
}

//  should correctly ensure yarn
assert(runTest('npm run checkYarn', cwd) === false);
assert(runTest('yarn checkYarn', cwd));

//  should correctly ensure npm
assert(runTest('npm run checkNpm', cwd));
assert(runTest('yarn checkNpm', cwd) === false);

//  should correctly ensure automatically
// TODO: