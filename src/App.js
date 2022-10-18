import { useEffect, useState } from 'react';
import './App.css';
import { ethers } from 'ethers';
import {SANTE_TOKEN_ADDRESS} from "./addressconfig"
import santetokenabi from "./assets/santetoken.json"
import logoTransparentBG from "./image-assests/logo-no-background.png"
import {networks} from "./utils/networks"


function App() {
  const [mintAmount, setMintAmount] = useState()
  const [activeAccount, setActiveAccount] = useState()
  const [currentTokCount, setCurrenttokCount] = useState()
  const [totalSupply, setTotalSupply] = useState()
  const [network, setNetwork] = useState("")
  const [triggerLoad, setTriggerLoad] = useState(false)

  const toWei = (num) => ethers.utils.parseEther(num.toString())
  const fromWei = (num) => ethers.utils.formatEther(num)

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

      if(accounts.length !== 0){
        const account = accounts[0]

        setActiveAccount(account)

        console.log(`Account connected: ${accounts[0]}`)

      }
      const chainId = await ethereum.request({method: "eth_chainId"})
      setNetwork(networks[chainId])

      ethereum.on('chainChanged', handleChainChanged);

      function handleChainChanged(_chainId) {
        window.location.reload();
      }


    }catch(error){
      console.log(error)
    }
  }

  const connectWallet = async () =>{
    try {
      const {ethereum} = window;
      if(!ethereum){
        alert("please install metamask")
        return;

      }
      const accounts = await ethereum.request({method: "eth_requestAccounts"})
      setActiveAccount(accounts[0])
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
        const maxSupply = await SanteTokenContract.maxSupply()
        setTotalSupply(fromWei(maxSupply))


        setCurrenttokCount(fromWei(currentSupply.toString()))
      }

    }catch(error){
      console.log(error)
    }
    
  }

  const mintTokens = async () =>{
    setTriggerLoad(!triggerLoad)
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
    setTriggerLoad(!triggerLoad)
  }

  const renderMintButton = () => {
    if(network !== "Polygon Mumbai Testnet"){
      return (
        <div>
          <h4 className='switch-header'>Please Connect To Polygon Testnet</h4>
        </div>
      )
    } 
    return (
      <div className='mint-btn-div'>

            <button className="myButton" onClick={mintTokens}>Mint Now</button>
          </div>
    )
  }

  useEffect(()=>{
    checkIfWalletIsConnected();
  },[activeAccount, network])

  useEffect(()=>{
    getCurrentTokensMinted()

  },[triggerLoad])

  return (
    <div className="App">
      <div className='wallet-button-container'>
        {!activeAccount ?  <button onClick={connectWallet} className="myButton">Connect Wallet</button> : <button className="myButton">{activeAccount.slice(0, 4)}...{activeAccount.slice(-6)}</button>}
       
      </div>
      <div className='minting-container-main'>
        {/* <h1>Mint The Sante Token</h1> */}
        <div className='minting-container-inputs'>
        <img className='main-image' alt="main page logo" src={logoTransparentBG} />

          <div >
            <p>Current Tokens Minted: {currentTokCount}</p>
            <p>Max Supply: {totalSupply}</p>
            <input className="Input" placeholder='amount to mint' onChange={e=>setMintAmount(toWei(e.target.value))} />
          </div>
          {renderMintButton()}
        </div>
      </div>
      <div className='footer-container'>

      <footer>Created By Crypted Sante</footer>
      </div>
    </div>
  );
}

export default App;
