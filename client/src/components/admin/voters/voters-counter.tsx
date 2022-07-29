import useElections from '../../../contexts/ElectionsContext/useElections';
import { useEffect, useState } from 'react';

type Props = {};

const CandidateCounter: React.FC<Props> = () => {
  const { state } = useElections();
  const { contract, accounts } = state;
  const [totalVotesCount, setTotalVotesCount] = useState<number>();
  const [votersCount, setVotersCount] = useState<number>();

  useEffect(() => {
    contract.methods.totalVotesCount().call({ from: accounts[0] }).then(setTotalVotesCount);
    contract.methods.votersCount().call({ from: accounts[0] }).then(setVotersCount);
  }, [contract, accounts]);

  return (
    <div style={{ padding: '1em 0' }}>
      <div>Total Voters: {votersCount}</div>
      <div>Total Votes: {totalVotesCount}</div>
    </div>
  );
};

export default CandidateCounter;
