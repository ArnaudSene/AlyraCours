var HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config();

module.exports = {

  contracts_build_directory: "../client/src/contracts",
  networks: {
    development: {
     host: "127.0.0.1",
     port: 8545,
     network_id: "*"
    },
    sepolia: {
      provider: function() {
          return new HDWalletProvider({
              mnemonic: {phrase: process.env.MNEMONIC},
              providerOrUrl: `https://sepolia.infura.io/v3/${process.env.INFURA_ID}`
          })
      },
      network_id: 11155111
    }
  },
  mocha: { },

  compilers: {
    solc: {
      version: "0.8.18",      // Fetch exact version from solc-bin (default: truffle's version)
       optimizer: {
         enabled: false,
         runs: 200
       }
    }
  }
};
  