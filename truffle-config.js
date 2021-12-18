const HDWalletProvider = require('@truffle/hdwallet-provider');

require('dotenv').config();

const privateKey = process.env['PRIVATE_KEY'];
const infuraProjectId = process.env['INFURA_PROJECT_ID'];

module.exports = {
    networks: {
        development: {
            host: '127.0.0.1',
            port: 8545,
            network_id: '*'
        },
        ropsten: {
            provider: () =>
            new HDWalletProvider({
              privateKeys: [privateKey],
              providerOrUrl:
                'https://ropsten.infura.io/v3/' + infuraProjectId,
            }),
            network_id: 3,
            confirmations: 2,
            timeoutBlocks: 400,
            skipDryRun: true,
        },
        kovan: {
            provider: () =>
            new HDWalletProvider({
              privateKeys: [privateKey],
              providerOrUrl:
                'https://kovan.infura.io/v3/' + infuraProjectId,
            }),
            network_id: 42,
            confirmations: 2,
            timeoutBlocks: 400,
            skipDryRun: true,
        },
        rinkeby: {
            provider: () =>
            new HDWalletProvider({
              privateKeys: [privateKey],
              providerOrUrl:
                'https://rinkeby.infura.io/v3/' + infuraProjectId,
            }),
            network_id: 4,
            confirmations: 2,
            timeoutBlocks: 400,
            skipDryRun: true,
        },
        main: {
            provider: () =>
            new HDWalletProvider({
              privateKeys: [privateKey],
              providerOrUrl:
                'https://mainnet.infura.io/v3/' + infuraProjectId,
            }),
            network_id: 1,
            confirmations: 2,
            timeoutBlocks: 400,
            skipDryRun: true,
        },
        polygon: {
            provider: () =>
              new HDWalletProvider({
                privateKeys: [privateKey],
                providerOrUrl:
                  'https://polygon-mainnet.infura.io/v3/' + infuraProjectId,
              }),
            network_id: 137,
            confirmations: 2,
            timeoutBlocks: 400,
            skipDryRun: true,
            chainId: 137,
          },
          mumbai: {
            provider: () =>
              new HDWalletProvider({
                privateKeys: [privateKey],
                providerOrUrl:
                  'https://polygon-mumbai.infura.io/v3/' + infuraProjectId,
              }),
            network_id: 80001,
            confirmations: 2,
            timeoutBlocks: 400,
            skipDryRun: true,
            chainId: 80001,
          },
          besu: {
            provider: () =>
            new HDWalletProvider({
              privateKeys: [privateKey],
              providerOrUrl: 'http://127.0.0.1:8545'
            }),
            gas: 4700000,
            gasPrice: 0,
            network_id: '*',

        },
    },
    compilers: {
        solc: {
            version: "0.6.8",
            docker: false,
            settings: {
                optimizer: {
                    enabled: true,
                }
            }
        }
    }
}
