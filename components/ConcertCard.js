import React from 'react';
import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import concertData from '../data/data.json';

const UpcomingEvents = ({ concertIds }) => {
    const eventData = concertIds && !concertIds.includes(-1)
        ? concertData.concerts.filter(concert => concertIds.includes(concert.id))
        : concertData.concerts;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Upcoming Events</h2>
                <div className="flex gap-4">
                    <Button color="default" variant="flat">
                        Concerts
                    </Button>
                    <Button color="default" variant="flat">
                        Sports
                    </Button>
                    <Button color="default" variant="flat">
                        Festivals
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ml-5">
                {eventData.map((event) => (
                    <Card shadow="sm" key={event.id} isPressable onPress={() => console.log("event pressed")}>
                        <CardBody className="p-0">
                            <Image
                                shadow="sm"
                                radius="lg"
                                width="100%"
                                alt={event.title}
                                className="w-full object-cover h-[250px] object-top"
                                src={event.imgCard}
                            />
                        </CardBody>
                        <CardFooter className="flex-col items-start">
                            <h4 className="font-bold text-large">{event.title}</h4>
                            <p className="text-default-500">Date: {event.date}</p>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default UpcomingEvents;