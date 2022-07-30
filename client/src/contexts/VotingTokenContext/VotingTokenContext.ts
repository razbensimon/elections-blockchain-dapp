import { createContext } from 'react';
import { NetworkState } from '../common/state';

const VotingTokenContext = createContext<{ state: NetworkState; dispatch: Function }>(null!);

export default VotingTokenContext;
