// scripts/deploy.js

const hre = require("hardhat");

const CONTRACT_ADDRESS = "0x4B1eacD1FAD89C0DB36aed5E44136b41De73d333"

async function main() {
    // Getting the contract factory
    const contract = await hre.ethers.getContractAt("TicketNFT", CONTRACT_ADDRESS);

    // Deploying the contract
    const info = await contract.transactions(0);
    
    console.log(info);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
