// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Election is Ownable {
	struct Candidate {
		uint id;
		string name;
		uint voteCount;
	}

	struct Voter {
		address voterAddress;
		bool voted;
	}

	enum State {Created, Voting, Ended}

	// VARIABLES
	State public state;
	mapping(address => Voter) public voters; // Store accounts that have voted
	uint public votersCount = 0;
	uint public totalVotesCount = 0;
	mapping(uint => Candidate) public candidates; // Store candidates and their votes count
	uint public candidatesCount = 0;

	// EVENTS
	event votedEvent(uint indexed _candidateId);
	event voterAdded(address voter);

	// MODIFIERS
	modifier isState(State _state){
		require(state == _state, "Can't perform in this phase of elections");
		_;
	}

	// CONSTRUCTOR
	constructor() {
		state = State.Created;
	}

	// FUNCTIONS
	function addCandidate(string memory _name)
	public onlyOwner isState(State.Created)
	{
		require(bytes(_name).length != 0);
		candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
		candidatesCount++;
	}

	function addVoter(address _voterAddress)
	public onlyOwner isState(State.Created)
	{
		// Do not allow address 0x0
		require(_voterAddress != address(0));
		// Do not allow re-add of an existing voter
		require(voters[_voterAddress].voterAddress == address(0));

		voters[_voterAddress] = Voter(_voterAddress, false);
		votersCount++;
		emit voterAdded(_voterAddress);
	}

	function startVote()
	public onlyOwner isState(State.Created)
	{
		state = State.Voting;
		//emit voteStarted();
	}

	function endVote()
	public onlyOwner isState(State.Voting)
	{
		state = State.Ended;
		//finalResult = countResult; //move result from private countResult to public finalResult
		//emit voteEnded(finalResult);
	}

	function vote(uint _candidateId)
	public isState(State.Voting)
	{
		// require that they haven't voted before
		require(!voters[msg.sender].voted, 'You already voted!');

		// require a valid voter
		require(voters[msg.sender].voterAddress != address(0), 'You have not registered as a voter');

		// require a valid candidate
		require(_candidateId >= 0 && _candidateId < candidatesCount, 'Unknown candidate');

		// record that voter has voted
		voters[msg.sender].voted = true;

		// update candidate vote Count
		candidates[_candidateId].voteCount++;
		totalVotesCount++;

		// trigger voted event
		emit votedEvent(_candidateId);
	}
}