import Web3 from 'web3';

const actions = {
  init: 'INIT'
};

export type NetworkState = {
  artifact: any;
  web3: Web3;
  accounts: string[];
  networkID: number;
  contract: any;
};

export type ContractContext = React.Context<{ state: NetworkState; dispatch: Function }>;

const initialState: NetworkState = {} as NetworkState;

const reducer: React.Reducer<NetworkState, { type: string; data: NetworkState }> = (state, action) => {
  const { type, data } = action;
  switch (type) {
    case actions.init:
      return { ...state, ...data };
    default:
      throw new Error('Undefined reducer action type');
  }
};

export { actions, initialState, reducer };
