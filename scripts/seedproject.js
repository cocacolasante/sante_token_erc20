
const { ethers } = require("hardhat");
const hre = require("hardhat");
const SANTE_TOKEN_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

async function main() {

    const accounts = await ethers.getSigners()

    const signer = accounts[0];
  
    const SanteToken = await ethers.getContractAt("SanteToken", SANTE_TOKEN_ADDRESS, signer)

    const minter = accounts[1]
    const minter2 = accounts[2]
    
    let txn = await SanteToken.connect(minter).mint(minter.address, 1000)
    await txn.wait()
    txn = await SanteToken.connect(minter2).mint(minter2.address, 12343)
    await txn.wait()
    console.log(txn)

  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});