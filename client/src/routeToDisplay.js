// routeToDisplay.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NFTApp from './NFTApp'; // Your renamed main component
import ShowNFT from './showNFT'; // Ensure correct import path

const provider = new ethers.providers.Web3Provider(window.ethereum);

function routeToDisplay() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NFTApp />} />
        <Route path="./showNFT" element={<ShowNFT userAddress={userAddress} provider={provider}/>} />
      </Routes>
    </Router>

  );
}

export default routeToDisplay;
