const { execSync } = require('child_process');
const showProcessInfo = require('./show-process-info');

console.log('---> this is parent process');
showProcessInfo();
const info = execSync('node ./tested-child.js');
console.log(info.toString());
console.log('<--- parent process finished');