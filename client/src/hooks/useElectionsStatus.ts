import { useEffect, useState } from 'react';
import useElections from '../contexts/ElectionsContext/useElections';

export enum Status {
  Created,
  Voting,
  Ended
}

export const useElectionsStatus = () => {
  const { state } = useElections();
  const { contract, accounts } = state;

  const [status, setStatus] = useState<Status>();

  useEffect(() => {
    contract &&
      contract.methods
        .status()
        .call({ from: accounts[0] })
        .then((status: string) => {
          setStatus(parseInt(status));
        });
  }, [contract]);

  return { status, statusTranslated: status !== undefined ? Status[status] : null };
};
