import { createContext } from 'react';
import { NetworkState } from '../common/state';

const CoinContext = createContext<{ state: NetworkState; dispatch: Function }>(null!);

export default CoinContext;
