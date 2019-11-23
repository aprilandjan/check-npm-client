const path = require('path');
const fs = require('fs');
const exec = require('child_process').execSync;
const assert = require('assert');

const cwd = path.resolve(__dirname, './fixture/project');
function run (cmd) {
  let success = true;
  try {
    exec(cmd, {
      cwd,
      env: {
        ...process.env,
        //  leave it undefined to prevent env inherit
        npm_config_user_agent: undefined,
      },
      stdio: 'ignore',
    });
  } catch (e) {
    success = false;
  }
  return success;
}

//  should correctly ensure yarn
describe('checkYarn', () => {
  it('should correctly executed with yarn', () => {
    assert(run('yarn checkYarn'));
  });
  it('should throw exception with npm', () => {
    assert(run('npm run checkYarn') === false);
  });
});

//  should correctly ensure npm
describe('checkNpm', () => {
  it('should correctly executed with npm', () => {
    assert(run('npm run checkNpm'));
  });
  it('should throw exception with yarn', () => {
    assert(run('yarn checkNpm') === false);
  });
});

describe('check automatically', () => {
  describe('no lock file exists', () => {
    it('should correctly executed with npm', () => {
      assert(run('npm run check'));
    });
    it('should correctly executed with yarn', () => {
      assert(run('yarn check'));
    });
  });
  describe('file yarn.lock existed only', () => {
    const lockfile = path.join(cwd, 'yarn.lock');
    before(() => {
      fs.openSync(lockfile, 'w');
    });
    after(() => {
      fs.unlinkSync(lockfile);
    });
    it('should correctly executed with yarn', () => {
      assert(run('yarn check'));
    });
    it('should throw exception with npm', () => {
      assert(run('npm run check') === false);
    });
  });

  describe('file package-lock.json existed only', () => {
    const lockfile = path.join(cwd, 'package-lock.json');
    before(() => {
      fs.openSync(lockfile, 'w');
    });
    after(() => {
      fs.unlinkSync(lockfile);
    });
    it('should correctly executed with npm', () => {
      assert(run('npm run check'));
    });
    it('should throw exception with yarn', () => {
      assert(run('yarn check'));
    });
  });

  describe('file yarn.lock & package-lock.json both existed', () => {
    const npmLock = path.join(cwd, 'package-lock.json');
    const yarnLock = path.join(cwd, 'yarn.lock');
    before(() => {
      fs.openSync(npmLock, 'w');
      fs.openSync(yarnLock, 'w');
    });
    after(() => {
      fs.unlinkSync(npmLock);
      fs.unlinkSync(yarnLock);
    });
    it('should correctly executed with npm', () => {
      assert(run('npm run check'));
    });
    it('should correctly executed with yarn', () => {
      assert(run('yarn check'));
    });
  });
});