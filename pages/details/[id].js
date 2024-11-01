import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Card, CardBody, Image, Button, Chip, Divider } from "@nextui-org/react";
import { IoCalendarOutline, IoLocationOutline, IoTimeOutline, IoPeopleOutline } from "react-icons/io5";
import concertData from '../../data/data.json';
import { prepareContractCall } from "thirdweb"
import { useSendTransaction } from "thirdweb/react";
import { contract } from "../../utils/client";
import { useActiveAccount } from "thirdweb/react";

const DetailsPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const wallet = useActiveAccount();
    const [selectedTicketType, setSelectedTicketType] = useState(null);
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [concert, setConcert] = useState(null);
    const { mutate: sendTransaction } = useSendTransaction();


    useEffect(() => {
        if (id) {
            const foundConcert = concertData.concerts.find(c => c.id === Number(id));
            setConcert(foundConcert);
        }
    }, [id]);

    if (!concert) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
    );

    const handleBuyTickets = async () => {
        if (!selectedTicketType || !id) return; // Add id check
        
        try {
            const transaction = prepareContractCall({
                contract,
                method: "function purchaseTickets(uint256 concertId, uint256 quantity) payable",
                params: [Number(id), 1]
              });
    
              sendTransaction(transaction);
    
        } catch (error) {
            console.error("Transaction preparation failed:", error);
            // Add error handling here
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="relative h-[550px] w-full overflow-hidden">
                {/* Blurred background cover image */}
                <div
                    className="absolute inset-0 bg-cover bg-center filter blur-xl scale-110 brightness-50"
                    style={{ backgroundImage: `url(${concert.imgCover})` }}
                />

                {/* Concert info and image container */}
                <div className="absolute inset-0 container mx-auto flex items-center px-8 -translate-y-12">
                    {/* Image on the left, positioned slightly higher */}
                    <div className="relative w-[300px] h-[300px] transform -translate-y-8 transition-transform ">
                        <Image
                            src={concert.imgCard}
                            alt={concert.title}
                            className="object-contain rounded-xl shadow-2xl"
                            fill
                            sizes="300px"
                            priority
                        />
                    </div>

                    {/* Text content with more spacing */}
                    <div className="flex-1 ml-12 max-w-[60%]">
                        <h1 className="text-6xl font-bold text-white mb-6">{concert.title}</h1>
                        <div className="flex flex-wrap gap-6 text-white text-lg">
                            <div className="flex items-center gap-3">
                                <IoCalendarOutline className="text-2xl" />
                                <span>{concert.date}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <IoTimeOutline className="text-2xl" />
                                <span>{concert.time}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <IoLocationOutline className="text-2xl" />
                                <span>{concert.venue.name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <IoPeopleOutline className="text-2xl" />
                                <span>Capacity: {concert.venue.capacity.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Gradient overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Event Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Event Description */}
                        <Card>
                            <CardBody className="space-y-4">
                                <h2 className="text-2xl font-bold">Event Details</h2>
                                <p className="text-default-700 leading-relaxed">
                                    {concert.description}
                                </p>

                                <Divider />

                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold">Venue Information</h3>
                                    <div className="space-y-2">
                                        <p className="flex items-center gap-2">
                                            <span className="font-semibold">Location:</span>
                                            <span>{concert.venue.name}</span>
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <span className="font-semibold">Address:</span>
                                            <span>{concert.venue.address}</span>
                                        </p>
                                    </div>
                                </div>

                                <Divider />

                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold">Featured Artists</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {concert.artists.map((artist) => (
                                            <Chip
                                                key={artist}
                                                color="primary"
                                                variant="flat"
                                                className="text-sm"
                                            >
                                                {artist}
                                            </Chip>
                                        ))}
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        {/* Additional Information */}
                        <Card>
                            <CardBody>
                                <h3 className="text-xl font-semibold mb-4">Additional Information</h3>
                                <p className="text-default-600">
                                    {concert.additionalInfo}
                                </p>
                            </CardBody>
                        </Card>
                    </div>

                    {/* Right Column - Ticket Selection */}
                    <div className="space-y-6">
                        <Card className="sticky top-4">
                            <CardBody className="space-y-6">
                                <h2 className="text-2xl font-bold">Select Tickets</h2>

                                {/* Ticket Types */}
                                <div className="space-y-4">
                                    {Object.entries(concert.price).map(([type, price]) => (
                                        <div
                                            key={type}
                                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedTicketType === type
                                                ? 'border-primary bg-primary/10'
                                                : 'border-default-200 hover:border-primary'
                                                }`}
                                            onClick={() => setSelectedTicketType(type)}
                                        >
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h3 className="font-semibold capitalize">{type}</h3>
                                                    <p className="text-small text-default-500">Limited to 1 ticket per person</p>
                                                </div>
                                                <p className="font-bold text-large">
                                                    ${price.toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Total Price */}
                                {selectedTicketType && (
                                    <div className="flex justify-between items-center py-2">
                                        <span className="font-semibold">Total:</span>
                                        <span className="font-bold text-xl">
                                            ${concert.price[selectedTicketType].toFixed(2)}
                                        </span>
                                    </div>
                                )}

                                {/* Buy Button */}
                                <Button
                                    color="primary"
                                    size="lg"
                                    className="w-full"
                                    disabled={!selectedTicketType}
                                    onClick={handleBuyTickets}
                                >
                                    {selectedTicketType ? 'Buy Ticket' : 'Select a Ticket Type'}
                                </Button>

                                {/* Terms */}
                                <p className="text-tiny text-default-500 text-center">
                                    By purchasing tickets, you agree to our Terms of Service
                                </p>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsPage;