import { createContext } from 'react';
import { NetworkState } from '../common/state';

const RightToVoteContext = createContext<{ state: NetworkState; dispatch: Function }>(null!);

export default RightToVoteContext;
