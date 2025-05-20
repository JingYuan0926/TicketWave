import { NextUIProvider } from "@nextui-org/react";
import { ThirdwebProvider } from "thirdweb/react";
import { IDKitProvider } from "@worldcoin/idkit";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import "../styles/globals.css";
import "../styles/fonts.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isLandingPage = router.pathname === "/landingpage" || router.pathname === "/landingpage2";

  return (
    <ThirdwebProvider clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}>
      <NextUIProvider>
        <Head>
          <title>TicketWave</title>
          <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎟️</text></svg>" />
        </Head>
        <div className="min-h-screen flex flex-col overflow-x-hidden">
          {!isLandingPage && <Navbar />}
          <main className="flex-1">
            <Component {...pageProps} />
          </main>
          {!isLandingPage && <Footer />}
        </div>
      </NextUIProvider>
    </ThirdwebProvider>
  );
}
