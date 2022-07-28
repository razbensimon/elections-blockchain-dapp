var Election = artifacts.require('./Election.sol');

contract('Election', function (accounts) {
  let electionInstance;

  beforeEach(async () => {
    electionInstance = await Election.deployed();
  });

  it('initializes with two candidates', function () {
    return Election.deployed()
      .then(instance => instance.candidatesCount())
      .then(function (count) {
        assert.equal(count, 2);
      });
  });

  it('it initializes the candidates with the correct values', async () => {
    const candidate = await electionInstance.candidates(1);
    assert.equal(candidate[0], 1, 'contains the correct id');
    assert.equal(candidate[1], 'Candidate 1', 'contains the correct name');
    assert.equal(candidate[2], 0, 'contains the correct votes count');

    const candidate2 = await electionInstance.candidates(2);
    assert.equal(candidate2[0], 2, 'contains the correct id');
    assert.equal(candidate2[1], 'Candidate 2', 'contains the correct name');
    assert.equal(candidate2[2], 0, 'contains the correct votes count');
  });

  it('allows a voter to cast a vote', async () => {
    const candidateId = 1;
    const receipt = await electionInstance.vote(candidateId, { from: accounts[0] });
    assert.equal(receipt.logs.length, 1, 'an event was triggered');
    assert.equal(receipt.logs[0].event, 'votedEvent', 'the event type is correct');
    assert.equal(receipt.logs[0].args._candidateId.toNumber(), candidateId, 'the candidate id is correct');

    const voted = await electionInstance.voters(accounts[0]);
    assert(voted, 'the voter was marked as voted');

    const candidate = await electionInstance.candidates(candidateId);
    const voteCount = candidate[2];
    assert.equal(voteCount, 1, "increments the candidate's vote count");
  });

  it('throws an exception for invalid candidates', async () => {
    try {
      //assert.fail
      await electionInstance.vote(99, { from: accounts[1] });
    } catch (error) {
      assert(error.message.toLowerCase().indexOf('revert') >= 0, 'error message must contain revert');
    }

    const candidate1 = await electionInstance.candidates(1);
    const voteCount1 = candidate1[2];
    assert.equal(voteCount1, 1, 'candidate 1 did not receive any votes');

    const candidate2 = await electionInstance.candidates(2);
    const voteCount2 = candidate2[2];
    assert.equal(voteCount2, 0, 'candidate 2 did not receive any votes');
  });

  it('throws an exception for double voting', async () => {
    const candidateId = 2;
    await electionInstance.vote(candidateId, { from: accounts[1] });
    const candidate = await electionInstance.candidates(candidateId);

    const voteCount = candidate[2];
    assert.equal(voteCount, 1, 'accepts first vote');

    try {
      // Try to vote again
      // assert.fail
      await electionInstance.vote(candidateId, { from: accounts[1] });
    } catch (error) {
      assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');
    }

    const candidate1 = await electionInstance.candidates(1);
    const voteCount1 = candidate1[2];
    assert.equal(voteCount1, 1, 'candidate 1 did not receive any votes');

    const candidate2 = await electionInstance.candidates(2);
    const voteCount2 = candidate2[2];
    assert.equal(voteCount2, 1, 'candidate 2 did not receive any votes');
  });
});
