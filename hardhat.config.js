require('dotenv').config();
require("@nomiclabs/hardhat-etherscan");
require('@nomiclabs/hardhat-truffle5');
require("hardhat-gas-reporter");

const privateKey = process.env['PRIVATE_KEY'];
const alchemyKey = process.env['ALCHEMY_KEY'];
const etherscanApiKey = process.env['ETHERSCAN_API_KEY'];

task("accounts", "Prints the list of accounts", async(taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
      console.log(account.address);
  }
});

module.exports = {
  defaultNetwork: "localhost",
  networks: {
    localhost: {
      url: 'http://127.0.0.1:7545',
      port: 7545,
    },
    main: {
      url: 'https://eth-mainnet.g.alchemy.com/v2/' + alchemyKey,
      accounts: [privateKey],
      chainId: 1,
    },
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/' + alchemyKey,
      accounts: [privateKey],
      chainId: 5,
    },
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/' + alchemyKey,
      accounts: [privateKey],
      chainId: 11155111,
    },
    polygon: {
      url: 'https://polygon-mumbai.g.alchemy.com/v2/' + alchemyKey,
      accounts: [privateKey],
      chainId: 137,
    },
    mumbai: {
      url: 'https://polygon-mumbai.g.alchemy.com/v2/' + alchemyKey,
      accounts: [privateKey],
      chainId: 80001,
    },
  },
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  etherscan: {
    apiKey: etherscanApiKey
  },
  gasReporter: {
    enabled: true
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  }
}