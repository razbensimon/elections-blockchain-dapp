import useEth from '../../contexts/EthContext/useEth';
import { useEffect, useState } from 'react';

type Props = {};

const ContractInfoSection: React.FC<Props> = () => {
  const { state } = useEth();
  const { contract } = state;

  const [contractOwner, setContractOwner] = useState<string>();

  useEffect(() => {
    (window as any).state = state;
    (async () => {
      setContractOwner(await contract.methods.owner().call());
    })();
  }, [state, contract]);

  return <div>Contract Owner: {contractOwner}</div>;
};

export default ContractInfoSection;
