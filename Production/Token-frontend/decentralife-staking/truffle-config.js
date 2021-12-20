/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * trufflesuite.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

//const HDWalletProvider = require('@truffle/hdwallet-provider');
// const infuraKey = "fj4jll3k.....";
//
//const fs = require('fs');
//const mnemonic = fs.readFileSync(".secret").toString().trim();

const HDWalletProvider = require('@truffle/hdwallet-provider');
// const infuraKey = "fj4jll3k.....";
//
// const fs = require('fs');
 const mnemonic = "drip hen visit proof differ slot tobacco gaze hunt describe slogan offer";
module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  networks: {
    // Useful for testing. The `development` name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache-cli, geth or parity) in a separate terminal
    // tab if you use this network and you must also set the `host`, `port` and `network_id`
    // options below to some value.
    //
    development: {
      host:       'localhost',
      port:       7545,
      network_id: '*'
  },
    // Another network with more advanced options...
    // advanced: {
    // port: 8545,             // Custom port
     //network_id: 5777,       // Custom network
    // gas: 200000000,           // Gas sent with each transaction (default: ~6700000)
    // gasPrice: 20000000000,  // 20 gwei (in wei) (default: 100 gwei)
    // from: <address>,        // Account to send txs from (default: accounts[0])
    // websockets: true        // Enable EventEmitter interface for web3 (default: false)
    //},
    // Useful for deploying to a public network.
    // NB: It's important to wrap the provider as a function.
    kovan: {
      provider: () => new HDWalletProvider(mnemonic, `https://kovan.infura.io/v3/e272d9d07a2e489d94cee678fede6768`),
      network_id: 42,       // Ropsten's id
      gas: 3000000,        // Ropsten has a lower block limit than mainnet
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
      },

    mainnet: {
        provider: () => {
          return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/v3/e272d9d07a2e489d94cee678fede6768')
        },
        network_id: 1,
        gas: 6500000,           // Default gas to send per transaction
        gasPrice: 1000000000,  // 10 gwei (default: 20 gwei)
        confirmations: 0,       // # of confs to wait between deployments. (default: 0)
        timeoutBlocks: 200,     // # of blocks before a deployment times out  (minimum/default: 50)
        skipDryRun: false        // Skip dry run before migrations? (default: false for public nets )
      },
    // Useful for private networks
    private: {
    provider: () => new HDWalletProvider(mnemonic, `https://network.io`),
    network_id: 2111,   // This network is yours, in the cloud.
    production: true    // Treats this network as if it was a public net. (default: false)
    }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  // Configure your compilers
  compilers: {
    solc: {
      version: "0.5.13",    // Fetch exact version from solc-bin (default: truffle's version)
      docker: false,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
      optimizer: {
      enabled: true,
      runs: 1500
      },
     // evmVersion: "muirglacier"
      }
    },
  },
};
