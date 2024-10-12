import React from "react";
import "../styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <div className="app-container">
        <Navbar />
        <main>
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </NextUIProvider>
  );
}

export default MyApp;