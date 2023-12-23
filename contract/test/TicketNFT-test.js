const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TicketNFT Contract", function () {
    let TicketNFT;
    let ticketNFT;
    let owner;
    let addr1;
    let addr2;
    let addrs;
    const ticketURI = "https://ipfs.io/ipfs/Qm";
    const ticketPrice = ethers.utils.parseEther("0.01");
    const monthlyPayment = ethers.utils.parseEther("0.0025");

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

    describe("Purchase Tickets", function () {
        it("Should allow users to purchase tickets", async function () {
            await ticketNFT.connect(addr1).purchaseTickets(addr1.address, "tokenURI", 1, { value: ethers.utils.parseEther("0.01") });
            expect(await ticketNFT.hasPurchased(addr1.address)).to.be.true;
        });

        it("Should not allow purchasing more than once", async function () {
            await ticketNFT.connect(addr1).purchaseTickets(addr1.address, "tokenURI", 1, { value: ethers.utils.parseEther("0.01") });
            await expect(ticketNFT.connect(addr1).purchaseTickets(addr1.address, "tokenURI", 1, { value: ethers.utils.parseEther("0.01") }))
                .to.be.revertedWith("Sender already owns a ticket");
        });
    });

    describe("BNPL Functionality", function () {
        it("Should allow users to purchase tickets with BNPL", async function () {
            await ticketNFT.connect(addr1).purchaseTicketsWithBNPL(addr1.address, "tokenURI", 1, { value: ethers.utils.parseEther("0.0025") });
            const ticketId = await ticketNFT.userTickets(addr1.address, 0);
            expect(await ticketNFT.isTicketOnBNPL(ticketId)).to.be.true;
        });

        it("Should see if the user is on bnpl", async function () {
            // Purchase a ticket with BNPL
            await ticketNFT.connect(addr1).purchaseTicketsWithBNPL(
                addr1.address,
                "tokenURI",
                1,
                { value: ethers.utils.parseEther("0.0025") }
            );

            // Get the ticket ID for the first ticket. Assuming `userTickets` is a public mapping
            // Get the ticket ID for the first ticket. Assuming `userTickets` is a public mapping
            const ticketId = await ticketNFT.userTickets(addr1.address, 0);


            // Check if the ticket is on a BNPL plan
            expect(await ticketNFT.isTicketOnBNPL(ticketId)).to.be.true;
        });

        it("Should allow users to make monthly payments", async function () {
            await ticketNFT.connect(addr1).purchaseTicketsWithBNPL(addr1.address, "tokenURI", 1, { value: ethers.utils.parseEther("0.0025") });
            const ticketId = await ticketNFT.userTickets(addr1.address, 0);
            await ticketNFT.connect(addr1).makeMonthlyPayment(ticketId, { value: ethers.utils.parseEther("0.0025") });
            const paymentPlan = await ticketNFT.paymentPlans(ticketId);
            expect(paymentPlan.monthsPaid).to.equal(2);
        });

    });

    describe("BNPL Full Payment", function () {
        it("Should mark the ticket as fully paid after all payments are made", async function () {
            // addr1 purchases a ticket with BNPL
            await ticketNFT.connect(addr1).purchaseTicketsWithBNPL(
                addr1.address,
                ticketURI,
                1, // quantity
                { value: monthlyPayment }
            );

            // Making the rest of the payments
            for (let i = 0; i < 3; i++) { // 3 more payments to complete the BNPL
                await ticketNFT.connect(addr1).makeMonthlyPayment(0, { value: monthlyPayment });
            }

            // Check if the ticket is fully paid
            const paymentPlan = await ticketNFT.paymentPlans(0);
            expect(paymentPlan.fullyPaid).to.equal(true);

            // Check if all tickets of addr1 are fully paid
            const allFullyPaid = await ticketNFT.areAllTicketsFullyPaid(addr1.address);
            expect(allFullyPaid).to.equal(true);
        });
    });

    describe("Reset Function", function () {

        it("Can buy again", async function () {
            await ticketNFT.connect(addr1).purchaseTickets(addr1.address, "tokenURI", 1, { value: ethers.utils.parseEther("0.01") });
            await ticketNFT.connect(addr1).resetPurchaseStatus(addr1.address);
            await ticketNFT.connect(addr1).purchaseTickets(addr1.address, "tokenURI", 1, { value: ethers.utils.parseEther("0.01") });
            expect(await ticketNFT.hasPurchased(addr1.address)).to.be.true;
        });
    });

    describe("BNPL Functionality", function () {
        it("Should get BNPL details for a user", async function () {
            // User addr1 buys a ticket with BNPL
            await ticketNFT.connect(addr1).purchaseTicketsWithBNPL(
                addr1.address,
                "tokenURI",
                1,
                { value: ethers.utils.parseEther("0.0025") } // 25% of ticket price
            );

            // Retrieve ticket ID
            const ticketIds = await ticketNFT.getUserTickets(addr1.address);
            const ticketId = ticketIds[0];
            
            const paymentPlan = await ticketNFT.paymentPlans(ticketId);

        // Assertions to verify BNPL details
        expect(paymentPlan.totalPaid).to.equal(ethers.utils.parseEther("0.0025"));
        expect(paymentPlan.monthlyPayment).to.equal(ethers.utils.parseEther("0.0025"));
        expect(paymentPlan.monthsPaid).to.equal(1);
        expect(paymentPlan.fullyPaid).to.be.false;

        });
    });
});
