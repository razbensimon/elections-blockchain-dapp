import { useContext } from 'react';
import ElectionsContext from './ElectionsContext';

const useElections = () => useContext(ElectionsContext);

export default useElections;
