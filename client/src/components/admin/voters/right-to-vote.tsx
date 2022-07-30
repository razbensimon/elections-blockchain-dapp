import { useEffect, useState } from 'react';
import { useElections } from '../../../contexts/ElectionsContext';

type Props = {};

const RightToVote: React.FC<Props> = () => {
  const { state } = useElections();
  const { contract, accounts } = state;

  const [rightToVote, setRightToVote] = useState<boolean>();

  useEffect(() => {
    if (!contract) return;
    (async () => {
      const hasRight = await contract.methods.hasVotingRight().call({ from: accounts[0] });
      console.log(hasRight, contract.methods);
      setRightToVote(hasRight);
    })();
  }, [contract, accounts]);

  return rightToVote ? (
    <div style={{ color: 'green' }}>You have the right to vote in those elections!</div>
  ) : (
    <div style={{ color: 'red' }}>You do NOT have the right to vote on those elections!</div>
  );
};

export default RightToVote;
