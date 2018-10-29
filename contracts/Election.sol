pragma solidity ^0.4.2;

contract Election {
    // Model a Candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    // Store Candidates
    mapping(uint => Candidate) public candidates;

    // Store accounts that have voted
    mapping(address => bool) public voters;

    // Fetch Candidates
    // Store Candidates Count
    uint public candidatesCount;

    // Constructor - run whenever we deploy our contract to the blockchain so we must make it public
    constructor() public {
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
    }

    // Make this function private because we don't want anyone to be able to call this function from outside the smart contract
    // We want our smart contract to be in control of this
    function addCandidate(string _name) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote(uint _candidateId) public {
        // require that they haven't voted before
        require(!voters[msg.sender]);

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount);

        // record that voter has voted
        // msg.sender is metadata sent through the vote function that refers to the account sending this function
        voters[msg.sender] = true;

        // update candidate vote count
        candidates[_candidateId].voteCount++;
    }
}