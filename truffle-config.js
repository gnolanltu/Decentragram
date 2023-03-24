require('babel-register');
require('babel-polyfill');
const HDWalletProvider = require('@truffle/hdwallet-provider');


module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    goerli: {
      provider: () => new HDWalletProvider("570f8f0bcc3bcb184855aec78b280f5a89797c4ad2001989fef56af64cef2c75", "https://goerli.infura.io/v3/3f3e0da6fbc7494ba0df5c306f55808e"),
      network_id: '5',
      gas: 4465030
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version: "0.8.3",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
