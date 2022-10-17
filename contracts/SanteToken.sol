// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "hardhat/console.sol";

contract SanteToken is ERC20, ERC20Burnable, Ownable {
    constructor() ERC20("Sante Token", "STK") {}

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}
