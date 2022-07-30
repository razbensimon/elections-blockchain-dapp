import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/layout';
import { CoinContext } from './contexts/CoinContext';
import { ElectionsContext } from './contexts/ElectionsContext';
import { VotingTokenContext } from './contexts/VotingTokenContext';
import AdminPage from './components/routes/admin-page';
import VoterPage from './components/routes/voter-page';
import ContractProvider from './contexts/common/ContractProvider';
import styles from './App.module.scss';
import { useAdmin } from './hooks/useAdmin';

function AppRoutes() {
  const { isAdmin } = useAdmin();
  return (
    <Routes>
      <Route path="voter" element={<VoterPage />} />
      {isAdmin ? <Route path="admin" element={<AdminPage />} /> : null}
      <Route path="*" element={<Navigate to="/voter" />} />
    </Routes>
  );
}

function App() {
  const mainContract = 'Election';
  return (
    <ContractProvider Context={CoinContext} contractName={'HitCoin'}>
      <ContractProvider Context={VotingTokenContext} contractName={'VotingToken'}>
        <ContractProvider Context={ElectionsContext} contractName={mainContract}>
          <div className={styles.app}>
            <BrowserRouter>
              <Layout contract={mainContract}>
                <AppRoutes />
              </Layout>
            </BrowserRouter>
          </div>
        </ContractProvider>
      </ContractProvider>
    </ContractProvider>
  );
}

export default App;
