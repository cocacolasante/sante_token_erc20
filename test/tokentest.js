const { expect } = require("chai");
const { ethers } = require("hardhat");

const toWei = (num) => ethers.utils.parseEther(num.toString())
const fromWei = (num) => ethers.utils.formatEther(num)




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
        expect(await token.totalSupply()).to.equal(0)
        
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
            
            await token.mint(user1.address, 100, {value: "100000000000000000"})

            await token.mint(user2.address, 100, {value: "100000000000000000"})
        })
        it("checks the token was minted", async () =>{
            expect(await token.balanceOf(user1.address)).to.equal(100)
        })
        it("checks the burn function", async () =>{
            await token.connect(user1).burn(50)

            expect(await token.balanceOf(user1.address)).to.equal(50)
        })
        // it("checks the max supply fail case", async () =>{
        //     // await token.connect(user2).mint(user2.address, 9999800, {value: "99998000000000000000000"})
        //     await expect(token.connect(user2).mint(user2.address,failMintAmount , {value: "99998036867066144720768"})).to.be.reverted

            
        // })
        
        
    })



})