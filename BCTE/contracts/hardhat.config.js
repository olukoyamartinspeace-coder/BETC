require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.19",
    networks: {
        hardhat: {
            chainId: 1337
        },
        bnb_testnet: {
            url: "https://data-seed-prebsc-1-s1.binance.org:8545",
            accounts: [], // Add private key here
        }
    }
};
