// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import '@openzeppelin/contracts/access/Ownable.sol';
import './RazCoin.sol';
import './RightToVote.sol';

contract Election is Ownable {
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
        string politicalSide;
        string religiousParty;
        string expertise;
    }

    struct Voter {
        address voterAddress;
        bool isVoted;
    }

    enum Status {
        Created,
        Voting,
        Ended
    }

    struct Elections {
        uint256 startTime;
        uint256 endTime;
        Status status;
    }

    // VARIABLES
    Elections public elections;
    mapping(uint256 => address) public votersAddresses;
    mapping(address => Voter) public voters; // Store accounts that have voted
    uint256 public votersCount = 0;
    uint256 public totalVotesCount = 0;
    mapping(uint256 => Candidate) public candidates; // Store candidates and their votes count
    uint256 public candidatesCount = 0;
    RightToVote public rightToVote;

    // EVENTS
    event candidateAddedEvent(uint256 indexed _candidateId);
    event votedEvent(uint256 indexed _candidateId);
    event voterAddedEvent(address voter);
    event electionsStartedEvent(uint256 _startTime, uint256 _endTime);
    event electionsEndedEvent();

    // MODIFIERS
    modifier isStatus(Status _status) {
        require(elections.status == _status, "Can't perform in this phase of elections");
        _;
    }

    // CONSTRUCTOR
    constructor() {
        elections = Elections(0, 0, Status.Created);
        rightToVote = new RightToVote();

        addVoter(msg.sender);
    }

    // FUNCTIONS
    function addCandidate(
        string memory _name,
        string memory _politicalSide,
        string memory _religiousParty,
        string memory _expertise
    ) public onlyOwner isStatus(Status.Created) {
        require(bytes(_name).length != 0);
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0, _politicalSide, _religiousParty, _expertise);

        emit candidateAddedEvent(candidatesCount);
        candidatesCount++;
    }

    function getCandidates() public view onlyOwner returns (Candidate[] memory) {
        Candidate[] memory arr = new Candidate[](candidatesCount);
        for (uint256 i = 0; i < candidatesCount; i++) {
            Candidate storage candidate = candidates[i];
            arr[i] = candidate;
        }
        return arr;
    }

    function getVoters() public view onlyOwner returns (Voter[] memory) {
        Voter[] memory arr = new Voter[](votersCount);
        for (uint256 i = 0; i < votersCount; i++) {
            address voterAddress = votersAddresses[i];
            Voter storage voter = voters[voterAddress];
            arr[i] = voter;
        }
        return arr;
    }

    function addVoter(address _voterAddress) public onlyOwner isStatus(Status.Created) {
        // Do not allow address 0x0
        require(_voterAddress != address(0));

        // Do not allow re-add of an existing voter
        require(voters[_voterAddress].voterAddress == address(0));

        votersAddresses[votersCount] = _voterAddress;
        voters[_voterAddress] = Voter(_voterAddress, false);
        votersCount++;

        rightToVote.giveRightToVote(_voterAddress);

        emit voterAddedEvent(_voterAddress);
    }

    function startVote(uint256 _endTime) public onlyOwner isStatus(Status.Created) {
        uint256 nowInSeconds = block.timestamp;
        require(_endTime > nowInSeconds);
        elections.status = Status.Voting;
        elections.startTime = nowInSeconds;
        elections.endTime = _endTime;

        emit electionsStartedEvent(elections.startTime, elections.endTime);
    }

    function endVote() public onlyOwner isStatus(Status.Voting) {
        elections.status = Status.Ended;
        emit electionsEndedEvent();
    }

    function vote(uint256 _candidateId, address _coinContractAddress) public isStatus(Status.Voting) {
        // require a valid voter
        require(msg.sender != address(0), 'voter address 0x0');
        require(voters[msg.sender].voterAddress != address(0), 'no a valid voter');

        // require NFT token represents right to vote
        require(rightToVote.hasVotingRight(msg.sender));

        // require that they haven't voted before
        require(!voters[msg.sender].isVoted, 'You already voted!');

        // require a valid candidate to vote for
        require(_candidateId >= 0 && _candidateId < candidatesCount, 'Unknown candidate');

        // record that voter has voted
        voters[msg.sender].isVoted = true;

        // update candidate votes count
        candidates[_candidateId].voteCount++;
        totalVotesCount++;

        // reward the voter
        RazCoin coinContract = RazCoin(_coinContractAddress);
        coinContract.mint(msg.sender, 10);

        // trigger voted event
        emit votedEvent(_candidateId);
    }

    function hasVotingRight() public view returns (bool) {
        require(msg.sender != address(0), 'voter address 0x0');

        return rightToVote.hasVotingRight(msg.sender);
    }

    function getRewardBalance(address _coinContractAddress) public view isStatus(Status.Ended) returns (uint256) {
        require(msg.sender != address(0), 'voter address 0x0');

        // require voting
        require(voters[msg.sender].isVoted, 'You didnt vote!');

        RazCoin coinContract = RazCoin(_coinContractAddress);
        return coinContract.balanceOf(msg.sender);
    }

    function getWinner() public view isStatus(Status.Ended) returns (Candidate memory) {
        require(msg.sender != address(0), 'voter address 0x0');

        Candidate memory winner;
        winner = candidates[0];

        for (uint256 i = 1; i < candidatesCount; i++) {
            if (candidates[i].voteCount > winner.voteCount) {
                winner = candidates[i];
            }
        }
        return winner;
    }
}
