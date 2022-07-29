import useEth from '../../contexts/EthContext/useEth';
import { useEffect, useState } from 'react';

type Props = {};

type Candidate = {
  id: number;
  name: string;
  voteCount: number;
};

const ContractInfoSection: React.FC<Props> = ({}) => {
  const { state } = useEth();
  const { contract, accounts } = state;

  const [account, setAccount] = useState<string>();
  const [contractOwner, setCandidatesCount] = useState<string>();
  const [candidates, setCandidates] = useState<Candidate[]>();

  useEffect(() => {
    (window as any).state = state;
    (async () => {
      setAccount(accounts[0]);
      setCandidatesCount(await contract.methods.owner().call());
      setCandidates(
        (await contract.methods.getCandidates().call()).map(
          ([id, name, voteCount]: [number, string, number]) =>
            ({
              id,
              name,
              voteCount
            } as Candidate)
        )
      );
    })();
  }, [contract, accounts]);

  return (
    <div style={{ maxWidth: '500px', marginBottom: '2em' }}>
      <strong>Info:</strong>
      <div>Your Account: {account}</div>
      <div>Contract Owner: {contractOwner}</div>
      <div className="code">Candidates: {JSON.stringify(candidates, null, 2)}</div>
    </div>
  );
};

export default ContractInfoSection;
