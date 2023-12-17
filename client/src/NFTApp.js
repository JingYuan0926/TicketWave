import React, { useState } from 'react';
import { ethers } from 'ethers';

function App() {
    const [userAccount, setUserAccount] = useState("");
    const [amount, setAmount] = useState("");
    const [contract, setContract] = useState(null);

    async function requestAccount() {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    }

    async function connectContract() {
        if (typeof window.ethereum !== 'undefined') {
            await requestAccount();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, TicketNFT.abi, signer);
            setContract(contract);
        }
    }

    async function purchaseTicket() {
        if (!contract) return;
        await contract.purchaseTicket(userAccount, { value: ethers.utils.parseEther(amount) });
    }

    return (
        <div>
            <button onClick={connectContract}>Connect to Contract</button>
            <input onChange={e => setUserAccount(e.target.value)} placeholder="Account ID" />
            <input onChange={e => setAmount(e.target.value)} placeholder="Amount (ETH)" />
            <button onClick={purchaseTicket}>Purchase Ticket</button>
        </div>
    );
}

export default App;
