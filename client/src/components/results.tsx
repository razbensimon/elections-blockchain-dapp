//import { useState } from 'react';
import { ElectionsCountdown } from './elections-countdown';
//import { useElections } from '../contexts/ElectionsContext';
import { useElectionsStatus } from '../hooks/useElectionsStatus';

type Props = {};

export const ElectionsResults: React.FC<Props> = () => {
  //const [endTime] = useState<Date>(() => new Date(new Date().getTime() + 1000 * 5));

  //const { state } = useElections();
  //const { contract, accounts } = state;

  const { endTime } = useElectionsStatus();
  console.log('endTime Res', endTime);
  return (
    <div style={{ border: '1px solid #f96400', padding: '1em' }}>
      {endTime ? <ElectionsCountdown endTime={endTime} /> : '00:00:00'}
    </div>
  );
};
