// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

// Inherit from the OpenZeppelin ERC721 contract
contract TicketNFT is ERC721URIStorage {
    // Track number of tickets minted
    uint256 public tokenCounter;
    // Set ticket price
    uint256 public ticketPrice; 
    // Store address of owner
    address payable public owner;
    // Maxiumum number of tickets that can be minted
    uint256 public maxSupply;

    // For buy now pay later
    struct PaymentPlan {
        uint256 totalPaid;
        uint256 monthlyPayment;
        uint8 monthsPaid;
        bool fullyPaid;
    }

    mapping(uint256 => PaymentPlan) public paymentPlans;
    mapping(address => bool) public hasPurchased;
    mapping(address => uint256[]) public userTickets;

    // This event is emitted when a ticket is purchased, and includes the ticket ID and purchaser address
    event TicketPurchased(uint256 indexed ticketId, address indexed purchaser);
    event MonthlyPaymentMade(uint256 indexed ticketId, uint256 amount);

    // Name and symbol for the NFT
    constructor(uint256 _maxSupply, uint256 _ticketPrice) ERC721("FirstTicket", "FTCKT") {
        owner = payable(msg.sender);
        tokenCounter = 0;
        maxSupply = _maxSupply;
        ticketPrice = _ticketPrice;
    }

    function getUserTickets(
        address user
    ) public view returns (uint256[] memory) {
        return userTickets[user];
    }

    function areAllTicketsFullyPaid(address user) public view returns (bool) {
        for (uint i = 0; i < userTickets[user].length; i++) {
            if (!paymentPlans[userTickets[user][i]].fullyPaid) {
                return false;
            }
        }
        return true;
    }

    // Create a new ticket and only allow the owner to call this function
    function createTicket(
        address recipient,
        string memory tokenURI
    ) internal returns (uint256) {
        require(tokenCounter < maxSupply, "Maximum ticket supply reached");
        uint256 newTicketId = tokenCounter;
        // Function inherited from ERC721 contract, use to mint a new NFT
        _safeMint(recipient, newTicketId);
        // Set the metadata URI for the new token
        _setTokenURI(newTicketId, tokenURI);
        userTickets[recipient].push(newTicketId);
        tokenCounter++;
        return newTicketId;
    }

    // Allow anyone to purchase a ticket as long as they send enough ETH
    function purchaseTickets(
        address recipient,
        string memory tokenURI,
        uint256 quantity
    ) external payable {
        require(quantity > 0 && quantity <= 6, "Purchase 1-6 tickets");
        require(msg.value >= (ticketPrice * quantity), "Insufficient ETH");
        require(tokenCounter + quantity <= maxSupply, "Max supply exceeded");
        require(!hasPurchased[msg.sender], "Sender already owns a ticket");

        for (uint256 i = 0; i < quantity; i++) {
            uint256 newTicketId = createTicket(recipient, tokenURI);
            // Mark the ticket as fully paid since it's a full payment
            paymentPlans[newTicketId] = PaymentPlan({
                totalPaid: ticketPrice,
                monthlyPayment: 0, // No monthly payments needed for full purchase
                monthsPaid: 0, // No months paid needed for full purchase
                fullyPaid: true // Mark as fully paid
            });
            emit TicketPurchased(newTicketId, msg.sender);
        }

        hasPurchased[msg.sender] = true;

        uint256 refund = msg.value - (ticketPrice * quantity);
        if (refund > 0) {
            payable(msg.sender).transfer(refund);
        }
    }

    function purchaseTicketsWithBNPL(
        address recipient,
        string memory tokenURI,
        uint256 quantity
    ) external payable {
        require(quantity > 0 && quantity <= 6, "Purchase 1-6 tickets");
        require(
            msg.value >= ((ticketPrice * quantity) / 4),
            "Insufficient ETH for first installment"
        );
        require(tokenCounter + quantity <= maxSupply, "Max supply exceeded");
        require(!hasPurchased[msg.sender], "Sender already owns a ticket");

        for (uint256 i = 0; i < quantity; i++) {
            uint256 newTicketId = createTicket(recipient, tokenURI);
            paymentPlans[newTicketId] = PaymentPlan({
                totalPaid: msg.value / quantity,
                monthlyPayment: (ticketPrice / 4),
                monthsPaid: 1,
                fullyPaid: false
            });
            emit TicketPurchased(newTicketId, msg.sender);
        }

        hasPurchased[msg.sender] = true;

        uint256 refund = msg.value - ((ticketPrice * quantity) / 4);
        if (refund > 0) {
            payable(msg.sender).transfer(refund);
        }
    }

    function makeBatchMonthlyPayments(
        uint256[] calldata ticketIds
    ) external payable {
        uint256 totalPaymentRequired = 0;

        // Calculate total payment required and validate each ticket
        for (uint i = 0; i < ticketIds.length; i++) {
            PaymentPlan storage plan = paymentPlans[ticketIds[i]];
            require(!plan.fullyPaid, "Ticket already fully paid");
            require(plan.monthsPaid < 4, "All installments already paid");
            totalPaymentRequired += plan.monthlyPayment;
        }

        require(
            msg.value >= totalPaymentRequired,
            "Insufficient payment amount"
        );

        // Process payments for each ticket
        for (uint i = 0; i < ticketIds.length; i++) {
            PaymentPlan storage plan = paymentPlans[ticketIds[i]];
            plan.totalPaid += plan.monthlyPayment;
            plan.monthsPaid++;

            if (plan.totalPaid >= ticketPrice || plan.monthsPaid == 4) {
                plan.fullyPaid = true;
            }

            emit MonthlyPaymentMade(ticketIds[i], plan.monthlyPayment);
        }

        // Handle refund of any overpayment
        uint256 overpayment = msg.value > totalPaymentRequired
            ? msg.value - totalPaymentRequired
            : 0;
        if (overpayment > 0) {
            payable(msg.sender).transfer(overpayment);
        }
    }

    function isTicketOnBNPL(uint256 ticketId) public view returns (bool) {
        PaymentPlan storage plan = paymentPlans[ticketId];
        // A ticket is considered to be on BNPL if there's a payment plan with less than 4 months paid
        // and it is not fully paid.
        return plan.monthsPaid > 0 && plan.monthsPaid < 4 && !plan.fullyPaid;
    }

    function resetPurchaseStatus(address user) public {
        hasPurchased[user] = false;
    }
}
