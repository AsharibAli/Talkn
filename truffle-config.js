/* -------------------------------------------------------------------------------------------------------------------
    THIS FILE CONTAINS THE TRUFFLE CONFIGS FOR NETWORK DEPLOYMEN - CHANGE ONLY WHAT WE'VE OUTLINED
------------------------------------------------------------------------------------------------------------------- */

const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");

/* ADD YOUR METAMASK SECRET PASSPHRASE */
const mnemonic = process.env.MNEMONIC;

module.exports = {
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),

  plugins: ["truffle-plugin-verify"],
  api_keys: {
    bscscan: "",
  },

  /* SUPPORTED NETWORKS BY OUR APP [BOTH MAINNET AND TESTNET] */
  networks: {
    /* LOCAL DEVELOPMENT NETWORK - REQUIRES GANACHE:
            - To deploy contracts on this network, run this command in the root directory:
                truffle migrate --reset
        */
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },

    /* BINANCE SMART CHAING TEST NETWORK:
            - To deploy contracts on this network, run this command in the root directory:
                truffle migrate --network bsctest --reset
        */
    bsctest: {
      provider: () =>
        /* the following line config is
                    new HDWalletProvider(Metamask-secret-passphrase, RPC-URL, index-of-depolyer-account-in-Metamask, i.e. 0 means the first acoount)
                */
        new HDWalletProvider(
          mnemonic,
          `https://data-seed-prebsc-1-s1.binance.org:8545`,
          0
        ),
      network_id: 97,
    },

    /* MUMBAI TEST NETWORK FOR POLYGON:
            - To deploy contracts on this network, run this command in the root directory:
                truffle migrate --network bsctest --reset
        */
    mumbai: {
      provider: () =>
        /* the following line config is
                    new HDWalletProvider(Metamask-secret-passphrase, RPC-URL, index-of-depolyer-account-in-Metamask, i.e. 0 means the first acoount)
                */
        new HDWalletProvider(
          mnemonic,
          `https://matic-mumbai.chainstacklabs.com`,
          0
        ),
      network_id: 80001,
    },

    /* POLYGON MAINNET:
            - To deploy contracts on this network, run this command in the root directory:
                truffle migrate --network polygon --reset
        */
    polygon: {
      /* the following line config is
                    new HDWalletProvider(Metamask-secret-passphrase, RPC-URL, index-of-depolyer-account-in-Metamask, i.e. 0 means the first acoount)
                */
      provider: () => new HDWalletProvider(mnemonic, `https://polygon-rpc.com`),
      network_id: 137,
    },

    /* BINANCE SMART CHAING MAINNET:
            - To deploy contracts on this network, run this command in the root directory:
                truffle migrate --network bsc --reset
        */
    bsc: {
      provider: () =>
        /* the following line config is
                    new HDWalletProvider(Metamask-secret-passphrase, RPC-URL, index-of-depolyer-account-in-Metamask, i.e. 0 means the first acoount)
                */
        new HDWalletProvider(mnemonic, `https://bsc-dataseed1.binance.org`),
      network_id: 56,
    },

    /* CELO MAINNET:
            - To deploy contracts on this network, run this command in the root directory:
                truffle migrate --network celo --reset
        */
    celo: {
      provider: function () {
        /* the following line config is
                    new HDWalletProvider(Metamask-secret-passphrase, RPC-URL, index-of-depolyer-account-in-Metamask, i.e. 0 means the first acoount)
                */
        return new HDWalletProvider(mnemonic, "https://forno.celo.org");
      },
      network_id: 42220,
    },

    /* CELO ALFAJORES TEST NETWORK: 
            - To deploy contracts on this network, run this command in the root directory: 
                truffle migrate --network celotestnet --reset
        */
    celotestnet: {
      provider: function () {
        /* the following line config is 
                    new HDWalletProvider(Metamask-secret-passphrase, RPC-URL, index-of-depolyer-account-in-Metamask, i.e. 0 means the first acoount)
                */
        return new HDWalletProvider(
          mnemonic,
          "https://alfajores-forno.celo-testnet.org",
          0
        );
      },
      network_id: 44787,
    },
  },

  // SOLIDITY COMPILER CONFFIGURATION - don't miss with this please unless you know what you're doing
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      version: "^0.8.0",
    },
  },
};
