import React from "react";
import "../styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ThirdwebProvider } from "thirdweb/react";
function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider>
      <NextUIProvider>
        <div className="min-h-screen flex flex-col overflow-x-hidden">
          <Navbar />
          <main className="flex-1">
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
      </NextUIProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;