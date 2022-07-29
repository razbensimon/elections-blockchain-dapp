pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract HitCoin is Ownable, ERC20 {
	constructor() Ownable() ERC20("Hit Coin", "HIT"){
	}

	function mint(address _to, uint _amount) public {
		_mint(_to, _amount * 10 ** 18);
	}
}