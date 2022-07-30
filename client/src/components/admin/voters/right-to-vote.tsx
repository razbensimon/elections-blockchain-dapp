import { useEffect, useState } from 'react';
//import { useElections } from '../../../contexts/ElectionsContext';
import { useVotingToken } from '../../../contexts/VotingTokenContext';

type Props = {};

const RightToVote: React.FC<Props> = () => {
  const { state } = useVotingToken();
  const { contract, accounts } = state;

  const [rightToVote, setRightToVote] = useState<boolean>();

  useEffect(() => {
    if (!contract) return;
    (async () => {
      const hasRight = await contract.methods.hasVotingRight(accounts[0]).call({ from: accounts[0] });
      console.log(hasRight, contract.methods);
      setRightToVote(hasRight);
    })();
  }, [contract, accounts]);

  return rightToVote ? (
    <div>You have the right to vote on those elections! - NFT token: {rightToVote}</div>
  ) : (
    <div style={{ color: 'red' }}>You do NOT have the right to vote on those elections!</div>
  );
};

export default RightToVote;
