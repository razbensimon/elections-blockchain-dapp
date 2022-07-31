const RazCoin = artifacts.require('./RazCoin.sol');
const VotingToken = artifacts.require('./VotingToken.sol');
const Election = artifacts.require('./Election.sol');

module.exports = function (deployer) {
  deployer.deploy(RazCoin);
  deployer.deploy(VotingToken);
  deployer.deploy(Election);
};
