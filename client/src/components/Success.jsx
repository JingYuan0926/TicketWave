import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useEffect } from "react";
import confetti from 'canvas-confetti';

const Success = () => {

  useEffect(() => {
    // Trigger confetti on component mount
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);


  return (

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "200px",
        paddingBottom: "120px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: "50px",
          width: "70%",
          borderRadius: "20px",
          backgroundColor: "white",
        }}
      >
        <CheckCircleIcon
          style={{
            color: "#4CAF50",
            fontSize: 60,
            marginBottom: "20px",
          }}
        />

        <Typography
          variant="h4"
          style={{
            fontSize: "30px",
            fontWeight: "bold",
            marginBottom: "40px",
            fontFamily: "Georgia, serif",
          }}
        >
          Payment Successful!
        </Typography>
        <p
          style={{
            fontSize: "15px",
            fontWeight: "semibold",
            marginBottom: "20px",
            fontFamily: "Georgia, serif",
          }}
        >
          You have successfully purchased the NFT ticket for the event/concert!
        </p>
        <p
          style={{
            fontSize: "15px",
            color: "#718096",
            marginBottom: "90px",
            fontFamily: "Georgia, serif",
          }}
        >
          The NFT has added into your Wallet.
        </p>
        

        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px" // Adjust this value for the desired separation between buttons
        }}>
          <Link to="/homepage">
            <Button
              style={{
                fontSize: "13px",
                padding: "6px 20px",
                border: "2px solid #2C5282",
                backgroundColor: "white",
                color: "#2C5282",
                fontWeight: "semibold",
                transition: "background-color 0.3s, color 0.3s",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#2C5282";
                e.target.style.color = "white";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "white";
                e.target.style.color = "#2C5282";
              }}
            >
              Back to homepage
            </Button>
          </Link>
          <Link to="/ticket">
            <Button
              style={{
                fontSize: "13px",
                padding: "6px 20px",
                border: "2px solid #2C5282",
                backgroundColor: "white",
                color: "#2C5282",
                fontWeight: "semibold",
                transition: "background-color 0.3s, color 0.3s",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#2C5282";
                e.target.style.color = "white";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "white";
                e.target.style.color = "#2C5282";
              }}
            >
              Check the Ticket.
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
