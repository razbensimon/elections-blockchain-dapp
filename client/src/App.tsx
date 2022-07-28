import { EthProvider } from './contexts/EthContext';
import { Layout } from './components/layout/layout';
import styles from './App.module.scss';

function App() {
  return (
    <EthProvider contractName="SimpleStorage">
      <div className={styles.app}>
        <div className="container">
          <Layout />
          {/*<Demo />*/}
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
