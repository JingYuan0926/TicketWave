// scripts/deploy.js

const hre = require("hardhat");

const CONTRACT_ADDRESS = "0x32697dC6d02dFB5DAA68fa8fFcD0a362b93fF96a"

async function main() {
    // Getting the contract factory
    const contract = await hre.ethers.getContractAt("TicketNFT", CONTRACT_ADDRESS);

    // Deploying the contract
    const info = await contract.getTicketInfo(1);
    
    console.log(info);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
