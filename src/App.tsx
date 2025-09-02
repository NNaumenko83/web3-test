

import Web3, { type Numbers } from 'web3';
import './App.css'
import { useEffect, useState } from 'react';

const INFURA_API_KEY = import.meta.env.VITE_APP_INFURA_API_KEY
const PROJECT_ID = import.meta.env.VITE_APP_PROJECT_ID

const INFURA_URL = `https://mainnet.infura.io/v3/${INFURA_API_KEY}`

function App() {
  const [balance, setBalance] = useState<string | null>(null);

  const web3 = new Web3(INFURA_URL);
  const account = "0x90e63c3d53E0Ea496845b7a03ec7548B70014A91"

  useEffect(() => {
    const getAccountBalance = async () => {
      try {
        const wei = await web3.eth.getBalance(account);
        const balance = web3.utils.fromWei(wei, 'ether');
        setBalance(balance);
      } catch (err) {
        console.error('Error fetching balance:', err);
      }
    }

    getAccountBalance();
  }, [account, web3.eth]);

  return (
    <>
      <h1> Web3 test</h1>
      <p>Account: {account}</p>
      <p>Balance: {balance} ETH</p>
    </>
  )
}

export default App
