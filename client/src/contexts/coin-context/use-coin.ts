import { useContext } from 'react';
import CoinContext from './coin-context';

const useCoin = () => useContext(CoinContext);

export default useCoin;
