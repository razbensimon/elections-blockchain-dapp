import { useContext } from 'react';
import CoinContext from './CoinContext';

const useCoin = () => useContext(CoinContext);

export default useCoin;
