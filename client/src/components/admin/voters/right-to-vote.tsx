import { useEffect, useState } from 'react';
//import { useElections } from '../../../contexts/ElectionsContext';
import { useVotingToken } from '../../../contexts/VotingTokenContext';

type Props = {};

const RightToVote: React.FC<Props> = () => {
  const fuck = useVotingToken();
  const { contract, accounts } = fuck?.state || {};

  const [rightToVote, setRightToVote] = useState<boolean>();

  useEffect(() => {
    if (!contract) return;
    (async () => {
      const hasRight = await contract.methods.hasVotingRight(accounts[0]).call({ from: accounts[0] });
      console.log(hasRight, contract.methods);
      setRightToVote(hasRight);
    })();
  }, [contract, accounts]);

  return fuck ? (
    rightToVote ? (
      <div>You have the right to vote on those elections! - NFT token: {rightToVote}</div>
    ) : (
      <div>You do NOT have the right to vote on those elections!</div>
    )
  ) : (
    <div>Loading right...</div>
  );
};

export default RightToVote;
