import React from "react";
import "../styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ThirdwebProvider } from "thirdweb/react";
import { useRouter } from "next/router"; // Import useRouter hook

function MyApp({ Component, pageProps }) {
  const router = useRouter(); // Get the current route

  // Check if the current page is the landing page (you can change this if your landing page has a different route)
  const isLandingPage = router.pathname === "/landingpage";

  return (
    <ThirdwebProvider>
      <NextUIProvider>
        <div className="min-h-screen flex flex-col overflow-x-hidden">
          {/* Only render Navbar if the current page is not the landing page */}
          {!isLandingPage && <Navbar />}
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
