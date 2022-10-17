const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("Sante Token", ()=>{
    let token, deployer, user1, user2
    

    beforeEach(async ()=>{
        const tokenContractFactory = await ethers.getContractFactory("SanteToken")
        token = await tokenContractFactory.deploy()
        await token.deployed()

        const accounts = await ethers.getSigners()
        deployer = accounts[0]
        user1 = accounts[1]
        user2 = accounts[2]  

    })
    it("checks for token name and symbol", async ()=>{
        expect(await token.name()).to.equal("Sante Token")
        expect(await token.symbol()).to.equal("STK")
    })
    it("checks the total supply", async () =>{
        expect(await token.totalSupply()).to.equal(10000000)
        
    })
    it("checks the owner of the contract", async ()=>{
        expect(await token.owner()).to.equal(deployer.address)
    })
    it("checks the ownership is transferred", async () =>{
        await token.transferOwnership(user1.address)
        expect(await token.owner()).to.equal(user1.address)
    })

    describe("Token functions", () =>{
        beforeEach(async ()=>{
            await token.transfer(user1.address, 100)
            await token.connect(deployer).burn(200)
        })
        it("checks the token was transfer", async () =>{
            expect(await token.balanceOf(user1.address)).to.equal(100)
        })
        it("checks the burn function", async () =>{
            expect(await token.balanceOf(deployer.address)).to.equal(9999700)
        })
    })



})