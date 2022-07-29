import { useEffect, useState } from 'react';
import useElections from '../contexts/ElectionsContext/useElections';

export enum Status {
  Created,
  Voting,
  Ended
}

type ElectionsResult = {
  startTime: string;
  endTime: string;
  status: string;
};

type Elections = {
  startTime?: Date;
  endTime?: Date;
  status: Status;
};

function fetchElectionsInfo(contract: any, accounts: string[]): Promise<Elections> {
  return contract.methods
    .elections()
    .call({ from: accounts[0] })
    .then((elections: ElectionsResult) => {
      //console.log('elections', elections);
      const startTimeAsSeconds = parseInt(elections.startTime);
      const endTimeAsSeconds = parseInt(elections.endTime);
      return {
        status: parseInt(elections.status),
        startTime: startTimeAsSeconds ? new Date(startTimeAsSeconds * 1000) : undefined,
        endTime: endTimeAsSeconds ? new Date(endTimeAsSeconds * 1000) : undefined
      } as Elections;
    });
}

export const useElectionsStatus = () => {
  const { state } = useElections();
  const { contract, accounts } = state;

  const [status, setStatus] = useState<Status>();
  const [startTime, setStartTime] = useState<Date>();
  const [endTime, setEndTime] = useState<Date>();

  useEffect(() => {
    if (!contract) return;
    (async () => {
      const result = await fetchElectionsInfo(contract, accounts);
      setStatus(result.status);
      result.startTime && setStartTime(result.startTime);
      result.endTime && setEndTime(result.endTime);
    })();
  }, [contract, accounts]);

  return {
    status,
    statusTranslated: status !== undefined ? Status[status] : null,
    startTime,
    endTime
  };
};
