import { EthProvider } from './contexts/EthContext';
import { Layout } from './components/layout/layout';
import styles from './App.module.scss';
import CandidateVotes from './components/admin/candidate-votes';
import AddCandidateForm from './components/admin/add-candidate-form';
import ContractInfoSection from './components/admin/contract-info-section';

function App() {
  const contract = 'Election';
  return (
    <EthProvider contractName={contract}>
      <div className={styles.app}>
        <Layout contract={contract}>
          <ContractInfoSection />
          <CandidateVotes />
          <AddCandidateForm />
        </Layout>
        {/*<Demo />*/}
      </div>
    </EthProvider>
  );
}

export default App;
