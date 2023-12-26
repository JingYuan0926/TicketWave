
// SegmentedProgressBar.tsx
import React, { useRef, useState } from 'react';
import { Typography, Button, Box } from '@mui/material';
import './Progressbar.css';
import { ethers } from 'ethers';
import { ABI, contractAddress } from './DeclarationFile/constant';
import { useNavigate } from 'react-router-dom';


interface SegmentedProgressBarProps {
    segmentCount: number;
    value: number;
    max: number;
}


const SegmentedProgressBar: React.FC<SegmentedProgressBarProps> = ({ segmentCount }) => {

    const buttonRef = useRef<HTMLButtonElement>(null);
    const [userAddress, setUserAddress] = React.useState('');
    const [ticketsSold, setTicketsSold] = React.useState(0);
    const [maxSupply, setMaxSupply] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(true);
    const [isBNPL, setIsBNPL] = React.useState(false);
    const [paying, isPaying] = React.useState(false);
    const [buyBefore, BuyBefore] = React.useState(false);
    const [progressBar, setProgressBar] = useState<number>(0);


    const navigate = useNavigate();

    React.useEffect(() => {
        if (userAddress) {
            fetchContractData();
        }
        if (buttonRef.current) {
            buttonRef.current.click();
        }
    }, [userAddress]);

    let showAddress = userAddress.slice(0, 15) + '...';

    const ticketLeft = maxSupply - ticketsSold;

    const fetchContractData = async () => {

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, ABI, provider);

        try {

            const tokenCounter = await contract.tokenCounter();
            const maxSupplyFromContract = await contract.maxSupply();

            setTicketsSold(tokenCounter.toNumber());
            setMaxSupply(maxSupplyFromContract.toNumber());
            setIsLoading(false);

            const ticketIds = await contract.getUserTickets(userAddress);

            for (let i = 0; i < ticketIds.length; i++) {
                let ticketId = ticketIds[i];

                const paymentPlan = await contract.paymentPlans(ticketId);
                console.log('Payment plan for ticket ' + ticketId + ':', paymentPlan);

                let per = Number((paymentPlan.monthsPaid) / 4 * 100);
                setProgressBar(per);
                // Assertions to verify BNPL details

            }
        }
        catch (error) {
            console.error("Error fetching contract data:", error);
        }
    };


    const connectWallet = async () => {
        const ethereum = (window as any).ethereum;
        if (ethereum) {
            try {
                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                setUserAddress(accounts[0]);

            } catch (error) {
                console.error(error);
            }
        } else {
            alert('MetaMask is not installed. Please install it to use this app.');
        }
    };

    const makeMonthlyPayment = async () => {
        if (!window.ethereum) {
            return alert('Please install MetaMask.');
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, ABI, signer);

        isPaying(true);

        try {
            // Fetch the user's ticket IDs
            const ticketIds = await contract.getUserTickets(userAddress);
            console.log('Ticket IDs:', ticketIds);

            let totalPaymentRequired = ethers.BigNumber.from(0);

            for (let i = 0; i < ticketIds.length; i++) {
                const paymentPlan = await contract.paymentPlans(ticketIds[i]);
                totalPaymentRequired = totalPaymentRequired.add(paymentPlan.monthlyPayment);
            }

            const transaction = await contract.makeBatchMonthlyPayments(ticketIds, {
                value: totalPaymentRequired
            });
            await transaction.wait();
            console.log('Batch monthly payments successful');

            // Recheck the payment status after the transaction
            let allPaymentsCompleted = true;
            for (let i = 0; i < ticketIds.length; i++) {
                const paymentPlan = await contract.paymentPlans(ticketIds[i]);

                if (paymentPlan.monthsPaid != 4) {
                    allPaymentsCompleted = false;
                    break; // Break the loop as soon as one incomplete payment is found
                }
            }

            isPaying(false);


            if (allPaymentsCompleted) {
                // Navigate to the success page if all payments are completed
                navigate('/paymentsuccess');
            } else {
                // Fetch contract data again if there are remaining payments
                fetchContractData();
            }
        } catch (error) {
            console.error('Error during batch monthly payments:', error);
            alert('Transaction failed or there was an error.');
        }


    }





    return (
        <>
            {/* Image and info about the concert */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <img src="card_image/twice.png" alt="Twice" style={{ width: 'auto', height: '270px', marginRight: '20px' }} />
                <Typography variant="h6" style={{ flexGrow: 1, fontFamily: 'Georgia, serif' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '20px' }}>TWICE 5TH WORLD TOUR 'READY TO BE' <br></br>IN SINGAPORE</span>
                    <br /><br /><br /><br />
                    <span style={{ fontSize: '16px' }}>SATURDAY, 02 SEPTEMBER 2023</span><br />
                    <span style={{ fontSize: '16px' }}>Singapore Indoor Stadium</span><br />


                    {isLoading ? (
                        <span style={{ fontSize: '16px' }}>
                            <strong>Connect Wallet to View Ticket Progress</strong>
                        </span>
                    ) : (
                        <span style={{ fontSize: '16px' }}>
                            <strong> Total Ticket Issued: {maxSupply}</strong><br />
                            <strong> Total Ticket Left: {ticketLeft}</strong>
                        </span>
                    )}
                    <br />

                </Typography>
            </div>

            {/* Progress text */}
            <Typography variant="h6" gutterBottom style={{ marginTop: '40px', marginBottom: '20px', textAlign: 'left' }}>
                <span style={{ textDecoration: 'underline', fontWeight: 'bold', fontFamily: 'Georgia, serif', fontSize: '16px' }}>Buy Now Pay Later Progress</span>
            </Typography>

            {/* Container for labels and progress bar */}
            <div style={{ width: '100%' }}>
                {/* Monthly labels for each segment */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    {[...Array(segmentCount)].map((_, index) => (
                        <Typography key={index} variant="caption" style={{ fontFamily: 'Georgia, serif', fontSize: '12px', width: `${100 / segmentCount}%`, textAlign: 'center' }}>

                            {`${index + 1}st payment`}

                        </Typography>
                    ))}
                </div>

                {/* Segmented progress bar */}
                <div className="segmented-progress-bar">
                    {[...Array(segmentCount)].map((_, index) => (
                        <div key={index} className="segment" style={{ width: `${100 / segmentCount}%` }}>
                            {index === 2 && <div className="divider"></div>} {/* Add divider before the 3rd segment */}
                            <div

                                className={`fill ${progressBar > (100 / segmentCount) * index ? 'filled' : ''}`}
                                style={{ backgroundColor: progressBar > (100 / segmentCount) * index ? '#E3165B' : '#F8C7D8' }}

                            />
                        </div>
                    ))}
                </div>


                {/* buttons below progress bar */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '50px' }}>
                    {/* buttons for wallet and pay */}
                    <Button
                        variant="outlined"
                        style={{
                            fontSize: '14px'
                            // No need for marginLeft or marginRight since justifyContent: 'space-between' will take care of the spacing
                        }}
                        ref={buttonRef}
                        onClick={connectWallet}
                        disabled={!isLoading}
                    >
                        {isLoading ? 'Connect Wallet' : showAddress}
                    </Button>

                    {/* Right button */}
                    <Button
                        variant="outlined"
                        style={{ fontSize: '14px' }}
                        onClick={makeMonthlyPayment}
                        disabled={isLoading || paying}
                    >
                        {isLoading ? 'Connect Wallet First' : paying ? 'Payment in Progress...' : 'Pay Now'}
                    </Button>
                </Box>


            </div>
        </>
    );
};

export default SegmentedProgressBar;
