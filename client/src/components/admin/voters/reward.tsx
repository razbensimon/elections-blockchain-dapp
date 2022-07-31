import { useEffect, useState } from 'react';
import { useElections } from '../../../contexts/ElectionsContext';
import { Status, useElectionsStatus } from '../../../hooks/useElectionsStatus';
import { useCoin } from '../../../contexts/CoinContext';
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

  useEffect(() => {
    if (!contract || !coinContract) return;
    if (status !== Status.Ended) return;

    (async () => {
      try {
        const reward = await contract.methods.getRewardBalance(coinContract._address).call({ from: accounts[0] });
        setReward(reward);
      } catch (error: any) {
        console.log('getRewardBalance failed to retrieve, probably you didnt vote');
      }
    })();
  }, [coinContract, contract, accounts, status]);

  return (
    <>
      {reward !== undefined ? (
        <>
          <div style={{ paddingTop: '1em' }}>
            You got rewarded with <span style={{ color: 'purple', fontWeight: 'bold' }}>{reward / 10 ** 18}</span> ERC20
            Tokens!
          </div>
          <Divider />
        </>
      ) : null}
    </>
  );
};

export default Reward;
