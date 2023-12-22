import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers'; // Import ethers.js library

const YourComponent = ({contractAddress,ABI}) => {
  const [userNFTs, setUserNFTs] = useState([]);

  useEffect(() => {
    const fetchUserNFTs = async () => {
      // Check if MetaMask is installed
      if (window.ethereum) {
        try {
          // Request access to the user's MetaMask account
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const provider = new ethers.providers.Web3Provider(window.ethereum);

          // Get the connected wallet's address
          const signer = provider.getSigner();
          const userAddress = await signer.getAddress();

          // Create a contract instance
          const contract = new ethers.Contract(contractAddress, ABI, signer);

          // Get total owned NFTs for the user
          const totalNFTs = await contract.balanceOf(userAddress);

          // Fetch details of each NFT
          const promises = Array.from({ length: totalNFTs.toNumber() }, (_, index) =>
            contract.tokenOfOwnerByIndex(userAddress, index)
          );

          const tokens = await Promise.all(promises);
          setUserNFTs(tokens);
        } catch (error) {
          console.error('Error fetching user NFTs:', error);
        }
      } else {
        console.error('MetaMask not installed');
      }
    };

    fetchUserNFTs();
  }, []);

  return (
    <div>
      <h1>User's Owned NFTs</h1>
      <div>
        {userNFTs.map((tokenId, index) => (
          <div key={index}>
            <p>NFT Token ID: {tokenId}</p>
            {/* Display additional NFT information here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourComponent;
