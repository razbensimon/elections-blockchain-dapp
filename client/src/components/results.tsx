import { useCallback } from 'react';
import { ElectionsCountdown } from './elections-countdown';
import { useElections } from '../contexts/ElectionsContext';
import { useElectionsStatus } from '../hooks/useElectionsStatus';

type Props = {};

export const ElectionsResults: React.FC<Props> = () => {
  const { state } = useElections();
  const { contract, accounts } = state;

  const { endTime } = useElectionsStatus();

  const onComplete = useCallback(async () => {
    const ownerAdmin = await contract.methods.owner().call();
    if (accounts[0] === ownerAdmin) {
      await contract.methods.endVote().send({ from: accounts[0] });
    }
  }, [contract, accounts]);

  return <ElectionsCountdown endTime={endTime} onComplete={contract ? onComplete : undefined} />;
};
