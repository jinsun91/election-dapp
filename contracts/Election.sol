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
}