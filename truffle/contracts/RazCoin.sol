// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract RazCoin is Ownable, ERC20 {
    constructor() Ownable() ERC20('Raz Coin', 'RAZ') {}

    function mint(address _to, uint256 _amount) public onlyOwner {
        _mint(_to, _amount * 10**decimals());
    }
}
