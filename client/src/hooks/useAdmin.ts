import { useEffect, useState } from 'react';
import useElections from '../contexts/ElectionsContext/useElections';

export const useAdmin = () => {
  const {
    state: { contract, accounts }
  } = useElections();

  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    if (!contract) return;

    (async () => {
      const ownerAdmin = await contract.methods.owner().call();
      if (accounts[0] === ownerAdmin) {
        setIsAdmin(true);
      }
    })();
  }, [contract, accounts]);

  return { isAdmin };
};
