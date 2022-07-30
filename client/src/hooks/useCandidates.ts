import { useEffect, useState } from 'react';
import useElections from '../contexts/ElectionsContext/useElections';

export type Candidate = {
  id: number;
  name: string;
  voteCount: number;

  politicalSide?: string;
  religiousParty?: string;
  expertise?: string;
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
        ({ id, name, voteCount, expertise, religiousParty, politicalSide }: Candidate) =>
          ({
            key: id,
            id,
            name,
            voteCount,
            expertise,
            religiousParty,
            politicalSide
          } as Candidate)
      );
      setCandidates(candidates);
    })();
  }, [contract]);

  return candidates ?? [];
};
