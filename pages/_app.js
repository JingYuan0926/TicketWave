import React, { useEffect } from "react";
import "../styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ThirdwebProvider } from "thirdweb/react";
import Head from 'next/head';
import InstallPWA from '../components/InstallPWA';

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider 
      cacheProvider={{
        type: "localStorage"
      }}
    >
      <Head>
        <title>TicketWave</title>
        <meta name="description" content="TicketWave" />
        <link rel="icon" href="/ticketwave.png" sizes="192x192" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="TicketWave" />
      </Head>
      <NextUIProvider>
        <div className="min-h-screen flex flex-col overflow-x-hidden">
          <Navbar />
          <main className="flex-1">
            <Component {...pageProps} />
          </main>
          <Footer />
          <InstallPWA />
        </div>
      </NextUIProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;