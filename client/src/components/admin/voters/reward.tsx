import { useEffect, useState } from 'react';
import { useElections } from '../../../contexts/elections-context';
import { Status, useElectionsStatus } from '../../../hooks/use-elections-status';
import { useCoin } from '../../../contexts/coin-context';
import { Divider } from 'antd';

type Props = {};

const Reward: React.FC<Props> = () => {
  const {
    state: { contract: coinContract }
  } = useCoin();

  const { state } = useElections();
  const { contract, accounts } = state;

  const { status } = useElectionsStatus();
  const [reward, setReward] = useState<number>();
  const [importAddress, setImportAddress] = useState<string>();

  useEffect(() => {
    if (!contract || !coinContract) return;
    if (status !== Status.Ended) return;

    console.log('reward contract address:', coinContract._address);
    setImportAddress(coinContract._address);

    (async () => {
      try {
        const reward = await contract.methods.getRewardBalance(coinContract._address).call({ from: accounts[0] });
        setReward(reward);
        console.log('reward', reward);
      } catch (error: any) {
        console.log('getRewardBalance failed to retrieve, probably you didnt vote');
      }
    })();
  }, [coinContract, contract, accounts, status]);

  if (!reward) {
    return null;
  }

  return (
    <>
      <div style={{ paddingTop: '1em' }}>
        You got rewarded with <span style={{ color: 'purple', fontWeight: 'bold' }}>{reward / 10 ** 18}</span> ERC20
        Tokens!
      </div>
      <div>
        Import in metamask: <code style={{ display: 'inline-block' }}>{importAddress}</code>
      </div>
      <Divider />
    </>
  );
};

export default Reward;
