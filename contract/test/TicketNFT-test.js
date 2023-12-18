const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TicketNFT", function () {
    let TicketNFT;
    let ticketNFT;
    let owner;
    let addr1;
    let addr2;
    let addrs;

    beforeEach(async function () {
        TicketNFT = await ethers.getContractFactory("TicketNFT");
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        ticketNFT = await TicketNFT.deploy();
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await ticketNFT.owner()).to.equal(owner.address);
        });
    });

    describe("Minting Tickets", function () {
        it("Should mint and assign a new ticket", async function () {
            await ticketNFT.purchaseTicket(addr1.address, "https://ipfs.io/ipfs/QmZGCJvLN8gjPrDbsYo5VG8qBmwwj2b9DVSVzbsH5Tbu8j", { value: ethers.utils.parseEther("0.1") });
            expect(await ticketNFT.ownerOf(0)).to.equal(addr1.address);
        });
    
        it("Should return the correct ticket information", async function () {
            await ticketNFT.purchaseTicket(addr1.address, "https://ipfs.io/ipfs/QmZGCJvLN8gjPrDbsYo5VG8qBmwwj2b9DVSVzbsH5Tbu8j", { value: ethers.utils.parseEther("0.1") });
            const ticketURI = await ticketNFT.getTicketInfo(0);
            expect(ticketURI).to.be.a('string');
        });
    });

});
