import { useEffect, useState } from 'react';
import useElections from '../contexts/ElectionsContext/useElections';

export const useAdmin = () => {
  const {
    state: { contract, accounts }
  } = useElections();

  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!contract) return;

    (async () => {
      try {
        // defaults reset first
        setIsLoading(true);
        setIsAdmin(false);

        const ownerAdmin = await contract.methods.owner().call();
        if (accounts[0] === ownerAdmin) {
          setIsAdmin(true);
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, [contract, accounts]);

  return { isAdmin, isLoading };
};
