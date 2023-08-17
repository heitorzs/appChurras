import './App.css';
import Footer from './components/Footer/index.js';
import Header from './components/Header';
import DisplayTable from './components/Table';

function App() {
  
  return (
    <div className="App">
      <Header />
      <DisplayTable/>
      <Footer />
    </div>
  );
}

export default App;
