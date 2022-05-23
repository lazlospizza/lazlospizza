require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('hardhat-abi-exporter');
require('hardhat-contract-sizer');
require("@typechain/hardhat");

const fs = require("fs");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const privatekey = fs.readFileSync(".privatekey").toString().trim();

module.exports = {
  solidity: "0.8.9",
  settings: {
    optimizer: {
      enabled: true,
      runs: 2000,
      details: {
        yul: true,
        yulDetails: {
            stackAllocation: true,
            optimizerSteps: "dhfoDgvulfnTUtnIf",
        },
      },
    },
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      blockGasLimit: 70_000_000
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/67198f4f15244598b1a3980106ce8fe3",
      accounts: [privatekey],
      gasPrice: 35000000000
    },
    mainnet: {
      url: "https://mainnet.infura.io/v3/c4dc9d48550647c79f71bc67360bcf68",
      accounts: [privatekey],
      gasPrice: 35000000000
    },
  },
  etherscan: {
    apiKey: "FH2XUYE4T2EV7YGQKYJAY3FEIN9F33V68D"
  }
};