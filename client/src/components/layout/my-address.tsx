import { useEffect, useState } from 'react';
import useElections from '../../contexts/elections-context/use-elections';

const MyAddress: React.FC = () => {
  const {
    state: { accounts }
  } = useElections();

  const [account, setAccount] = useState<string>();

  useEffect(() => {
    accounts && setAccount(accounts[0]);
  }, [accounts]);

  return account ? <span>Hello, {account}</span> : null;
};

export default MyAddress;
