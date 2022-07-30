// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./HitCoin.sol";
import "./VotingToken.sol";

contract Election is Ownable {
	struct Candidate {
		uint id;
		string name;
		uint voteCount;
	}

	struct Voter {
		address voterAddress;
		bool isVoted;
	}

	enum Status {Created, Voting, Ended}

	struct Elections {
		uint256 startTime;
		uint256 endTime;
		Status status;
	}

	// VARIABLES
	Elections public elections;
	mapping(uint => address) public votersAddresses;
	mapping(address => Voter) public voters; // Store accounts that have voted
	uint public votersCount = 0;
	uint public totalVotesCount = 0;
	mapping(uint => Candidate) public candidates; // Store candidates and their votes count
	uint public candidatesCount = 0;

	// EVENTS
	event votedEvent(uint indexed _candidateId);
	event voterAdded(address voter);

	// MODIFIERS
	modifier isStatus(Status _status){
		require(elections.status == _status, "Can't perform in this phase of elections");
		_;
	}

	// CONSTRUCTOR
	constructor() {
		elections = Elections(0, 0, Status.Created);
		addVoter(owner());
	}

	// FUNCTIONS
	function addCandidate(string memory _name)
	public isStatus(Status.Created)
	{
		require(bytes(_name).length != 0);
		candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
		candidatesCount++;
	}

	function getCandidates() public onlyOwner view returns (Candidate[] memory){
		Candidate[] memory arr = new Candidate[](candidatesCount);
		for (uint i = 0; i < candidatesCount; i++) {
			Candidate storage candidate = candidates[i];
			arr[i] = candidate;
		}
		return arr;
	}

	function getVoters() public onlyOwner view returns (Voter[] memory){
		Voter[] memory arr = new Voter[](votersCount);
		for (uint i = 0; i < votersCount; i++) {
			address voterAddress = votersAddresses[i];
			Voter storage voter = voters[voterAddress];
			arr[i] = voter;
		}
		return arr;
	}

	function addVoter(address _voterAddress)
	public onlyOwner isStatus(Status.Created)
	{
		// Do not allow address 0x0
		require(_voterAddress != address(0));
		// Do not allow re-add of an existing voter
		require(voters[_voterAddress].voterAddress == address(0));

		votersAddresses[votersCount] = _voterAddress;
		voters[_voterAddress] = Voter(_voterAddress, false);
		votersCount++;

		emit voterAdded(_voterAddress);
	}

	function startVote(uint256 _endTime)
	public onlyOwner isStatus(Status.Created)
	{
		uint256 now = block.timestamp;
		require(_endTime > now);
		elections.status = Status.Voting;
		elections.startTime = now;
		elections.endTime = _endTime;

		//emit voteStarted();
	}

	function endVote()
	public onlyOwner isStatus(Status.Voting)
	{
		elections.status = Status.Ended;
		//finalResult = countResult; //move result from private countResult to public finalResult
		//emit voteEnded(finalResult);
	}

	function vote(uint _candidateId, address _hitCoinAddress)
	public isStatus(Status.Voting)
	{
		// require that they haven't voted before
		require(!voters[msg.sender].isVoted, 'You already voted!');

		// require a valid voter
		require(voters[msg.sender].voterAddress != address(0), 'You have not registered as a voter');

		// require a valid candidate
		require(_candidateId >= 0 && _candidateId < candidatesCount, 'Unknown candidate');

		// record that voter has voted
		voters[msg.sender].isVoted = true;

		// update candidate votes count
		candidates[_candidateId].voteCount++;
		totalVotesCount++;

		// reward the voter
		HitCoin hitCoin = HitCoin(_hitCoinAddress);
		hitCoin.mint(msg.sender, 10);

		// trigger voted event
		emit votedEvent(_candidateId);
	}
}