const hre = require("hardhat");

async function main() {
    const TicketNFT = await hre.ethers.getContractFactory("TicketNFT");
    const ticketNFT = await TicketNFT.deploy();

    await ticketNFT.deployed();

    console.log("TicketNFT deployed to:", ticketNFT.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
