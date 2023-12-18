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

    // Name and symbol for the NFT
    constructor() ERC721("Ticket", "TCKT") {
        owner = payable(msg.sender);
        tokenCounter = 0;
    }

    // Create a new ticket and only allow the owner to call this function
    function createTicket(address recipient, string memory tokenURI) internal returns (uint256) {
        uint256 newTicketId = tokenCounter;
        // Function inherited from ERC721 contract, use to mint a new NFT
        _safeMint(recipient, newTicketId);
        // Set the metadata URI for the new token
        _setTokenURI(newTicketId, tokenURI);  
        tokenCounter++;
        return newTicketId;
    }

    // Allow anyone to purchase a ticket as long as they send enough ETH
    function purchaseTicket(address recipient, string memory tokenURI) external payable returns (uint256) {
        require(msg.value >= ticketPrice, "Not enough ETH sent; check ticket price!");

        uint256 newTicketId = createTicket(recipient, tokenURI);

        // Refund any excess payment
        if (msg.value > ticketPrice) {
            payable(msg.sender).transfer(msg.value - ticketPrice);
        }

        // Transfer ticket price to the owner of the contract
        owner.transfer(ticketPrice);

        emit TicketPurchased(newTicketId, msg.sender);

        return newTicketId;
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
