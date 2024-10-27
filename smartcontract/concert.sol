// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ConcertTickets {
    // Struct to store concert information
    struct Concert {
        uint256 totalCapacity;
        uint256 ticketsSold;
        bool isActive;
    }

    // Mapping from concert ID to Concert struct
    mapping(uint256 => Concert) public concerts;
    
    // Event emitted when tickets are purchased
    event TicketsPurchased(
        uint256 indexed concertId,
        address indexed buyer,
        uint256 quantity,
        uint256 remainingTickets
    );

    // Event emitted when a new concert is added
    event ConcertAdded(
        uint256 indexed concertId,
        uint256 capacity
    );

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    // Add a new concert with its capacity
    function addConcert(uint256 concertId, uint256 capacity) external onlyOwner {
        require(!concerts[concertId].isActive, "Concert already exists");
        require(capacity > 0, "Capacity must be greater than 0");

        concerts[concertId] = Concert({
            totalCapacity: capacity,
            ticketsSold: 0,
            isActive: true
        });

        emit ConcertAdded(concertId, capacity);
    }

    // Purchase tickets for a concert
    function purchaseTickets(uint256 concertId, uint256 quantity) external payable {
        Concert storage concert = concerts[concertId];
        
        require(concert.isActive, "Concert does not exist");
        require(quantity > 0, "Quantity must be greater than 0");
        require(concert.ticketsSold + quantity <= concert.totalCapacity, "Not enough tickets available");

        concert.ticketsSold += quantity;

        emit TicketsPurchased(
            concertId,
            msg.sender,
            quantity,
            concert.totalCapacity - concert.ticketsSold
        );
    }

    // Get remaining tickets for a concert
    function getRemainingTickets(uint256 concertId) external view returns (uint256) {
        Concert storage concert = concerts[concertId];
        require(concert.isActive, "Concert does not exist");
        
        return concert.totalCapacity - concert.ticketsSold;
    }

    // Check if a concert exists and is active
    function concertExists(uint256 concertId) external view returns (bool) {
        return concerts[concertId].isActive;
    }
}