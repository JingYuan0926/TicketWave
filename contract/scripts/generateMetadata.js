// Import necessary hardhat components
const { ethers } = require("hardhat");
const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

// Directory to save metadata files
const metadataDir = path.join(__dirname, '../metadata');

// Ensure the metadata directory exists
if (!fs.existsSync(metadataDir)){
    fs.mkdirSync(metadataDir);
}

// Generate QR code as a data URL
async function generateQRCode(data) {
    try {
        return await QRCode.toDataURL(data);
    } catch (err) {
        console.error('Error generating QR code:', err);
        throw err;
    }
}

// Create metadata for a ticket
async function createMetadata(ticketId, eventData) {
    const qrCodeData = `Ticket ID: ${ticketId}, Event: ${eventData}`;
    const qrCodeImage = await generateQRCode(qrCodeData);

    const metadata = {
        name: `Ticket #${ticketId}`,
        description: `Access to ${eventData}`,
        image: qrCodeImage // This is a data URL
    };

    const metadataFilePath = path.join(metadataDir, `ticket-${ticketId}.json`);
    fs.writeFileSync(metadataFilePath, JSON.stringify(metadata, null, 2));
    console.log(`Metadata for Ticket #${ticketId} created at: ${metadataFilePath}`);

    return metadataFilePath;
}

// Main function to run the script
async function main() {
    // Example ticket data, you would replace this with real data
    const ticketId = 1; // This would be dynamically set in a real scenario
    const eventData = 'Event XYZ on 25-12-2023';

    // Create metadata for the ticket
    await createMetadata(ticketId, eventData);
}

async function generateQRCode(data, ticketId) {
    try {
        // Define the path for the QR code image
        const qrCodeImagePath = path.join(metadataDir, `qr-${ticketId}.png`);

        // Generate the QR code and save it as an image file
        await QRCode.toFile(qrCodeImagePath, data);
        
        console.log(`QR Code for Ticket #${ticketId} saved at: ${qrCodeImagePath}`);
        return qrCodeImagePath;
    } catch (err) {
        console.error('Error generating QR code:', err);
        throw err;
    }
}

// Run the script and catch any errors
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
