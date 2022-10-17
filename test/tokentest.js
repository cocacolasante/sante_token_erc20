const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("Sante Token", ()=>{
    let token, deployer, user1, user2
    

    beforeEach(async ()=>{
        const tokenContractFactory = await ethers.getContractFactory("SanteToken")
        token = await tokenContractFactory.deploy()
        await token.deployed()

        console.log(`Sante Token Deployed to: ${token.address}`)

        const accounts = await ethers.getSigners()
        deployer = accounts[0]
        user1 = accounts[1]
        user2 = accounts[2]  

    })
    it("checks for token name and symbol", async ()=>{
        expect(await token.name()).to.equal("Sante Token")
        expect(await token.symbol()).to.equal("STK")
    })
    
})