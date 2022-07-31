const RazCoin = artifacts.require('./RazCoin.sol');
const RightToVote = artifacts.require('./RightToVote.sol');
const Election = artifacts.require('./Election.sol');

module.exports = function (deployer) {
  deployer.deploy(RazCoin);
  deployer.deploy(RightToVote);
  deployer.deploy(Election);
};
