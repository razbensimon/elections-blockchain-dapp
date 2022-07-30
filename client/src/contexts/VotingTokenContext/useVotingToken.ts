import { useContext } from 'react';
import VotingTokenContext from './VotingTokenContext';

const useVotingToken = () => useContext(VotingTokenContext);

export default useVotingToken;
