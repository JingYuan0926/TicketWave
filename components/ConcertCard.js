import React from 'react';
import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";

const eventData = [
    {
        title: "Twice Ready To Be ",
        img: "/concertCard/twice.png",
        date: "6/8/2024"
    },
    {
        title: "Twice Ready To Be Special",
        img: "https://tokytunes.com/wp-content/uploads/2024/06/TWICEs-two-day-concert-at-Nissan-Stadium-will-be-broadcast-live.jpg",
        date: "20/10/2024"
    },
];

const UpcomingEvents = () => {
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ml-5 ">
                {eventData.map((event, index) => (
                    <Card shadow="sm" key={index} isPressable onPress={() => console.log("event pressed")}>
                        <CardBody className="p-0">
                            <Image
                                shadow="sm"
                                radius="lg"
                                width="100%"
                                alt={event.title}
                                className="w-full object-cover h-[250px] object-top"
                                src={event.img}
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