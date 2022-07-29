import useEth from '../../contexts/EthContext/useEth';
import { useEffect, useState } from 'react';

type Props = {};

const CandidateVotes: React.FC<Props> = ({}) => {
  const { state } = useEth();
  const { contract, accounts } = state;
  const [candidatesCount, setCandidatesCount] = useState<number>();

  useEffect(() => {
    contract.methods.candidatesCount().call({ from: accounts[0] }).then(setCandidatesCount);
  }, []);

  return <div style={{ maxWidth: '500px' }}>Candidates Count: {candidatesCount}</div>;
};

export default CandidateVotes;
