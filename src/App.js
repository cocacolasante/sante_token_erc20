import './App.css';


function App() {
  return (
    <div className="App">
      <div className='wallet-button-container'>
        <button className='connect-btn'>Connect Wallet</button>
      </div>
      <div className='minting-container-main'>
        <h1>Mint The Sante Token</h1>
        <img alt="main page logo" src="null" />
        <div className='minting-container-inputs'>
          <div >
            <p>Current Tokens Minted: 0</p>
            <p>Max Supply: 1000000</p>
            <input placeholder='amount to mint' />
          </div>
          <div className='mint-btn-div'>

            <button>Mint Now</button>
          </div>
        </div>
      </div>
      <div className='footer-container'>

      <footer>Created By Crypted Sante</footer>
      </div>
    </div>
  );
}

export default App;
