import useEth from '../../contexts/EthContext/useEth';
import { useEffect, useState } from 'react';

type Props = {};

const ContractInfoSection: React.FC<Props> = ({}) => {
  const { state } = useEth();
  const { contract, accounts } = state;

  const [account, setAccount] = useState<string>();
  const [contractOwner, setCandidatesCount] = useState<string>();

  useEffect(() => {
    (window as any).state = state;
    (async () => {
      setAccount(accounts[0]);
      setCandidatesCount(await contract.methods.owner().call());
    })();
  }, [contract, accounts]);

  return (
    <div style={{ maxWidth: '500px', marginBottom: '2em' }}>
      <strong>Info:</strong>
      <div>Your Account: {account}</div>
      <div>Contract Owner: {contractOwner}</div>
    </div>
  );
};

export default ContractInfoSection;
