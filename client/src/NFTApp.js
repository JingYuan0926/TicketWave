import React, { useState, useEffect } from 'react';
import { ethers } from "ethers";
import { Link } from 'react-router-dom';

function App({ contractAddress, ABI }) {
    const [userAddress, setUserAddress] = useState('');
    const [ticketsSold, setTicketsSold] = useState(0);
    const [maxSupply, setMaxSupply] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [ticketQuantity, setTicketQuantity] = useState(1);
    const [ticketIds, setTicketIds] = useState([]); // Array to store user's BNPL ticket IDs
    const [isBNPL, setIsBNPL] = useState(false);
    const ticketPrice = 0.1; // ETH, adjust as necessary
    const [totalCostReact, setTotalCost] = useState(ticketPrice);
    const ticketsLeft = maxSupply - ticketsSold;

    useEffect(() => {
        if (userAddress) {
            fetchContractData();
        }
    }, [userAddress]);



    const fetchContractData = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, ABI, provider);

        try {
            const tokenCounter = await contract.tokenCounter();
            const maxSupplyFromContract = await contract.maxSupply();
            setTicketsSold(tokenCounter.toNumber());
            setMaxSupply(maxSupplyFromContract.toNumber());
            setIsLoading(false);

            // Fetch user's BNPL ticket IDs and other necessary details here
            // setTicketIds(fetchedTicketIds);
        } catch (error) {
            console.error("Error fetching contract data:", error);
        }
    };

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setUserAddress(accounts[0]);
            } catch (error) {
                console.error(error);
            }
        } else {
            alert('MetaMask is not installed. Please install it to use this app.');
        }
    };

    const incrementTicketQuantity = () => {
        setTicketQuantity(qty => qty < 6 ? qty + 1 : qty);
        setTotalCost(price => price < (ticketPrice * 6) ? +(price + ticketPrice).toFixed(2) : price);
    };

    const decrementTicketQuantity = () => {
        setTicketQuantity(qty => qty > 1 ? qty - 1 : qty);
        setTotalCost(price => price > ticketPrice ? +(price - ticketPrice).toFixed(2) : price);
    };

    const purchaseTickets = async () => {
        if (!window.ethereum) {
            return alert('Please install MetaMask.');
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, ABI, signer);

        try {
            const totalCost = ethers.utils.parseEther((ticketPrice * ticketQuantity).toString());
            let transaction;

            if (isBNPL) {
                transaction = await contract.purchaseTicketsWithBNPL(
                    userAddress,
                    "ipfs://bafkreic2b3etcbr6dobejpkythckln7ro4se6pj24xmbiwxqfoh2ftf3pi",
                    ticketQuantity,
                    { value: ethers.utils.parseEther(((ticketPrice * ticketQuantity) / 4).toString()) }
                );
                // Consider updating the ticketIds state with new BNPL ticket IDs
            } else {
                transaction = await contract.purchaseTickets(
                    userAddress,
                    "ipfs://bafkreic2b3etcbr6dobejpkythckln7ro4se6pj24xmbiwxqfoh2ftf3pi",
                    ticketQuantity,
                    { value: totalCost }
                );
            }

            await transaction.wait();
            alert(`${ticketQuantity} NFT Ticket(s) Purchased Successfully!`);
            fetchContractData(); // Refresh data after purchase
        } catch (error) {
            console.error(error);
            alert('Transaction Cancelled');
        }
    };

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    /*
    const makeMonthlyPayment = async (ticketId, amountToPay) => {
        if (!window.ethereum) {
            return alert('Please install MetaMask.');
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, ABI, signer);

        try {
            const paymentAmount = ethers.utils.parseEther(amountToPay.toString());
            const transaction = await contract.makeMonthlyPayment(ticketId, { value: paymentAmount });
            await transaction.wait();
            alert(`Payment of ${amountToPay} ETH for ticket ID ${ticketId} was successful!`);
            fetchContractData(); // Refresh data after payment
        } catch (error) {
            console.error(error);
            alert('There was an error making the payment.');
        }
    };
    

    const payOffRemaining = async (ticketId) => {
        // Assuming you have a way to calculate or fetch the remaining amount due
        const remainingAmount = calculateRemainingAmount(ticketId);
        makeMonthlyPayment(ticketId, remainingAmount);
    };

    const calculateRemainingAmount = (ticketId) => {
        // Implement calculation or fetching of the remaining amount
        // This is a placeholder and should be replaced with actual logic
        return ticketPrice - (ticketPrice / 3);
    };


    console.log("BNPL Ticket IDs:", ticketIds);
    */
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
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="paymentType"
                                value="full"
                                checked={!isBNPL}
                                onChange={() => setIsBNPL(false)}
                            /> Full Payment
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="paymentType"
                                value="bnpl"
                                checked={isBNPL}
                                onChange={() => setIsBNPL(true)}
                            /> Buy Now, Pay Later
                        </label>
                    </div>
                    <button onClick={purchaseTickets}>Purchase {ticketQuantity} Ticket(s)</button>
                    <p>Your total is: {totalCostReact} ETH</p>
                    <p>Total Tickets Launched: {maxSupply}</p>
                    {ticketsLeft > 0 ? (
                        <p>Tickets Left: {ticketsLeft}</p>
                    ) : (
                        <p>Sold Out</p>
                    )}
                    <Link to="./showNFT">
                        <button >Show NFT</button>
                    </Link>
                </>
            ) : (
                <p>Loading, connect wallet first</p>
            )}
        </div>
    );
}

export default App;
