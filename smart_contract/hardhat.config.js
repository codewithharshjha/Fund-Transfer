//https://eth-sepolia.g.alchemy.com/v2/MVHp9QuCgKmSvln9wDHSX0m92_2M_bzl
//https://eth-sepolia.g.alchemy.com/v2/MVHp9QuCgKmSvln9wDHSX0m92_2M_bzl
//https://eth-sepolia.g.alchemy.com/v2/cRQmABzHCVMSxe7aYEo3A87g45qxEuuJ

// require("@nomiclabs/hardhat-waffle")
// module.exports={
// solidity:'0.8.0',
// networks:{
//  sepolia:{
//     url:"https://eth-sepolia.g.alchemy.com/v2/_Q8XHfGeV-cEgcEOGoQ5UTDii669MTio",
// accounts:["6fd59f71789b386d8aa78d0e6b0dfb5f04dddff1609c832efa3179edb65d8184"]
//   }
// }
// }
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
module.exports = {
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {
    },
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/_Q8XHfGeV-cEgcEOGoQ5UTDii669MTio",
      accounts:["6fd59f71789b386d8aa78d0e6b0dfb5f04dddff1609c832efa3179edb65d8184"]
    }
  },
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  }
}