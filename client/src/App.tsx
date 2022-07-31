import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/layout';
import { CoinContext } from './contexts/coin-context';
import { ElectionsContext } from './contexts/elections-context';
import { RightToVoteContext } from './contexts/right-to-vote-context';
import AdminPage from './components/routes/admin-page';
import VoterPage from './components/routes/voter-page';
import ContractProvider from './contexts/common/contract-provider';
import styles from './App.module.scss';
import { useAdmin } from './hooks/use-admin';

function AppRoutes() {
  const { isAdmin, isLoading } = useAdmin();
  return (
    <Routes>
      <Route path="voter" element={<VoterPage />} />
      {isAdmin ? <Route path="admin" element={<AdminPage />} /> : null}
      {!isLoading && <Route path="*" element={<Navigate to={`/${isAdmin ? 'admin' : 'voter'}`} />} />}
    </Routes>
  );
}

function App() {
  const mainContract = 'Election';
  return (
    <ContractProvider Context={CoinContext} contractName={'RazCoin'}>
      <ContractProvider Context={RightToVoteContext} contractName={'RightToVote'}>
        <ContractProvider Context={ElectionsContext} contractName={mainContract}>
          <div className={styles.app}>
            <BrowserRouter>
              <Layout contractName={mainContract}>
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
