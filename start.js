var execSync = require('child_process').execSync;
var selfPid = process.pid;
var selfPpid = process.ppid;
console.log('current pid', selfPid, 'current ppid', selfPpid);

//  windows: get current pid
// exec('tasklist', function (err, stdout, stderr) {
//   var lines = stdout.toString().split('\n');
//   var results = new Array();
//   lines.forEach(function (line) {
//     var parts = line.split('=');
//     yarn .forEach(function (items) {
//       if (items.toString().indexOf(pid) > -1) {
//         console.log(items.toString().substring(0, items.toString().indexOf(pid)));
//       }
//     })
//   });
// });

function getProcessInfoByPid(pid) {
  const stdout = execSync('tasklist');
  var lines = stdout.toString().split('\n');
    lines.forEach(function (line) {
      var parts = line.split('=');
      parts.forEach(function (items) {
        if (items.toString().indexOf(pid) > -1) {
          console.log(items.toString().substring(0, items.toString().indexOf(pid)));
        }
      })
    });
}

console.log('this process: ', selfPid, process.argv[1], getProcessInfoByPid(selfPid));
console.log('parent process: ', selfPpid, getProcessInfoByPid(selfPpid));