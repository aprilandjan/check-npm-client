# [check-npm-client](https://www.npmjs.com/package/check-npm-client)

[![version](https://img.shields.io/npm/v/check-npm-client?style=flat-square)](https://www.npmjs.com/package/check-npm-client) [![version](https://img.shields.io/npm/dm/check-npm-client?style=flat-square)](https://www.npmjs.com/package/check-npm-client)

`npm` and `yarn` are both npm clients used to manage node.js project dependencies. They are somehow different in some behavior, and thus can affect project running.

This package provide ready-to-use functionality to check current npm client. When used as [pre](https://docs.npmjs.com/misc/scripts#hook-scripts) commands in npm scripts, it will check if the script is executed by specific npm client (`yarn` or `npm`). If it is restricted, then the script execution will be aborted early.

## Usage Scenario

`yarn` uses [yarn.lock](https://yarnpkg.com/lang/en/docs/yarn-lock/) to ensure versions of dependencies, but `npm` use [package-lock.json](https://docs.npmjs.com/files/package-lock.json) to do that instead. If you use `yarn` to install dependencies in a project which is actually managed by `npm` and `package-lock.json`, the actually installed dependencies in `node_modules` might be different due to [semver](https://docs.npmjs.com/misc/semver) behavior, and this could lead to some un-expected exception while code running.

This is common when working with others because people tends to use `yarn` or `npm` as their wishes.

## Installation

```bash
$ npm install check-npm-client
```

or alternatively, with `yarn`:

```bash
$ yarn add check-npm-client
```

## Example

This package provide a command line tool to invoke checking functionality:

```bash
# the user must use `npm` to execute the script
$ check-npm-client --npm-only

# the user must use `yarn` to execute the script
$ check-npm-client --yarn-only

# automatically check according to current working directory lock files if exists
$ check-npm-client
```

Besides, you can use it programmatically:

```javascript
const { checkNpmClient } = require('check-npm-client');
console.log(checkNpmClient('yarn'));  // true/false
```

### Ensure before installation

Add the script in your `package.json` to ensure that user must install dependencies with `yarn`:

```json
{
  "scripts": {
    "preinstall": "check-npm-client --yarn-only"
  }
}
```

**Note**: `yarn` and `npm` treat `preinstall` script a little differently. `npm` execute it only before `npm install` (not before `npm install <module>`), but `yarn` always run it before any installation. See [issue](https://github.com/npm/cli/issues/481) here. So if specified as `--yarn-only` and user use `npm` to install another dependency, the `preinstall` will not be invoked (so the ensurance will fail).

### Ensure before any other script

Add the script in your `package.json` to ensure that user must use `npm` to run the script `my-task`:

```json
{
  "scripts": {
    "premy-task": "check-npm-client --npm-only",
    "my-task": "node my-task.js"
  }
}
```

## References

- <https://github.com/npm/cli/issues/481>
- <https://github.com/yibn2008/find-process>
- <https://stackoverflow.com/questions/46725374/how-to-run-a-script-before-installing-any-npm-module>
- <https://github.com/yarnpkg/yarn/issues/5063>