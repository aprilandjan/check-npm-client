const findProcess = require('find-process');

(async (pid) => {
  let id = pid;
  let finished = false;
  let iteration = 1;
  while(!finished) {
    const [info] = await findProcess('pid', id, true);
    //  cannot found this process info, or process is not invoked by node
    if (!info) {
      console.log(`cannot found process info by id ${id}.`)
      finished = true;
    } else {
      console.log(`====> round ${iteration++}`);
      console.log(`pid = ${info.pid}, cmd = ${info.cmd}`, info);
      id = info.ppid;
      // TODO: check npm client here
    }
  }
})(process.pid);