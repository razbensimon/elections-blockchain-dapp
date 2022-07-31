import { useCallback, useEffect, useState } from 'react';
import { ElectionsCountdown } from './elections-countdown';
import { useElections } from '../../contexts/elections-context';
import { Status, useElectionsStatus } from '../../hooks/use-elections-status';
import { Candidate } from '../../hooks/use-candidates';

type Props = {};

export const ElectionsResults: React.FC<Props> = () => {
  const { state } = useElections();
  const { contract, accounts } = state;

  const [winner, setWinner] = useState<Candidate>();

  const { endTime } = useElectionsStatus();
  const { status } = useElectionsStatus();

  const onComplete = useCallback(async () => {
    if (!contract) return;
    const ownerAdmin = await contract.methods.owner().call();
    if (accounts[0] === ownerAdmin) {
      await contract.methods.endVote().send({ from: accounts[0] });
    }
  }, [contract, accounts]);

  useEffect(() => {
    if (!contract) return;
    if (status !== Status.Ended) return;

    (async () => {
      const winner = await contract.methods.getWinner().call({ from: accounts[0] });
      setWinner(winner);
    })();
  }, [contract, accounts, status]);

  return (
    <div
      style={{
        border: '1px solid #ccc',
        letterSpacing: '.125rem',
        textTransform: 'uppercase',
        color: '#333',
        fontSize: '1.5em',
        backgroundColor: '#ffd54f',
        padding: '1.5em',
        display: 'flex',
        justifyContent: 'center',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif'
      }}>
      {winner ? (
        <div>
          <div>The winner is: {winner.name}</div>
          <div>#Votes: {winner.voteCount}</div>
        </div>
      ) : (
        <ElectionsCountdown endTime={endTime} onComplete={contract ? onComplete : undefined} />
      )}
    </div>
  );
};
