import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";
import { ConnectButton } from 'thirdweb/react';
import { client } from '../utils/client';
// import { inAppWallet } from 'thirdweb/wallets';
import { defineChain } from "thirdweb/chains";
const TicketWaveNavbar = () => {


  return (
    <Navbar
      isBordered
      maxWidth="full"
      className="bg-[#1d2951] h-[90px] px-4 flex items-center"
    >
      <NavbarContent justify="start" className="gap-4 sm:gap-12 h-full items-center">
        <NavbarBrand>
          <p className="font-serif font-bold text-inherit text-xl sm:text-3xl text-white">TicketWave</p>
        </NavbarBrand>

        <NavbarContent className="font-serif hidden sm:flex gap-10 h-full items-center">
          <NavbarItem>
            <Link href="/" color="foreground" className="text-white text-2xl">
              HOME
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/events" color="foreground" className="text-white text-2xl">
              EVENTS
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/marketplace" color="foreground" className="text-white text-2xl">
              MARKETPLACE
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/contact" color="foreground" className="text-white text-2xl">
              CONTACT US
            </Link>
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>

      <NavbarContent justify="end" className="gap-2 sm:gap-10 h-full items-center">
        <NavbarItem className="scale-90 sm:scale-100">
          <ConnectButton client={client}
            accountAbstraction={{
              chain: defineChain(11155420),
              sponsorGas: true,
              hidePrivateKeyOption: true
            }}
          />
        </NavbarItem>
        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="#f8f4f4"
                name="User"
                size="sm"
                src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="portfolio" onPress={() => window.location.href = "/portfolio"}>Portfolio</DropdownItem>
              <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default TicketWaveNavbar;