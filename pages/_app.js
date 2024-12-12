import { NextUIProvider } from "@nextui-org/react";
import { ThirdwebProvider } from "thirdweb/react";
import { IDKitProvider } from "@worldcoin/idkit";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isLandingPage = router.pathname === "/landingpage";

  return (
    <ThirdwebProvider clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}>
      <NextUIProvider>
        <div className="min-h-screen flex flex-col overflow-x-hidden">
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
