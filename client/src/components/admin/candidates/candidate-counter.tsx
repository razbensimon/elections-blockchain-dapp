import useEth from '../../../contexts/EthContext/useEth';
import { useEffect, useState } from 'react';

type Props = {};

const CandidateCounter: React.FC<Props> = () => {
  const { state } = useEth();
  const { contract, accounts } = state;
  const [candidatesCount, setCandidatesCount] = useState<number>();

  useEffect(() => {
    contract.methods.candidatesCount().call({ from: accounts[0] }).then(setCandidatesCount);
  }, [contract, accounts]);

  return <div style={{ padding: '1em 0' }}>Candidates Count: {candidatesCount}</div>;
};

export default CandidateCounter;
