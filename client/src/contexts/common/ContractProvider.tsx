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
        try {
          address = artifact.networks[networkID].address;
          contract = new web3.eth.Contract(abi, address);
          console.log(contractName, address);
        } catch (err) {
          console.error(err);
        }
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
      try {
        const response = await fetch(`${apiBaseUrl}/${contractName}.json`);
        const artifact = await response.json();
        await init(artifact);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init, contractName]);

  useEffect(() => {
    const events = ['chainChanged', 'accountsChanged'];
    const handleChange = () => {
      init(state.artifact);
    };

    events.forEach(e => window.ethereum!.on(e, handleChange));
    return () => {
      events.forEach(e => window.ethereum!.removeListener(e, handleChange));
    };
  }, [init, state.artifact]);

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
