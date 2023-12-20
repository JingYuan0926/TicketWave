import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

function App({contractAddress, ABI}) {


    const [userAddress, setUserAddress] = useState('');
    const [ticketsSold, setTicketsSold] = useState(0);
    const [maxSupply, setMaxSupply] = useState(0);
    const [isLoading, setIsLoading] = useState(true); // Add a loading state

    const fetchContractData = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, ABI, provider);

        try {
            const tokenCounter = await contract.tokenCounter();
            const maxSupplyFromContract = await contract.maxSupply();
            setTicketsSold(tokenCounter.toNumber());
            setMaxSupply(maxSupplyFromContract.toNumber());
            setIsLoading(false); // Set loading to false after data is fetched
        } catch (error) {
            console.error("Error fetching contract data:", error);
        }
    };

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setUserAddress(accounts[0]);
                fetchContractData(); // Fetch contract data after connecting the wallet
            } catch (error) {
                console.error(error);
            }
        } else {
            alert('MetaMask is not installed. Please install it to use this app.');
        }
    };
    const purchaseTicket = async () => {
        if (!window.ethereum) {
            return alert('Please install MetaMask.');
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const ticketNFTContract = new ethers.Contract(contractAddress, ABI, signer);

        try {
            const transaction = await ticketNFTContract.purchaseTicket(userAddress, "ipfs://bafkreic2b3etcbr6dobejpkythckln7ro4se6pj24xmbiwxqfoh2ftf3pi", { value: ethers.utils.parseEther("0.1") });
            await transaction.wait();
            alert('NFT Purchased Successfully!');
            fetchContractData(); // Refresh the tickets sold count after purchase
        } catch (error) {
            console.error(error);
            alert('There was an error purchasing the ticket.');
        }
    };

    const ticketsLeft = maxSupply - ticketsSold;

    return (
        <div>
            <button onClick={connectWallet}>Connect Wallet</button>
            {userAddress ? (
                <>
                    <p>Wallet Address: {userAddress}</p>
                    <button onClick={purchaseTicket}>Purchase Ticket</button>
                    <p>Total Ticket Launched: {maxSupply}</p>
                    {ticketsLeft > 0 ? (
                        <p>Tickets Left: {ticketsLeft}</p>
                    ) : (
                        <p>Sold Out</p>
                    )}
                </>
            ) : (
                <p>Loading, connect wallet first</p>
            )}
        </div>
    );
}


export default App;