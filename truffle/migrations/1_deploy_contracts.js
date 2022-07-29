const HitCoin = artifacts.require('./HitCoin.sol');
const VotingToken = artifacts.require('./VotingToken.sol');
const Election = artifacts.require('./Election.sol');

module.exports = function (deployer) {
  deployer.deploy(HitCoin);
  deployer.deploy(VotingToken);
  deployer.deploy(Election);
};
