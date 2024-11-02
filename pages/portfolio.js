import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Spinner } from "@nextui-org/react";
import { useActiveAccount } from "thirdweb/react";
import { useContractEvents } from "thirdweb/react";
import ProfileHeader from '../components/ProfileHeader';
import TicketCard from '../components/TicketCard';
import { contract } from '../utils/client';
import concertData from '../data/data.json';

const Portfolio = () => {
    const address = useActiveAccount();
    const [tickets, setTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Get all TicketMinted events
    const { data: events } = useContractEvents({
        contract,
        eventName: "TicketMinted",
    });

    useEffect(() => {
        const fetchTickets = async () => {
            if (!address || !events) return;

            try {
                console.log("All Events:", events);
                console.log("Current Address:", address.address);

                // Filter events where the buyer matches the current address
                const userTickets = events
                    .filter(event => {
                        console.log("Event Args:", event.args);
                        return event.args && event.args.buyer && 
                               event.args.buyer.toLowerCase() === address.address.toLowerCase();
                    })
                    .map(event => {
                        console.log("Processing Event:", event);
                        const concert = concertData.concerts.find(c => c.id === Number(event.args.concertId));
                        return {
                            tokenId: Number(event.args.tokenId),
                            title: concert.title,
                            date: concert.date,
                            venue: concert.venue.name,
                            image: concert.imgCard,
                            hasEntered: false,
                            purchaseDate: new Date(Number(event.args.timestamp) * 1000)
                        };
                    });

                console.log("Filtered Tickets:", userTickets);
                setTickets(userTickets);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching tickets:", error);
                console.error("Error details:", {
                    events: events,
                    address: address.address,
                    error: error.message
                });
                setIsLoading(false);
            }
        };

        fetchTickets();
    }, [address, events]);

    // Rest of the code remains the same...
    if (!address) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-2xl font-bold mb-4">Please connect your wallet</h1>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8 flex justify-center">
                <Spinner size="lg" />
            </div>
        );
    }

    const upcomingTickets = tickets.filter(ticket => !ticket.hasEntered);
    const pastTickets = tickets.filter(ticket => ticket.hasEntered);

    return (
        <div className="container mx-auto px-4 py-8">
            <ProfileHeader
                ticketCount={tickets.length}
                attendedCount={pastTickets.length}
            />

            <Tabs
                aria-label="Ticket Options"
                className="mb-8"
                color="primary"
            >
                <Tab key="all" title={`All Tickets (${tickets.length})`}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {tickets.map((ticket) => (
                            <TicketCard key={ticket.tokenId} ticket={ticket} />
                        ))}
                    </div>
                </Tab>
                <Tab key="upcoming" title={`Upcoming Events (${upcomingTickets.length})`}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {upcomingTickets.map((ticket) => (
                            <TicketCard key={ticket.tokenId} ticket={ticket} />
                        ))}
                    </div>
                </Tab>
                <Tab key="past" title={`Past Events (${pastTickets.length})`}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {pastTickets.map((ticket) => (
                            <TicketCard key={ticket.tokenId} ticket={ticket} />
                        ))}
                    </div>
                </Tab>
            </Tabs>

            {tickets.length === 0 && (
                <div className="text-center py-12">
                    <h3 className="text-xl font-semibold mb-2">No tickets found</h3>
                    <p className="text-default-500">
                        You haven't purchased any tickets yet.
                    </p>
                </div>
            )}
        </div>
    );
};

export default Portfolio;