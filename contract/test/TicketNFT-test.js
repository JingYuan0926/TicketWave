const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TicketNFT", function () {
    let TicketNFT;
    let ticketNFT;
    let owner;
    let addr1;
    let addr2;
    let addrs;
    const number =6;
    // 1,4,5 wont work

    beforeEach(async function () {
        TicketNFT = await ethers.getContractFactory("TicketNFT");
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        ticketNFT = await TicketNFT.deploy(10);
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await ticketNFT.owner()).to.equal(owner.address);
        });
    });

    describe("Minting Tickets", function () {
        it("Should mint and assign a new ticket", async function () {
            await ticketNFT.purchaseTicketsWithBNPL(addr1.address, "https://ipfs.io/ipfs/QmZGCJvLN8gjPrDbsYo5VG8qBmwwj2b9DVSVzbsH5Tbu8j",number,{ value: ethers.utils.parseEther(((0.1 * number) / 3).toString()) });
            expect(await ticketNFT.ownerOf(0)).to.equal(addr1.address);
        });
    
    });

});
