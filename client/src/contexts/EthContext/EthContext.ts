import { createContext } from 'react';
import { InitialState } from './state';

const EthContext = createContext<{ state: InitialState; dispatch: Function }>(null!);

export default EthContext;
