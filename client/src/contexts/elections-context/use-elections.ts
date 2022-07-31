import { useContext } from 'react';
import ElectionsContext from './elections-context';

const useElections = () => useContext(ElectionsContext);

export default useElections;
