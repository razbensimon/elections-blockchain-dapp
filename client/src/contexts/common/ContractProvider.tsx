import React, { useReducer, useCallback, useEffect } from 'react';
import Web3 from 'web3';
import { reducer, actions, initialState, ContractContext } from './state';
import { apiBaseUrl } from '../../config';

type Props = {
  Context: ContractContext;
  contractName: string;
  children: React.ReactNode;
};

const ContractProvider: React.FC<Props> = ({ Context, contractName, children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const init = useCallback(
    async (artifact: any) => {
      if (artifact) {
        const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');
        const accounts = await web3.eth.requestAccounts();
        const networkID = await web3.eth.net.getId();
        const { abi } = artifact;
        let address, contract;

        address = artifact.networks[networkID].address;
        contract = new web3.eth.Contract(abi, address);
        console.log(contractName, address);

        dispatch({
          type: actions.init,
          data: { artifact, web3, accounts, networkID, contract }
        });
      }
    },
    [contractName]
  );

  useEffect(() => {
    const tryInit = async () => {
      let artifact;
      try {
        const response = await fetch(`${apiBaseUrl}/${contractName}.json`);
        artifact = await response.json();
      } catch (err) {
        console.error('Error on fetch contract', err);
      }

      try {
        await init(artifact);
      } catch (err) {
        console.error('Error init contract', err);
      }
    };

    tryInit().catch(console.error);
  }, [init, contractName]);

  useEffect(() => {
    const events = ['chainChanged', 'accountsChanged'];
    const handleChange = async () => {
      await init(state.artifact);
    };

    events.forEach(eventName =>
      window.ethereum!.on(eventName, async () => {
        console.debug(contractName, 'raised event: ', eventName);
        await handleChange;
      })
    );
    return () => {
      events.forEach(e => window.ethereum!.removeListener(e, handleChange));
    };
  }, [init, state.artifact, contractName]);

  return (
    <Context.Provider
      value={{
        state,
        dispatch
      }}>
      {state ? children : 'Loading...'}
    </Context.Provider>
  );
};

export default ContractProvider;
