// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "hardhat/console.sol";

contract SanteToken is ERC20, ERC20Burnable, Ownable {
    uint public maxSupply = 10000000000000000000000000;
    uint public currentCount;

    constructor() ERC20("Sante Token", "STK") {}

    function mint(address to, uint256 amount) public {
        uint afterPurchaseSupply = amount + currentCount;
        require(afterPurchaseSupply < maxSupply, "Not enough left to mint");
        _mint(to, amount);
        currentCount+=amount;
    }
    
    function burn(uint256 amount) public override {
        _burn(_msgSender(), amount);
        currentCount -= amount;
    }

    function returnCurrentSupply() external view returns(uint){
        return currentCount;
    }
}
