require('dotenv').config();
require('babel-register');
require('babel-polyfill');

const HDWalletProvider = require('truffle-hdwallet-provider');

const providerWithMnemonic = (mnemonic, rpcEndpoint) =>
    new HDWalletProvider(mnemonic, rpcEndpoint);

const infuraProvider = network => providerWithMnemonic(
    process.env.MNEMONIC || '',
    `https://${network}.infura.io/${process.env.INFURA_API_KEY}`
);

const ropstenProvider = process.env.SOLIDITY_COVERAGE
    ? undefined
    : infuraProvider('ropsten');

module.exports = {
    networks: {
        development: {
            host: "localhost",
            port: 8545,
            network_id: "*", // Match any network id
            gas: 5500000,
        },
        ropsten: {
            provider: ropstenProvider,
            network_id: 3, // eslint-disable-line camelcase
        },
        coverage: {
            host: 'localhost',
            network_id: '*', // eslint-disable-line camelcase
            port: 8555,
            gas: 0xfffffffffff,
            gasPrice: 0x01,
        },
        testrpc: {
            host: 'localhost',
            port: 8545,
            network_id: '*', // eslint-disable-line camelcase
            gas: 0xfffffffffff,
            //from:"0xc434136c76a349c32f1ba070c988d9b69b8aa6e",
        },
        ganache: {
            host: 'localhost',
            port: 7545,
            network_id: '*', // eslint-disable-line camelcase
        },
    },
    rpc: {
        host: 'localhost',
        port:8080
    }
};
