import './App.css';
import { EthProvider } from './contexts/EthContext';
import Demo from './components/Demo';
import Footer from './components/Footer';
import { Layout } from './components/layout/layout';

function App() {
  return (
    <EthProvider contractName="SimpleStorage">
      <div id="App">
        <div className="container">
          <Layout />
          <Demo />
          <hr />
          <Footer />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
