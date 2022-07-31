import { useContext } from 'react';
import RightToVoteContext from './RightToVoteContext';

const useRightToVote = () => useContext(RightToVoteContext);

export default useRightToVote;
