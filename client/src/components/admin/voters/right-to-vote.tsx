import { useEffect, useState } from 'react';
import { useElections } from '../../../contexts/elections-context';
import { Status, useElectionsStatus } from '../../../hooks/use-elections-status';

type Props = {};

const RightToVote: React.FC<Props> = () => {
  const { state } = useElections();
  const { contract, accounts } = state;

  const { status } = useElectionsStatus();
  const [rightToVote, setRightToVote] = useState<boolean>();

  useEffect(() => {
    if (!contract) return;
    (async () => {
      const hasRight = await contract.methods.hasVotingRight().call({ from: accounts[0] });
      setRightToVote(hasRight);
    })();
  }, [contract, accounts]);

  return (
    <div>
      {rightToVote ? (
        <div style={{ color: 'green' }}>You have the right to vote in those elections!</div>
      ) : (
        <div style={{ color: 'red' }}>You do NOT have the right to vote on those elections!</div>
      )}

      <div style={{ paddingTop: '1em' }}>
        Are the elections open for voting? - {status === Status.Voting ? 'Yes' : 'No'}
      </div>
    </div>
  );
};

export default RightToVote;
