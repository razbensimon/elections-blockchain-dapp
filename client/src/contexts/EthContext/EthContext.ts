import { createContext } from 'react';
import { NetworkState } from './state';

const EthContext = createContext<{ state: NetworkState; dispatch: Function }>(null!);

export default EthContext;
