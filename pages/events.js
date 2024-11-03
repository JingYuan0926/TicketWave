import React, { useState } from 'react';
import { Card, CardBody, Image, Button, Pagination } from "@nextui-org/react";
import concertData from '../data/data.json';

const EventsPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(concertData.concerts.length / itemsPerPage);

    const currentConcerts = concertData.concerts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>
            <div className="space-y-6">
                {currentConcerts.map((concert) => (
                    <Card key={concert.id} className="w-full mb-4 overflow-hidden">
                        <CardBody className="p-0 flex flex-col sm:flex-row">
                            <div className="w-full sm:w-[200px] h-[235px] flex-shrink-0 overflow-hidden flex items-center justify-center">
                                <Image
                                    src={concert.imgCard}
                                    alt={concert.title}
                                    classNames={{
                                        wrapper: "w-full h-full",
                                        img: "object-cover object-center w-full h-full"
                                    }}
                                    removeWrapper
                                />
                            </div>
                            <div className="flex-grow p-4 flex flex-col justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold">{concert.title}</h2>
                                    <p className="text-default-500 mt-1">{concert.location}</p>
                                    <p className="text-default-500 mt-1">{concert.date}</p>
                                    <p className="mt-2 line-clamp-3">{concert.description}</p>
                                </div>
                                <div className="mt-4">
                                    <Button color="primary">Book Tickets</Button>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>
            <div className="flex justify-center mt-8">
                <Pagination
                    total={totalPages}
                    initialPage={1}
                    page={currentPage}
                    onChange={setCurrentPage}
                    showControls 
                />
            </div>
        </div>
    );
};

export default EventsPage;