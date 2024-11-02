import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Card, CardBody, Image, Button, Chip, Divider, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { IoCalendarOutline, IoLocationOutline, IoTimeOutline, IoPeopleOutline } from "react-icons/io5";
import concertData from '../../data/data.json';
import { prepareContractCall } from "thirdweb";
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
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [transactionStatus, setTransactionStatus] = useState('pending');

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
        if (!selectedTicketType || !id || !concert) return;
        onOpen();
    };

    const confirmPurchase = async () => {
        try {
            setTransactionStatus('pending'); // Set to pending state
            const transaction = prepareContractCall({
                contract,
                method: "function purchaseTicket(uint256 concertId, string imageURI)",
                params: [Number(id), concert.imgCard]
            });
    
            console.log("Transaction submitted, awaiting confirmation...");
    
            await sendTransaction(transaction, {
                onSubmitted: () => {
                    console.log("Transaction is now submitted.");
                    setTransactionStatus('loading'); // Show loading while waiting for confirmation
                },
                onSuccess: () => {
                    console.log("Transaction confirmed successfully.");
                    setTransactionStatus('success'); // Show success once confirmed
                },
                onError: () => {
                    console.log("Transaction failed.");
                    setTransactionStatus('error'); // Show error if transaction fails
                }
            });
        } catch (error) {
            console.error("Transaction failed:", error);
            setTransactionStatus('error');
        }
    };
    
    
    

    const handleModalClose = () => {
        onClose();
        setTransactionStatus('pending');
    };

    return (
        <>
            <div className="min-h-screen bg-background">
                <div className="relative h-[550px] w-full overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center filter blur-xl scale-110 brightness-50"
                        style={{ backgroundImage: `url(${concert.imgCover})` }}
                    />
                    <div className="absolute inset-0 container mx-auto flex items-center px-8 -translate-y-12">
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
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
                </div>

                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
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

                            <Card>
                                <CardBody>
                                    <h3 className="text-xl font-semibold mb-4">Additional Information</h3>
                                    <p className="text-default-600">
                                        {concert.additionalInfo}
                                    </p>
                                </CardBody>
                            </Card>
                        </div>

                        <div className="space-y-6">
                            <Card className="sticky top-4">
                                <CardBody className="space-y-6">
                                    <h2 className="text-2xl font-bold">Select Tickets</h2>
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

                                    {selectedTicketType && (
                                        <div className="flex justify-between items-center py-2">
                                            <span className="font-semibold">Total:</span>
                                            <span className="font-bold text-xl">
                                                ${concert.price[selectedTicketType].toFixed(2)}
                                            </span>
                                        </div>
                                    )}

                                    <Button
                                        color="primary"
                                        size="lg"
                                        className="w-full"
                                        disabled={!selectedTicketType}
                                        onClick={handleBuyTickets}
                                    >
                                        {selectedTicketType ? 'Buy Ticket' : 'Select a Ticket Type'}
                                    </Button>

                                    <p className="text-tiny text-default-500 text-center">
                                        By purchasing tickets, you agree to our Terms of Service
                                    </p>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpen={isOpen} onClose={handleModalClose}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                {transactionStatus === 'pending' ? 'Confirm Purchase' : 
                                 transactionStatus === 'success' ? 'Purchase Successful!' : 
                                 'Purchase Failed'}
                            </ModalHeader>
                            <ModalBody>
                                {transactionStatus === 'pending' && (
                                    <>
                                        <p>You are about to purchase:</p>
                                        <div className="p-4 bg-default-100 rounded-lg">
                                            <p className="font-semibold">{concert.title}</p>
                                            <p>Ticket Type: {selectedTicketType}</p>
                                            <p>Price: ${concert.price[selectedTicketType].toFixed(2)}</p>
                                        </div>
                                    </>
                                )}
                                {transactionStatus === 'success' && (
                                    <div className="text-center">
                                        <div className="text-success text-xl mb-4">🎉</div>
                                        <p>Your ticket has been purchased successfully!</p>
                                        <p className="text-small text-default-500 mt-2">
                                            You can view your ticket in your wallet
                                        </p>
                                    </div>
                                )}
                                {transactionStatus === 'error' && (
                                    <div className="text-center text-danger">
                                        <p>Something went wrong with your purchase.</p>
                                        <p className="text-small mt-2">Please try again later.</p>
                                    </div>
                                )}
                            </ModalBody>
                            <ModalFooter>
                                {transactionStatus === 'pending' && (
                                    <>
                                        <Button color="danger" variant="light" onPress={onClose}>
                                            Cancel
                                        </Button>
                                        <Button color="primary" onPress={confirmPurchase}>
                                            Confirm Purchase
                                        </Button>
                                    </>
                                )}
                                {(transactionStatus === 'success' || transactionStatus === 'error') && (
                                    <Button color="primary" onPress={onClose}>
                                        Close
                                    </Button>
                                )}
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default DetailsPage;