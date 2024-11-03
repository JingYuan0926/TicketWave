import React from 'react';
import { Card, CardBody, CardFooter, Image, Chip } from "@nextui-org/react";

const TicketCard = ({ ticket }) => {
    return (
        <Card shadow="sm" className="hover:scale-105 transition-transform duration-200">
            <CardBody className="p-0">
                <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt={ticket.title}
                    className="w-full object-cover h-[250px] object-top"
                    src={ticket.image}
                />
                {ticket.hasEntered && (
                    <div className="absolute top-2 right-2">
                        <Chip color="success" variant="solid">Attended</Chip>
                    </div>
                )}
            </CardBody>
            <CardFooter className="flex-col items-start">
                <h4 className="font-bold text-large">{ticket.title}</h4>
                <p className="text-default-500">{ticket.date}</p>
                <p className="text-default-500 text-small">{ticket.venue}</p>
                <div className="mt-2">
                    <Chip color="primary" variant="flat">Ticket#{ticket.tokenId}</Chip>
                </div>
            </CardFooter>
        </Card>
    );
};

export default TicketCard;