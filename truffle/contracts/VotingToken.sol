pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract VotingToken is Ownable, ERC721 {
	uint256 public tokenCounter;

	constructor() Ownable() ERC721("Voting", "VOT"){
		tokenCounter = 0;
	}

	function createToken(address _voter) public onlyOwner returns (uint256) {
		uint newItemId = tokenCounter;
		_safeMint(_voter, newItemId);
		tokenCounter = tokenCounter + 1;
		return newItemId;
	}

	function hasVotingRight(address _voter) public returns (bool) {
		if (balanceOf(_voter) > 0) {
			return true;
		}
		return false;
	}
}