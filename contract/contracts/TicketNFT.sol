// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


// Inherit from the OpenZeppelin ERC721 contract
contract TicketNFT is ERC721URIStorage {

    // Track number of tickets minted
    uint256 public tokenCounter;
     // Set ticket price
    uint256 public ticketPrice = 0.1 ether; 
    // Store address of owner
    address payable public owner;
    // Maxiumum number of tickets that can be minted
    uint256 public maxSupply;
    // Hold ticket info
    struct TicketInfo {
        address owner;
        uint256 time;
        uint256 ticketId;
    }

    // Create an array to store all ticket transactions
    TicketInfo[] public transactions;

    // Name and symbol for the NFT
    constructor(uint256 _maxSupply) ERC721("FirstTicket", "FTCKT") {
        owner = payable(msg.sender);
        tokenCounter = 0;
        maxSupply = _maxSupply; 
    }

    // Create a new ticket and only allow the owner to call this function
    function createTicket(address recipient, string memory tokenURI) internal returns (uint256) {
        require(tokenCounter < maxSupply, "Maximum ticket supply reached");
        uint256 newTicketId = tokenCounter;
        // Function inherited from ERC721 contract, use to mint a new NFT
        _safeMint(recipient, newTicketId);
        // Set the metadata URI for the new token
        _setTokenURI(newTicketId, tokenURI);  
        tokenCounter++;
        return newTicketId;
    }

    // Allow anyone to purchase a ticket as long as they send enough ETH
    function purchaseTickets(address recipient, string memory tokenURI, uint256 quantity) external payable {
        require(quantity > 0 && quantity <= 6, "Purchase 1-6 tickets");
        require(msg.value >= (ticketPrice * quantity), "Insufficient ETH");
        require(tokenCounter + quantity <= maxSupply, "Max supply exceeded");
    for (uint256 i = 0; i < quantity; i++) {
            uint256 newTicketId = createTicket(recipient, tokenURI);
            transactions.push(TicketInfo(recipient, block.timestamp, newTicketId));
            emit TicketPurchased(newTicketId, msg.sender);
        }

        uint256 refund = msg.value - (ticketPrice * quantity);
        if (refund > 0) {
            payable(msg.sender).transfer(refund);
        }
    }
    
    // This event is emitted when a ticket is purchased, and includes the ticket ID and purchaser address 
    event TicketPurchased(uint256 indexed ticketId, address indexed purchaser);
    
    function getTicketInfo(uint256 ticketId) public view returns (string memory) {
    // This will revert if the ticket does not exist
     // Check if ticket exists. It will revert if not.
    ownerOf(ticketId); 
    return tokenURI(ticketId);
}
}
