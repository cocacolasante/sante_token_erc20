
import './App.css';

function App() {
  return (
    <div className="App">
      <div className='wallet-button-container'>
        <button>Connect Wallet</button>
      </div>
      <div>
        <h1>Mint The Sante Token</h1>
        <div>
          <div>
            <input placeholder='amount to mint' />
            <button>Mint Now</button>
          </div>
        </div>
      </div>
      <footer>Created By Crypted Sante</footer>
    </div>
  );
}

export default App;
