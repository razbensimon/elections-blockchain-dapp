import { EthProvider } from './contexts/EthContext';
import { Layout } from './components/layout/layout';
import styles from './App.module.scss';
import AdminPage from './components/routes/admin-page';
import VoterPage from './components/routes/voter-page';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  const contract = 'Election';
  return (
    <EthProvider contractName={contract}>
      <div className={styles.app}>
        <BrowserRouter>
          <Layout contract={contract}>
            <Routes>
              <Route path="voter" element={<VoterPage />} />
              <Route path="admin" element={<AdminPage />} />
              <Route path="*" element={<Navigate to="/voter" />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </div>
    </EthProvider>
  );
}

export default App;
