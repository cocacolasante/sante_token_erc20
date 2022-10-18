
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  
  const SanteTokenFactory = await ethers.getContractFactory("SanteToken")
  const SanteToken = await SanteTokenFactory.deploy()
  await SanteToken.deployed();

  console.log(`Sante Token Deployed to ${SanteToken.address}`)
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
