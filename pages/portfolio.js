import React, { useState, useEffect } from "react";
import { Tabs, Tab, Spinner } from "@nextui-org/react";
import { useActiveAccount } from "thirdweb/react";
import ProfileHeader from "../components/ProfileHeader";
import TicketCard from "../components/TicketCard";
import { ethers } from "ethers";
import concertData from "../data/data.json";

const Portfolio = () => {
  const address = useActiveAccount();
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      if (!address) return;

      try {
        const provider = new ethers.providers.JsonRpcProvider(
          process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
        );
        const contractAddress = "0x5039e2bF006967F8049933c7DF6c7Ca0b49AeBeB";

        // Updated event signature based on the logs
        const eventSignature =
          "TicketMinted(uint256,address,uint256,uint256,string,string)";
        const topic = ethers.utils.id(eventSignature);

        const filter = {
          address: contractAddress,
          topics: [
            topic,
            null, // concertId (indexed)
            ethers.utils.hexZeroPad(address.address, 32), // buyer (indexed)
          ],
          fromBlock: 0,
          toBlock: "latest",
        };

        console.log("Fetching events for address:", address.address);
        const logs = await provider.getLogs(filter);
        console.log("Found logs:", logs);

        const userTickets = await Promise.all(
          logs.map(async (log) => {
            // Parse the indexed parameters from topics
            const concertId = parseInt(log.topics[1], 16);

            // Parse the non-indexed parameters from data
            const decodedData = ethers.utils.defaultAbiCoder.decode(
              ["uint256", "uint256", "string", "string"],
              ethers.utils.hexDataSlice(log.data, 0)
            );

            const tokenId = decodedData[0];
            const timestamp = decodedData[1];
            const seatType = decodedData[3];

            console.log("Parsed event data:", {
              concertId,
              tokenId: tokenId.toString(),
              timestamp: timestamp.toString(),
              seatType: seatType,
            });

            const concert = concertData.concerts.find(
              (c) => c.id === concertId
            );
            if (!concert) {
              console.warn("Concert not found for ID:", concertId);
              return null;
            }

            return {
              tokenId: Number(tokenId),
              concertId,
              title: concert.title,
              date: concert.date,
              venue: concert.venue.name,
              image: concert.imgCard,
              hasEntered: false,
              purchaseDate: new Date(Number(timestamp) * 1000),
              seatType: seatType,
            };
          })
        );

        const validTickets = userTickets.filter(Boolean);
        console.log("Final processed tickets:", validTickets);
        setTickets(validTickets);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching tickets:", error);
        setIsLoading(false);
      }
    };

    fetchTickets();
  }, [address]);

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

  const upcomingTickets = tickets.filter((ticket) => !ticket.hasEntered);
  const pastTickets = tickets.filter((ticket) => ticket.hasEntered);

  return (
    <div className="container mx-auto px-4 py-8">
      <ProfileHeader
        ticketCount={tickets.length}
        attendedCount={pastTickets.length}
        address={address?.address}
      />

      <Tabs aria-label="Ticket Options" className="mb-8" color="primary">
        <Tab key="all" title={`All Tickets (${tickets.length})`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tickets.map((ticket) => (
              <TicketCard key={ticket.tokenId} ticket={ticket} />
            ))}
          </div>
        </Tab>
        <Tab
          key="upcoming"
          title={`Upcoming Events (${upcomingTickets.length})`}
        >
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
            You haven&apos;t purchased any tickets yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
