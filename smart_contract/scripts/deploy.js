// scripts/deploy.js

const hre = require("hardhat");

async function main() {
  // Get the contract factory
  const Transactions = await hre.ethers.getContractFactory("Transactions");

  // Deploy the contract
  const transactions = await Transactions.deploy();
  
  // Wait for the contract to be deployed
  await transactions.deployed();
  
  console.log("Transactions contract deployed to:", transactions.address);
}

// Run the deployment script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
