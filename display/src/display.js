import React, { useState, useEffect } from 'react';
import NFTContainer from './NFTContainer';

function App() {
    const [userAddress, setUserAddress] = useState(null);
    const [nfts, setNfts] = useState([]);
    const apiKey = 'c18a4f34-f4c7-4576-a146-9cde85615e95'; // Replace with your actual API key
    const url = 'https://testnet-api.rarible.org/v0.1/items/byCreator'; // Replace with the actual API endpoint you're using

    const connectWallet = async () => {
        if (typeof window.ethereum !== 'undefined') {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setUserAddress(accounts[0]);
            if(window.ethereum.chainId === '0xA869') { // Chain ID for Sepolia in hexadecimal
                fetchNFTs();
            }
        } else {
            alert('MetaMask is not installed. Please install it to use this app.');
        }
    };

    const fetchNFTs = async () => {
        try {
            const creatorAddress = `ETHEREUM:${userAddress}`;
            const response = await fetch(`${url}/?creator=${creatorAddress}`, {
                method: 'GET',
                headers: {
                    'X-API-KEY': apiKey,
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                const data = await response.json();
                console.log(data);
                setNfts(data.items); // Assuming the API returns an object with an items array
            }
        } catch (error) {
            console.error('Error fetching NFTs:', error);
            alert('An error occurred. Please try again.');
        }
    }

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('chainChanged', (chainId) => {
                if(chainId === '0xA869') { // Chain ID for Sepolia in hexadecimal
                    fetchNFTs();
                }
            });
        }
    }, []);

    useEffect(() => {
        if (userAddress) {
            fetchNFTs();
        }
    }, [userAddress]);

    return (
        <div className='display'>
            <h1>Your NFTs</h1>
            <div className='text'>
                Wallet Account: {userAddress}
            </div>
            <button className='connect-button' onClick={connectWallet}>
                Connect Wallet
            </button>
            <NFTContainer nfts={nfts}/>
        </div>
    )
}

export default App;
