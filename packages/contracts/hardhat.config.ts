import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "hardhat-gas-reporter";

require("dotenv").config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
export default {
  solidity: "0.8.9",
  networks: {
    hardhat: {
      chainId: 1337,
      mining: {
        auto: false,
        interval: 1000,
      },
    },
  },
};
