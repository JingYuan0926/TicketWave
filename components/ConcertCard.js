import React from 'react';
import { useRouter } from 'next/router';
import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import concertData from '../data/data.json';

const UpcomingEvents = ({ concertIds }) => {
    const router = useRouter();
    const eventData = concertIds && !concertIds.includes(-1)
        ? concertData.concerts.filter(concert => concertIds.includes(concert.id))
        : concertData.concerts;

    const handleEventClick = (eventId) => {
        router.push(`/details/${eventId}`);
    };

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
                    <Card 
                        shadow="sm" 
                        key={event.id} 
                        isPressable 
                        onPress={() => handleEventClick(event.id)}
                        className="hover:scale-105 transition-transform duration-200"
                    >
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
                            <p className="text-default-500">{event.date} at {event.time}</p>
                            <p className="text-default-500 text-small">{event.venue.name}</p>
                            <div className="mt-2">
                                <span className="text-default-600 font-semibold">
                                    From ${Math.min(...Object.values(event.price))}
                                </span>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default UpcomingEvents;