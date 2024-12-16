// pages/verify.js
import React, { useState, useEffect } from "react";
import { Spinner, Button } from "@nextui-org/react";
import { useSendTransaction } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import { contract } from "../utils/client"; // Adjust this path based on your setup
import { useReadContract } from "thirdweb/react";
import dynamic from "next/dynamic";

// Correctly import the QR Reader with proper configuration
const QrReader = dynamic(() => import("react-qr-reader-es6"), {
  ssr: false,
  loading: () => <p>Loading QR Scanner...</p>,
});

const Verify = () => {
  const [tokenId, setTokenId] = useState(null);
  const [entryStatus, setEntryStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const { mutate: sendTransaction } = useSendTransaction();
  const [showSuccess, setShowSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const { data: ticketData, isPending } = useReadContract({
    contract,
    method:
      "function getTicketDetails(uint256 tokenId) view returns (uint256 concertId, bool hasEntered, uint256 purchaseDate, string tokenURI, address ticketOwner)",
    params: tokenId ? [tokenId] : [],
  });

  useEffect(() => {
    if (!isPending && ticketData && tokenId) {
      const [, hasEntered] = ticketData;
      setEntryStatus(hasEntered ? "alreadyEntered" : "canEnter");
    } else if (!ticketData && tokenId && !isPending) {
      setEntryStatus("error");
    }
  }, [ticketData, isPending, tokenId]);

  const handleScan = (data) => {
    if (data) {
      try {
        // Extract tokenId from the scanned data
        const tokenIdMatch = data.match(/tokenId=(\d+)/);
        if (tokenIdMatch && tokenIdMatch[1]) {
          setTokenId(tokenIdMatch[1]);
        }
      } catch (error) {
        console.error("Error parsing QR code data:", error);
      }
    }
  };

  const handleError = (error) => {
    console.error("QR Code Scan Error:", error);
  };

  const handleEntryConfirmation = async () => {
    if (!tokenId) return;
    setIsProcessing(true);

    try {
      const transaction = prepareContractCall({
        contract,
        method: "function scanTicketForEntry(uint256 tokenId)",
        params: [tokenId],
      });

      sendTransaction(transaction, {
        onSuccess: () => {
          console.log("Ticket marked as entered successfully.");
          setShowSuccess(true);
          setEntryStatus("alreadyEntered");
          setIsProcessing(false);
        },
        onError: (error) => {
          console.error("Error confirming entry:", error);
          setEntryStatus("error");
          setIsProcessing(false);
        },
      });
    } catch (error) {
      console.error("Transaction failed:", error);
      setEntryStatus("error");
      setIsProcessing(false);
    }
  };

  const handleStartScan = () => {
    setShowScanner(true);
  };

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Ticket Verification</h1>
      {loading && <Spinner size="lg" />}

      {!tokenId && !showScanner && (
        <div className="flex flex-col items-center gap-4">
          <p className="mb-4">Click below to start scanning tickets</p>
          <Button color="primary" size="lg" onClick={handleStartScan}>
            Start Scanning
          </Button>
        </div>
      )}

      {!tokenId && showScanner && (
        <>
          <p className="mb-4">Please scan your ticket QR code</p>
          <div className="flex justify-center mb-4">
            <div style={{ width: "100%", maxWidth: "400px" }}>
              <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: "100%" }}
                facingMode="environment"
              />
            </div>
          </div>
        </>
      )}

      {tokenId && entryStatus === "canEnter" && !showSuccess && (
        <>
          <p className="text-lg mb-4">Ticket #{tokenId} is valid for entry.</p>
          <Button color="success" onClick={handleEntryConfirmation}>
            Verify Entry
          </Button>
        </>
      )}

      {showSuccess && (
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Success!</h2>
          <div className="mb-4">
            <svg
              className="mx-auto w-16 h-16 text-green-500"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <p className="mb-2">The ticket has been successfully verified.</p>
          <p>Your entry has been successfully recorded.</p>
        </div>
      )}

      {tokenId && entryStatus === "alreadyEntered" && !showSuccess && (
        <p className="text-lg mb-4 text-red-500">
          Ticket #{tokenId} has already been used for entry.
        </p>
      )}

      {tokenId && entryStatus === "error" && (
        <p className="text-lg mb-4 text-red-500">
          Error: Unable to verify the ticket. Please try again.
        </p>
      )}
    </div>
  );
};

export default Verify;
