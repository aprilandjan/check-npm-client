var execSync = require('child_process').execSync;

module.exports = () => {
  var selfPid = process.pid;
  var parentPid = process.ppid;
  console.log('current pid', selfPid, 'parent pid', parentPid);
  
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
  
  //  current parent argv[0] should always be node since this program is executed by node
  //  argv[1] is the script location
  //  if it is started by npm or yarn, should it be npm/yarn entry script?
  console.log('current process: ', selfPid, process.argv[0], process.argv[1], getProcessInfoByPid(selfPid));
  console.log('parent process: ', parentPid, getProcessInfoByPid(parentPid));  
}