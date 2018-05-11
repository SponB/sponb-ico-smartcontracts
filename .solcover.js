module.exports = {
port: 6545,
      accounts:10,
      testrpcOptions: '-p 6545 -u 0x54fd80d6ae7584d8e9a19fe1df43f04e5282cc43',
      testCommand: 'npm test',
      norpc: true,
      dir: 'test',
      copyNodeModules:true,
      copyPackages: ['zeppelin-solidity'],
      skipFiles: ['contracts/Migrations.sol']
};
