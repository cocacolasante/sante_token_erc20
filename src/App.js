import { useEffect, useState } from 'react';
import './App.css';
import { ethers } from 'ethers';
import {SANTE_TOKEN_ADDRESS} from "./addressconfig"
import santetokenabi from "./assets/santetoken.json"


function App() {
  const [mintAmount, setMintAmount] = useState()
  const [activeAccount, setActiveAccount] = useState()
  const [currentTokCount, setCurrenttokCount] = useState()
  const [triggerLoad, setTriggerLoad] = useState(false)


  const checkIfWalletIsConnected = async () =>{
    try{
      const {ethereum} = window;
      if(!ethereum){
        alert('Please install metamask')
        return;
      } else{
        console.log("Ethereum Window Found")
      }
      const accounts = await ethereum.request({method: "eth_requestAccounts"})
      const account = accounts[0]

      setActiveAccount(account)

      console.log(`Account connected: ${accounts[0]}`)

    }catch(error){
      console.log(error)
    }
  }

  const getCurrentTokensMinted = async () =>{
    try{
      const {ethereum} = window;
      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum)
        const SanteTokenContract = new ethers.Contract(SANTE_TOKEN_ADDRESS, santetokenabi.abi, provider)

        const currentSupply = await SanteTokenContract.returnCurrentSupply()
        setCurrenttokCount(currentSupply.toString())
      }

    }catch(error){
      console.log(error)
    }
    
  }

  const mintTokens = async () =>{
    setTriggerLoad(true)
    try {
      
      const {ethereum} = window;
      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const SanteTokenContract = new ethers.Contract(SANTE_TOKEN_ADDRESS, santetokenabi.abi, signer)

        let txn = await SanteTokenContract.mint(activeAccount, mintAmount)
        let receipt = await txn.wait()

        if(receipt.status === 1){
          console.log("Tokens Minted Successful!")
          
          
          
        } else {
          alert("Transaction failed, please try again")
        }
      }

    }catch ( error){
      console.log(error)
    }
    setTriggerLoad(false)
  }

  useEffect(()=>{
    checkIfWalletIsConnected();
  },[])

  useEffect(()=>{
    getCurrentTokensMinted()

  },[triggerLoad])

  return (
    <div className="App">
      <div className='wallet-button-container'>
        {!activeAccount ?  <button className='connect-btn'>Connect Wallet</button> : <p>{activeAccount.slice(0, 4)}...{activeAccount.slice(-6)}</p>}
       
      </div>
      <div className='minting-container-main'>
        <h1>Mint The Sante Token</h1>
        <img alt="main page logo" src="null" />
        <div className='minting-container-inputs'>
          <div >
            <p>Current Tokens Minted: {currentTokCount}</p>
            <p>Max Supply: 1000000</p>
            <input placeholder='amount to mint' onChange={e=>setMintAmount(e.target.value)} />
          </div>
          <div className='mint-btn-div'>

            <button onClick={mintTokens}>Mint Now</button>
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
