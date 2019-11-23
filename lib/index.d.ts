function checkNpmClient(client: 'npm' | 'yarn'): boolean;
function getLockFileExists(): {yarn?: boolean; npm?: boolean;};

export = {
  checkNpmClient,
  getLockFileExists,
}
