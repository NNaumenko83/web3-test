

import Web3 from 'web3';
import './App.css'
import { useEffect, useMemo, useState } from 'react';
import abiContractSTRU from "../contracts/contract-tokenTracker-abi.json"


const INFURA_API_KEY = import.meta.env.VITE_APP_INFURA_API_KEY
const PROJECT_ID = import.meta.env.VITE_APP_PROJECT_ID
const RUNNER_TOKEN_ADDRESS = import.meta.env.VITE_APP_RUNNER_TOKEN_ADDRESS
console.log('RUNNER_TOKEN_ADDRESS:', RUNNER_TOKEN_ADDRESS)

const INFURA_URL = `https://sepolia.infura.io/v3/${INFURA_API_KEY}`

function App() {
  const [balance, setBalance] = useState<string | null>(null);
  const [contractName, setContractName] = useState<string | null>(null);

  const web3 = new Web3(INFURA_URL);
  const account = "0x90e63c3d53E0Ea496845b7a03ec7548B70014A91"
  const contract = () => new web3.eth.Contract(abiContractSTRU, RUNNER_TOKEN_ADDRESS);



  useEffect(() => {
    const getAccountBalance = async () => {
      try {
        const wei = await web3.eth.getBalance(account);
        const balance = web3.utils.fromWei(wei, 'ether');
        const contractInstance = contract();
        const contrName = await contractInstance.methods.name().call();


        setBalance(balance);
        setContractName(typeof contrName === 'string' ? contrName : null);
      } catch (err) {
        console.error('Error fetching!!!!!:', err);
      }
    }

    getAccountBalance();
  }, [account, web3.eth]);

  return (
    <>
      <h1>Web3 test</h1>
      <p>Account: {account}</p>
      <p>Balance: {balance} ETH</p>
      <p>Contract Name: {contractName}</p>
    </>
  )
}

export default App
