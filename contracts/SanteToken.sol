// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "hardhat/console.sol";

contract SanteToken is ERC20, ERC20Burnable, Ownable {
    uint public maxSupply = 10000000000000000000000000;
    uint public currentCount;
    uint public mintingFee = 100000000000000000;
    address payable private contractDeployer;

    constructor() ERC20("Sante Token", "STK") {
        contractDeployer = payable(msg.sender);
    }

    function mint(address to, uint256 amount) payable public {
        require(msg.value >= mintingFee, "please pay minting fee");
        uint afterPurchaseSupply = amount + currentCount;
        require(afterPurchaseSupply < maxSupply, "Not enough left to mint");
        _mint(to, amount);
        contractDeployer.transfer(msg.value);
        currentCount+=amount;
    }
    
    function burn(uint256 amount) public override {
        _burn(_msgSender(), amount);
        currentCount -= amount;
    }

    function setMintFee(uint newFee) external onlyOwner{
        require(msg.sender == contractDeployer, "Not authorized");
        mintingFee = newFee;
    }

    function returnCurrentSupply() external view returns(uint){
        return currentCount;
    }
}
