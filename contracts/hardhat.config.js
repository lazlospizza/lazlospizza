const dotenv = require('dotenv');

require('@nomiclabs/hardhat-etherscan');
require('@nomiclabs/hardhat-waffle');
require('@typechain/hardhat');
require('hardhat-abi-exporter');
require('hardhat-contract-sizer');

dotenv.config();

task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  solidity: '0.8.9',
  settings: {
    optimizer: {
      enabled: true,
      runs: 2000,
      details: {
        yul: true,
        yulDetails: {
          stackAllocation: true,
          optimizerSteps: 'dhfoDgvulfnTUtnIf',
        },
      },
    },
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      blockGasLimit: 70_000_000,
    },
    rinkeby: {
      allowUnlimitedContractSize: true,
      url: process.env.RINKEBY_URL || '',
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
