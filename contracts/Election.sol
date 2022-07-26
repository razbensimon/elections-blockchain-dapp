// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Election is Ownable {
    // Model a Candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    enum State {Created, Voting, Ended}

    // VARIABLES
    address public admin;
    State public state;

    // Store accounts that have voted
    mapping(address => bool) public voters;

    // Store candidates and their votes count
    mapping(uint => Candidate) public candidates;
    uint public candidatesCount;

    // EVENTS
    event votedEvent(uint indexed _candidateId);

    // MODIFIERS
    modifier inState(State _state){
        require(state == _state, "Can't perform in this phase of elections");
        _;
    }

    // CONSTRUCTOR
    constructor() {
        state = State.Created;
    }

    // FUNCTIONS
    function addCandidate(string memory _name) public onlyOwner() isState(State.Created) {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote(uint _candidateId) public {
        // require that they haven't voted before
        require(!voters[msg.sender]);

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount);

        // record that voter has voted
        voters[msg.sender] = true;

        // update candidate vote Count
        candidates[_candidateId].voteCount ++;

        // trigger voted event
        emit votedEvent(_candidateId);
    }
}