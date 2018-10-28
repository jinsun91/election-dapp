pragma solidity ^0.4.2;

contract Election {
    // Store candidate
    // Read candidate
    string public candidate;
    // Constructor - run whenever we deploy our contract to the blockchain so we must make it public
    constructor() public {
        candidate = "Candidate 1";
    }
}