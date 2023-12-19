import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import NFTApp from './NFTApp';
import ContractTransactions from './ContractTransaction';

const contractAddress = '0x32697dC6d02dFB5DAA68fa8fFcD0a362b93fF96a'; // Replace with your contract address

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NFTApp />
    <ContractTransactions contractAddress={contractAddress} />
  </React.StrictMode>
);
