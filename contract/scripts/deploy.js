// scripts/deploy.js

const hre = require("hardhat");

async function main() {
    // Getting the contract factory
    const TicketNFT = await hre.ethers.getContractFactory("TicketNFT");

    // Deploying the contract
    const ticketNFT = await TicketNFT.deploy();

    // Waiting for the deployment to be mined
    await ticketNFT.deployed();

    console.log("TicketNFT deployed to:", ticketNFT.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
