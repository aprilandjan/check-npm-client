var execSync = require('child_process').execSync;

function getProcessInfoByPid(pid) {
  const stdout = execSync('tasklist');
  var lines = stdout.toString().split('\n');
  let result;
  lines.forEach(function (line) {
    var parts = line.split('=');
    parts.forEach(function (items) {
      if (items.toString().indexOf(pid) > -1) {
        // console.log(items.toString().substring(0, items.toString().indexOf(pid)));
        // console.log(items);
        result = items.toString().trim();
      }
    })
  });
  return result;
}

function getCurrentProcessInfo () {
  var selfPid = process.pid;
  var parentPid = process.ppid;
  // console.log('current pid', selfPid, 'parent pid', parentPid);
  
  //  current parent argv[0] should always be node since this program is executed by node
  //  argv[1] is the script location
  //  if it is started by npm or yarn, should it be npm/yarn entry script?
  console.log(`current process: pid=[${selfPid}], execPath=[${process.argv[0]}], script=[${process.argv[1]}], taskinfo=[${getProcessInfoByPid(selfPid)}]`);
  console.log(`parent process: pid=[${parentPid}], taskinfo=[${getProcessInfoByPid(parentPid)}]`);
}

// https://stackoverflow.com/questions/7486717/finding-parent-process-id-on-windows
// https://superuser.com/questions/415360/how-do-i-find-out-command-line-arguments-of-a-running-program
function getParentPidByPid(pid) {
  // const stdout = execSync(`wmic process get processid,parentprocessid,executablepath|find "${pid}"`);
  const stdout = execSync(`wmic process get processid,parentprocessid,executablepath|find "${pid}"`).toString().trim();
  const [execPath, processId] = stdout.split('\n').map(w => w.trim());
  console.log(execPath, processId);
  return {
    execPath,
    pid: parseInt(processId),
  }
}

function getAllAncesterProcessInfo (pid) {
  // 
}

module.exports = {
  getProcessInfoByPid,
  getParentPidByPid,
  getCurrentProcessInfo,
}