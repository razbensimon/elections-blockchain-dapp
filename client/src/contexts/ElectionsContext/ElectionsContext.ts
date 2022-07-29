import { createContext } from 'react';
import { NetworkState } from '../common/state';

const ElectionsContext = createContext<{ state: NetworkState; dispatch: Function }>(null!);

export default ElectionsContext;
