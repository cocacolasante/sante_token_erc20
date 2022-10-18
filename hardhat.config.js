require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    mumbai: {
      url: process.env.POLYGON_MUMBAI_URL,
      accounts: [process.env.PRIVATE_KEY_DEPLOYER],
    },
    // mainnet: {
    //   chainId: 137,
    //   url: process.env.POLYGON_MAINNET,
    //   accounts: [process.env.PRIVATE_KEY_DEPLOYER],
    // },
  },
  etherscan: {
    apiKey:{
      polygon: process.env.POLYGONSCAN_API_KEY,
    } 
 }
};
