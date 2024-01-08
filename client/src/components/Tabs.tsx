import * as React from 'react';

import { useRef } from 'react';
import { Tabs, Tab, Typography, Box, TextField, Button, FormControl, RadioGroup, FormControlLabel, Radio, TableContainer, Table, TableHead, Paper, TableRow, TableCell, TableBody } from "@mui/material";
import { contractAddress, ABI } from './DeclarationFile/constant';
import { useNavigate } from 'react-router-dom';
import Papa from 'papaparse';
import TransactionFile from './TransactionHistory/TransactionFile1.csv';
import resaleTicketsData from "../resale-data.json";

const ethers = require("ethers");


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface TicketQuantities {
  [key: string]: number;
}

interface TicketPrices {
  [key: string]: number;
}

interface CustomTabPanelProps extends TabPanelProps {
  contentType: 'pricing' | 'other';
}

function CustomTabPanel(props: CustomTabPanelProps) {
  const { children, value, index, contentType, ...other } = props;
  const [ticketQuantities, setTicketQuantities] = React.useState<TicketQuantities>({
    Price: 0,
  });


  // const handleQuantityChange = (zone: string, quantity: number) => {
  //   setTicketQuantities((prevQuantities) => ({
  //     ...prevQuantities,
  //     [zone]: Math.min(quantity, 6), // Ensure the quantity does not exceed 6
  //   }));
  // };

  // const calculateTotalPrice = () => {
  //   let totalPrice = 0;
  //   Object.keys(ticketQuantities).forEach((zone) => {
  //     totalPrice += ticketQuantities[zone]*ticketPrices[zone] ;

  //   });
  //   return totalPrice;
  // };

  const [ticketQuantity, setTicketQuantity] = React.useState(0); // Single quantity state
  const ticketPrice =  0.01;// Assuming a single price for simplicity

  const handleQuantityChange = (quantity: number) => {
    setTicketQuantity(Math.min(Math.max(quantity, 0), 6)); // Ensure the quantity is between 0 and 6
  };

  const calculateTotalPrice = () => {
    return (ticketQuantity * ticketPrice).toFixed(2); // Calculate total price based on a single quantity and price
  };

  const buttonRef = useRef<HTMLButtonElement>(null);

  const [userAddress, setUserAddress] = React.useState('');
  const [ticketsSold, setTicketsSold] = React.useState(0);
  const [maxSupply, setMaxSupply] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isBNPL, setIsBNPL] = React.useState(false);
  const [paying, isPaying] = React.useState(false);
  const [buyBefore, BuyBefore] = React.useState(false);
  const [page, setPage] = React.useState(false);

  const navigate = useNavigate();

  const ticketsLeft = maxSupply - ticketsSold;

  let showAddress = userAddress.slice(0, 15) + '...';

  React.useEffect(() => {
    if (userAddress) {
      fetchContractData();
    }
    if (buttonRef.current) {
      buttonRef.current.click();
    }
  }, [userAddress]);

  const fetchContractData = async () => {

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, ABI, provider);

    try {

      const tokenCounter = await contract.tokenCounter();
      const maxSupplyFromContract = await contract.maxSupply();

      setTicketsSold(tokenCounter.toNumber());
      setMaxSupply(maxSupplyFromContract.toNumber());
      setIsLoading(false);
      const hasUserPurchased = await contract.hasPurchased(userAddress);

      if (hasUserPurchased) {

        const allTicketsFullyPaid = await contract.areAllTicketsFullyPaid(userAddress);

        if (!allTicketsFullyPaid) {

          const ticketIds = await contract.getUserTickets(userAddress);
          const ticketId = ticketIds[0];

          const paymentPlan = await contract.paymentPlans(ticketId);

          // Assertions to verify BNPL detail

          if (page == false) {
            navigate('/progress');
          }
          //navigate('progressbar')
        } else {

          navigate('/ticket')
          BuyBefore(true);
        }
      }
      // If user has not purchased, continue with the normal flow
    } catch (error) {
      alert('Ensure you are connected to Viction Testnet and have sufficient funds in your wallet at MetaMask before pressing connet wallet.');
      console.error("Error fetching contract data:", error);
    }
  };


  const connectWallet = async () => {
    const ethereum = (window as any).ethereum;
    if (ethereum) {
      try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        setUserAddress(accounts[0]);
        console.log(accounts[0]);

      } catch (error) {
        console.error(error);
      }
    } else {
      alert('MetaMask is not installed. Please install it to use this app.');
    }
  };


  const purchaseTickets = async () => {
    if (!window.ethereum) {
      return alert('Please install MetaMask.');
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI, signer);

    isPaying(true);

    try {
      const totalCost = ethers.utils.parseEther((ticketPrice * ticketQuantity).toString());
      let transaction;

      if (isBNPL) {
        transaction = await contract.purchaseTicketsWithBNPL(
          userAddress,
          "ipfs://bafkreihcaq3izfsrhgkvmrmuy6de7c2i3tjazfgq3wmh3uu226tnd2hqmy",
          //"ipfs://bafkreiawtvg43se3rq4kpioz4hlceeqomnu6ngy5t3c2rztro45s7ceb7e",
          ticketQuantity,
          { value: ethers.utils.parseEther(((ticketPrice * ticketQuantity) / 4).toString()) }

        );

      } else {
        transaction = await contract.purchaseTickets(
          userAddress,
          "ipfs://bafkreihcaq3izfsrhgkvmrmuy6de7c2i3tjazfgq3wmh3uu226tnd2hqmy",
          //"ipfs://bafkreiawtvg43se3rq4kpioz4hlceeqomnu6ngy5t3c2rztro45s7ceb7e",
          ticketQuantity,
          { value: totalCost }
        );

      }
      const startTime = Date.now();
   

      await transaction.wait(); // waiting for the transaction to be mined

      const endTime = Date.now();
     

      const transactionTime = (endTime - startTime) / 1000;
      

      setPage(true);
      isPaying(false);

      if (isBNPL) {
        navigate('/paymentsuccessbnpl');

      } else {
        navigate('/paymentsuccess');
      }
    } catch (error) {
      isPaying(false);
      console.error(error);
      alert('Transaction Cancelled or Not Enough Funds in Wallet');
    }
  };






  return (


    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {contentType === 'pricing' && (
            <div>
              {/* image and info about the concert */}
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                {/* Image on the left */}
                <img src="card_image/twice.png" alt="Twice" style={{ width: 'auto', height: '270px', marginRight: '20px' }} />
                {/* Text on the right */}
                <Typography variant="h6" style={{ flexGrow: 1, fontFamily: 'Georgia, serif' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '20px' }}>TWICE 5TH WORLD TOUR 'READY TO BE' <br></br>IN SINGAPORE</span>
                  <br /><br /><br /><br />
                  <span style={{ fontSize: '16px' }}>SATURDAY, 02 SEPTEMBER 2023</span><br />


                  <span style={{ fontSize: '16px' }}>Singapore Indoor Stadium</span><br />
                  {
                    isLoading ? (
                      <span style={{ fontSize: '16px' }}>
                        <strong>Connect Wallet First Before Showing Ticket Left</strong>
                      </span>
                    ) : ticketsLeft === 0 ? (
                      <span style={{ fontSize: '16px' }}>
                        <strong>Sold Out</strong>
                      </span>
                    ) : (
                      <>
                        <span style={{ fontSize: '16px' }}>
                          <strong>Total Ticket Issued: {maxSupply}</strong>
                        </span>
                        <br />
                        <span style={{ position: 'relative', display: 'inline-block', fontSize: '16px' }}>
                          <strong>
                            Tickets Left: {ticketsLeft}{' '}
                          </strong>
                          {ticketsLeft > 0 && (
                            <span
                              style={{
                                color: 'grey',
                                marginLeft: '5px',
                                cursor: 'help'
                              }}
                              title="Tickets may sell out fast, grab them while you can!"
                            >
                              &#x2757;
                            </span>
                          )}
                        </span>
                      </>
                    )
                  }

                </Typography>
              </div>
              <div
                style={{ marginBottom: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                {/* font for Price shown below ZONE */}
                <Typography variant="body1" style={{ fontSize: '14px' }}>{` ${ticketPrice} VIC per Ticket`}</Typography>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '3px' }}>
                  {/* Adjusted font size for - button */}
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleQuantityChange(Math.max(ticketQuantity - 1, 0))}
                    style={{ fontSize: '14px' }}
                  >
                    -
                  </Button>
                  {/* font size and border size for text field*/}
                  <TextField
                    type="text"
                    variant="outlined"
                    size="small"
                    value={ticketQuantity}
                    InputProps={{ readOnly: true, style: { fontSize: '12px', border: '1px solid #000' } }}
                    style={{ width: '36px', textAlign: 'center', margin: '0 5px' }}
                  />

                  {/* Adjusted font size for + button */}
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleQuantityChange(ticketQuantity + 1)}
                    style={{ fontSize: '14px' }}
                  >
                    +
                  </Button>
                </div>
              </div>

            </div>
          )}
          {contentType === 'other' && <div>{children}</div>}
          {contentType === 'pricing' && (
            <div>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                {/* Total price on the left */}
                <Box>
                  <Typography variant="h6" style={{ fontSize: '14px' }}>
                    {`Total: ${calculateTotalPrice()} VIC`}
                  </Typography>
                </Box>

                {/* Payment options on the right */}
                <Box sx={{ marginLeft: 'auto' }}>
                  <FormControl component="fieldset">
                    <RadioGroup
                      row
                      aria-label="payment-option"
                      name="payment-option"
                      value={isBNPL ? "bnpl" : "full"}
                      onChange={(event) => setIsBNPL(event.target.value === "bnpl")}
                    >
                      <FormControlLabel
                        value="full"
                        control={<Radio />}
                        label={<Typography style={{ fontSize: '1.3rem' }}>Full Payment</Typography>}
                      />
                      <FormControlLabel
                        value="bnpl"
                        control={<Radio />}
                        label={<Typography style={{ fontSize: '1.3rem' }}>Buy Now, Pay Later</Typography>}
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>


              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', width: '100%' }}>
                {/* Other content here */}

                {/* Left button */}
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
                  onClick={purchaseTickets}
                  disabled={isLoading || ticketsLeft === 0 || ticketQuantity === 0 || ticketQuantity > ticketsLeft || paying == true || buyBefore == true}
                >
                  {isLoading ? 'Connect Wallet First' : buyBefore == true ? 'All user can only buy ONCE' : ticketsLeft === 0 ? 'Sold Out' : ticketQuantity > ticketsLeft ? `Only ${ticketsLeft} Tickets Left` : ticketQuantity === 0 ? 'Purchase 1-6 Tickets' : paying == true ? 'Payment in Progress...' : 'Pay'}
                </Button>
              </Box>


            </div>
          )}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {

  const [value, setValue] = React.useState(0);


  type Transaction = {
    from: string;
    to: string;
    value: string;
    timestamp: string; // or number, if the timestamp is not a string
  };

  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  React.useEffect(() => {
    Papa.parse(TransactionFile, {
      header: true,
      download: true,
      complete: (result: any) => {
        setTransactions(result.data as Transaction[]);
      },
    });
  }, []);

  const truncateAddress = (address: string) => {
    return address ? `${address.substring(0, 10)}...` : '';
  };

  // Function to format the value from wei to VIC with check for undefined
  const formatValue = (value: string) => {
    return value ? (parseInt(value) / 1e18).toFixed(3) : '0.000';
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {/* tabs */}
          <Tab
            label={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', fontSize: '14px' }}>Ticket</div>}
            {...a11yProps(0)}
          />
          <Tab
            label={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', fontSize: '14px' }}>Details</div>}
            {...a11yProps(1)}
          />
          <Tab
            label={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', fontSize: '14px' }}>Policy</div>}
            {...a11yProps(2)}
          />
          <Tab
            label={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', fontSize: '14px' }}>Transaction History</div>}
            {...a11yProps(3)}
          />
          <Tab
            label={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', fontSize: '14px' }}>Resale </div>}
            {...a11yProps(4)}
          />

        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0} contentType="pricing">
      </CustomTabPanel>

      {/* Content for Details */}
      <CustomTabPanel value={value} index={1} contentType="other">
        <Typography>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: '20px' }}>
            While tickets go live for pre-sale on 7 June from 10 am to 11.59 pm, the general sale will begin on 8 June. You can buy them from the Ticketmaster website or register via Live Nation. However, note that only a limited number of passes will be available for pre-sale.
            <br /><br /><br />
            <strong>General Information:</strong>
            <br /><br />
            City: Singapore
            <br />
            Show Date (s): 02 September 2023, Saturday
            <br />
            Show Time: 8.30 pm
            <br />

            Venue Name: Singapore Indoor Stadium

            <br />
            Venue Address: 1 Stadium Drive, Singapore 397629
          </span>
        </Typography>
      </CustomTabPanel>

      {/* Content for Policy */}
      <CustomTabPanel value={value} index={2} contentType="other">
        <Typography>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: '13px' }}>
            <strong>Refund Policy</strong>
            <br /><br />
            1. The Organiser/Venue Owner reserves the right without refund or compensation to refuse admission/evict any person(s) whose conduct is disorderly or inappropriate or who poses a threat to security, or to the enjoyment of the Event by others.
            <br />
            2. Ticket holders assume all risk of injury and all responsibility for property loss, destruction or theft and release the promoters, performers, sponsors, ticket outlets, venues, and their employees from any liability thereafter.
            <br />
            3. There is no refund, exchange, upgrade, or cancellation once ticket(s) are sold.
            <br />
            4.We would like to caution members of the public against purchasing tickets from unauthorized sellers or 3rd party websites. By purchasing tickets through these non-authorized points of sale, buyers take on the risk that the validity of the tickets cannot be guaranteed, with no refunds possible.⁠
          </span>

          <span style={{ fontFamily: 'Georgia, serif', fontSize: '13px' }}>
            <br /><br />
            <strong>Admission Policy</strong>
            <br /><br />
            1. Admission to show/venue by full ticket only. Printed/electronic tickets must be produced for admission.
            <br />
            2. There will be no admission for infants in arms and children below 5 years old.
            <br />
            3. Individuals and Children aged 5 years old and above will be required to purchase a ticket for admission.
            <br />
            4. Photography and videography of any form and social media live streaming is not allowed.
            <br />
            5. No outside food and beverage are allowed into the venue.
          </span>
        </Typography>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={3} contentType="other">
        <Typography>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: '13px' }}>
            <strong>
              Click this <a href={`https://testnet.tomoscan.io/address/${contractAddress}`} target="_blank" rel="noopener noreferrer">link</a> to check all detailed transaction history on this ticket.
            </strong>
            <br />
            <strong>Only a few transaction will be shown here</strong>
          </span>
        </Typography>
        <div style={{
          maxHeight: '300px',
          overflowY: 'auto',
          minHeight: '60vh',
        }}>
          <table style={{ width: '100%', fontSize: '1.2rem' }}> {/* Increase font size */}
            <thead>
              <tr>
                <th>#</th> {/* Adding a header for index */}
                <th>From</th>
                <th>To</th>
                <th>Value (VIC)</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {transactions
                .filter(tx => tx && tx.from && tx.to && tx.value && tx.timestamp) // Filter out any transactions that are incomplete
                .slice(0, 200) // Take only the first 200 entries
                .map((tx, index) => {
                  // No need for the check here since we filtered the list already
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{truncateAddress(tx.from)}</td>
                      <td>{truncateAddress(tx.to)}</td>
                      <td>{formatValue(tx.value)}</td>
                      <td>{new Date(Number(tx.timestamp) * 1000).toLocaleString()}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4} contentType="other">
        {/* Table for Resale with Custom Styling */}
        <TableContainer component={Paper}
          style={{
            maxHeight: '470px',
            overflowY: 'auto', // Enables vertical scrolling
            overflowX: 'hidden' // Hides horizontal scrollbar
          }}>
          <Table sx={{ minWidth: 660 }} aria-label="resale tickets table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontFamily: 'Georgia, serif', fontSize: '16px' }}>Ticket</TableCell>
                <TableCell align="center" style={{ fontFamily: 'Georgia, serif', fontSize: '16px' }}>Price (VIC)</TableCell>
                <TableCell align="center" style={{ fontFamily: 'Georgia, serif', fontSize: '16px' }}>Quantity</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            {/* Content for Table */}
            <TableBody>
              {resaleTicketsData.map((ticket: { id: React.Key | null | undefined; img: string | undefined; title: string | undefined; price: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; quantity: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
                <TableRow
                  key={ticket.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  style={{ fontFamily: 'Georgia, serif', fontSize: '16px' }}
                >
                  <TableCell component="th" scope="row">
                    <img src={ticket.img} alt={ticket.title} style={{ width: 100, height: 100 }} />
                  </TableCell>
                  <TableCell align="center" sx={{ fontFamily: 'Georgia, serif', fontSize: '16px' }}>{ticket.price}</TableCell>
                  <TableCell align="center" sx={{ fontFamily: 'Georgia, serif', fontSize: '16px' }}>{ticket.quantity}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      sx={{
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: '#007bff', // Blue background on hover
                          color: '#fff', // White text on hover
                        }
                      }}
                    >
                      Buy
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CustomTabPanel>


    </Box>
  );
}