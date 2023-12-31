require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("./tasks/block-number")
require("hardhat-gas-reporter")

/** @type import('hardhat/config').HardhatUserConfig */

// or condition just because it doesn't throw errror
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "https://eth-sepolia"
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0Xkey"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "0Xkey"
const COIN_MARKET_API_KEY = process.env.COIN_MARKET_API_KEY || "0Xkey"
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
    },
  },
  solidity: "0.8.8",
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: false,
    outputFile: "gas-reporter.txt",
    noColor: true,
    currency: "USD",
    coinmarketcap: COIN_MARKET_API_KEY,
  },
}
