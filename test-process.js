const { execSync } = require('child_process');
const { getCurrentProcessInfo, getParentPidByPid } = require('./utils');

console.log('---> this is parent process');
// getCurrentProcessInfo();
// const info = execSync('node ./tested-child.js');
// console.log(info.toString());
const parentPid = getParentPidByPid(process.pid);
console.log(parentPid, 'should equal to', process.pid);
console.log('<--- parent process finished');