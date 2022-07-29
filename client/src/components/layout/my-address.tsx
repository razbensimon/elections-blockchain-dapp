import { useEffect, useState } from 'react';
import useEth from '../../contexts/EthContext/useEth';

const MyAddress: React.FC = () => {
  const {
    state: { accounts }
  } = useEth();

  const [account, setAccount] = useState<string>();

  useEffect(() => {
    accounts && setAccount(accounts[0]);
  }, [accounts]);

  return account ? <span>Hello, {account}</span> : null;
};

export default MyAddress;
