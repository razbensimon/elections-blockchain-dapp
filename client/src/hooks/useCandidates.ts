import { useEffect, useState } from 'react';
import useElections from '../contexts/ElectionsContext/useElections';

export type Candidate = {
  id: number;
  name: string;
  voteCount: number;
};

export const useCandidates = () => {
  const {
    state: { contract }
  } = useElections();

  const [candidates, setCandidates] = useState<Candidate[]>();

  useEffect(() => {
    if (!contract) return;

    (async () => {
      const candidates = (await contract.methods.getCandidates().call()).map(
        ({ id, name, voteCount }: Candidate) =>
          ({
            key: id,
            id,
            name,
            voteCount
          } as Candidate)
      );
      setCandidates(candidates);
    })();
  }, [contract]);

  return candidates ?? [];
};
