import { useContext } from 'react';
import RightToVoteContext from './right-to-vote-context';

const useRightToVote = () => useContext(RightToVoteContext);

export default useRightToVote;
