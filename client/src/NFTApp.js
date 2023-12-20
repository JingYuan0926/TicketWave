import React, { useState, useEffect } from 'react';
import { ethers} from "ethers";

function App({contractAddress, ABI}) {


    const [userAddress, setUserAddress] = useState('');
    const [ticketsSold, setTicketsSold] = useState(0);
    const [maxSupply, setMaxSupply] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [ticketQuantity, setTicketQuantity] = useState(1); 
    const ticketPrice = 0.1;

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
    
    const incrementTicketQuantity = () => {
        setTicketQuantity(qty => qty < 6 ? qty + 1 : qty);
    };

    const decrementTicketQuantity = () => {
        setTicketQuantity(qty => qty > 1 ? qty - 1 : qty);
    };

    const purchaseTicket = async () => {
        if (!window.ethereum) {
            return alert('Please install MetaMask.');
        }
    
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const ticketNFTContract = new ethers.Contract(contractAddress, ABI, signer);
    
        try {
            const totalCost = ethers.utils.parseEther((ticketPrice * ticketQuantity).toString());
            // Include the quantity in the function call
            const transaction = await ticketNFTContract.purchaseTickets(userAddress, "ipfs://bafkreic2b3etcbr6dobejpkythckln7ro4se6pj24xmbiwxqfoh2ftf3pi", ticketQuantity, { value: totalCost });
            await transaction.wait();
            alert(`${ticketQuantity} NFT(s) Purchased Successfully!`);
            fetchContractData(); // Refresh the tickets sold count after purchase
        } catch (error) {
            console.error(error);
            alert('There was an error purchasing the ticket(s).');
        }
    };

    const ticketsLeft = maxSupply - ticketsSold;

    return (
        <div>
            <button onClick={connectWallet}>Connect Wallet</button>
            {userAddress ? (
                <>
                    <p>Wallet Address: {userAddress}</p>
                    <div>
                        <button onClick={decrementTicketQuantity}>-</button>
                        <span>{ticketQuantity}</span>
                        <button onClick={incrementTicketQuantity}>+</button>
                    </div>
                    <button onClick={purchaseTicket}>Purchase {ticketQuantity} Ticket(s)</button>
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