// artifacts represents the contract abstraction that is specific to truffle
// this will give us an election artifact that represents our smart contract 
// truffle will expose this so that we can interact with it in any case that we want to - through console, tests, etc

var Election = artifacts.require("./Election.sol");

module.exports = function(deployer) {
  deployer.deploy(Election);
};
