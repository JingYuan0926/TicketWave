import { Tabs, Tab, Box, Typography, Button } from "@mui/material";
import React, { useRef, useState } from 'react';
import { ABI, contractAddress } from './DeclarationFile/constant';
import { ethers } from 'ethers';
import QRCode from 'qrcode.react';
import { useNavigate } from 'react-router-dom';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

interface NFT {
    id: string;
    image: string;
    name: string;
    description: string;
    identifier: string;
    collection: string;
    contract: string;
    updated_at: string;
    opensea_url: string;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;


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
                    {children}
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

export default function TicketTabs() {
    const [value, setValue] = React.useState(0);

    const buttonRef = useRef<HTMLButtonElement>(null);
    const [userAddress, setUserAddress] = React.useState('');
    const [ticketsSold, setTicketsSold] = React.useState(0);
    const [maxSupply, setMaxSupply] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(true);
    const [gibberish, setGibberish] = useState('');
    const [show, setShow] = useState(false);
    const [nfts, setNfts] = useState<NFT[]>([]);

    const navigate = useNavigate();


    React.useEffect(() => {

        if (userAddress) {
            // fetchNFTData();
            fetchContractData();
        }

        const modulus = 91;
        const publicKey = 7;
        const numberArray = Array.from(userAddress.slice(2), char => parseInt(char, 16));
        const encryptedArray = numberArray.map(number => rsaEncrypt(number, publicKey, modulus));
        const gibberishString = encryptedArray.map(number => String.fromCharCode(number + 65)).join('');
        const englishArray = gibberishString.split('').map(char => String.fromCharCode(char.charCodeAt(0) - 65333));
        const englishString = englishArray.join('');
        setGibberish(englishString);

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
            const nftDataPromises = ticketIds.map(async (id: any) => {
                const tokenURI = await contract.tokenURI(id);
                // Convert the IPFS URI to a HTTP URL
                const httpURL = tokenURI.replace('ipfs://', 'https://').concat('.ipfs.nftstorage.link/');
                const response = await fetch(httpURL);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const metadata = await response.json();
                return {
                    ...metadata,
                    tokenId: id,  // Include the token ID in the metadata object
                };
            });

            // Wait for all metadata fetches to complete and set the NFTs state
            const nftsMetadata = await Promise.all(nftDataPromises);
            setNfts(nftsMetadata);
            console.log(nfts);
        } catch (error) {
            console.error("Error fetching contract data:", error);
        }
    };


    const connectWallet = async () => {
        const ethereum = (window as any).ethereum;

        if (ethereum) {
            try {
                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                setUserAddress(accounts[0]);
                setShow(true);
            } catch (error) {
                console.error(error);
            }
        } else {
            alert('MetaMask is not installed. Please install it to use this app.');
        }
    };


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };



    function rsaEncrypt(number: any, e: any, n: any) {
        return (Math.pow(number, e) % n);
    }

    const goBack = async () => {
        navigate('/');
    }

    function formatDate(dateString: string | number | Date) {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based in JS
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }




    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Box sx={{ flexGrow: 1 }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {/* tabs */}
                    <Tab
                        label={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', fontSize: '14px' }}>QR Code</div>}
                        {...a11yProps(0)}
                    />
                    <Tab
                        label={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', fontSize: '14px' }}>NFT</div>}
                        {...a11yProps(1)}
                    />
                </Tabs>

                {/* Tab content */}
                <Box sx={{ flexGrow: 1 }}>
                    <TabPanel value={value} index={0}>
                        <Typography>
                            <p>Here is the QR code for the ticket.</p>
                            <br /> <br />
                            <p><strong>Do not share this QR code with anyone.</strong></p>
                            <p><strong>It is also used for entry at the gate.</strong></p>
                            <br /> <br />
                        </Typography>
                        {show ? (
                            <QRCode value={gibberish} size={200} /> // Render the QR Code
                        ) : (
                            <p>Connect wallet to show QR code</p>
                        )}

                        {!show ? (
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', height: '510px' }}>
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
                                <Button variant="outlined" style={{ fontSize: '14px' }} onClick={goBack}>
                                    Main Menu
                                </Button>
                            </Box>
                        ) : (
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', height: '20.28vh' }}>
                                <Button
                                    variant="outlined"
                                    style={{ fontSize: '14px' }}
                                    onClick={connectWallet}
                                    disabled={!isLoading}
                                >
                                    {isLoading ? 'Connect Wallet' : showAddress}
                                </Button>
                                <Button variant="outlined" style={{ fontSize: '14px' }} onClick={goBack}>
                                    Main Menu
                                </Button>
                            </Box>
                        )}
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Typography component="p" variant="h6" style={{ lineHeight: '2.0', textAlign: 'left', padding: '10px', fontSize: "20px" }}>
                            <strong> Total NFTs: {nfts.length} </strong>
                        </Typography>
                        <div style={{
                            maxHeight: '250px',
                            overflowY: 'auto',
                            minHeight: '50vh',
                        }}>
                            {nfts.map((nft, index) => (
                                <div key={nft.id} style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'flex-start',
                                    border: '1px solid #ccc',
                                    padding: '16px',
                                    marginBottom: '16px',
                                }}>
                                    {/* Image container */}
                                    <div style={{ marginRight: '20px' }}>
                                        <img
                                            src={nft.image}
                                            alt={nft.name || 'No Image Available'}
                                            style={{
                                                width: '200px', // Set a fixed width for the images
                                                height: '250px'  // Keep the aspect ratio
                                            }}
                                        />
                                    </div>

                                    {/* Text container */}
                                    <div style={{ flex: '1', textAlign: 'left' }}>
                                        <Typography component="p" style={{ fontWeight: 'bold', fontSize: "24px" }}> {/* Increased font size */}
                                            NFT #{index + 1}
                                        </Typography>
                                        <Typography component="p" style={{ fontSize: "16px" }}> {/* Increased font size */}
                                            Name: {nft.name}
                                        </Typography>
                                        <Typography component="p" style={{ fontSize: "16px" }}> {/* Increased font size */}
                                            Description: {nft.description}
                                        </Typography>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </TabPanel>


                </Box>
            </Box>



        </Box>
    );
}


// import { Tabs, Tab, Box, Typography, Button } from "@mui/material";
// import React, { useRef, useState } from 'react';
// import { ABI, contractAddress } from './DeclarationFile/constant';
// import { ethers } from 'ethers';
// import QRCode from 'qrcode.react';
// import { useNavigate } from 'react-router-dom';

// interface TabPanelProps {
//     children?: React.ReactNode;
//     index: number;
//     value: number;
// }

// interface NFT {
//     id: string;
//     image_url: string;
//     name: string;
//     identifier: string;
//     collection: string;
//     contract: string;
//     updated_at: string;
//     opensea_url: string;
// }

// function TabPanel(props: TabPanelProps) {
//     const { children, value, index, ...other } = props;


//     return (
//         <div
//             role="tabpanel"
//             hidden={value !== index}
//             id={`simple-tabpanel-${index}`}
//             aria-labelledby={`simple-tab-${index}`}
//             {...other}
//         >
//             {value === index && (
//                 <Box sx={{ p: 3 }}>
//                     {children}
//                 </Box>

//             )}

//         </div>
//     );
// }

// function a11yProps(index: number) {
//     return {
//         id: `simple-tab-${index}`,
//         'aria-controls': `simple-tabpanel-${index}`,
//     };
// }

// export default function TicketTabs() {
//     const [value, setValue] = React.useState(0);

//     const buttonRef = useRef<HTMLButtonElement>(null);
//     const [userAddress, setUserAddress] = React.useState('');
//     const [ticketsSold, setTicketsSold] = React.useState(0);
//     const [maxSupply, setMaxSupply] = React.useState(0);
//     const [isLoading, setIsLoading] = React.useState(true);
//     const [gibberish, setGibberish] = useState('');
//     const [show, setShow] = useState(false);
//     const [nfts, setNfts] = useState<NFT[]>([]);

//     const navigate = useNavigate();


//     React.useEffect(() => {
//         async function fetchNFTData() {
            
//             // Here hardcode the user address only change to real one when doing eth
//             const apiURL = `https://testnets-api.opensea.io/api/v2/chain/sepolia/account/0x9787cfF89D30bB6Ae87Aaad9B3a02E77B5caA8f1/nfts`;
//             try {
//                 const response = await fetch(apiURL);
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 const data = await response.json();
//                 setNfts(data.nfts || []); // Ensure that we have an array, even if data.nfts is undefined

//             } catch (error) {
//                 console.error('Failed to fetch NFT data:', error);
//             }
//         }

//         if (userAddress) {
//             fetchNFTData();
//             fetchContractData();
//         }

//         const modulus = 91;
//         const publicKey = 7;
//         const numberArray = Array.from(userAddress.slice(2), char => parseInt(char, 16));
//         const encryptedArray = numberArray.map(number => rsaEncrypt(number, publicKey, modulus));
//         const gibberishString = encryptedArray.map(number => String.fromCharCode(number + 65)).join('');
//         const englishArray = gibberishString.split('').map(char => String.fromCharCode(char.charCodeAt(0) - 65333));
//         const englishString = englishArray.join('');
//         setGibberish(englishString);

//         if (buttonRef.current) {
//             buttonRef.current.click();
//         }
//     }, [userAddress]);

//     let showAddress = userAddress.slice(0, 15) + '...';

//     const ticketLeft = maxSupply - ticketsSold;

//     const fetchContractData = async () => {

//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         const contract = new ethers.Contract(contractAddress, ABI, provider);

//         try {

//             const tokenCounter = await contract.tokenCounter();
//             const maxSupplyFromContract = await contract.maxSupply();

//             setTicketsSold(tokenCounter.toNumber());
//             setMaxSupply(maxSupplyFromContract.toNumber());
//             setIsLoading(false);

//             const ticketIds = await contract.getUserTickets(userAddress);

//         }
//         catch (error) {
//             console.error("Error fetching contract data:", error);
//         }
//     };


//     const connectWallet = async () => {
//         const ethereum = (window as any).ethereum;

//         if (ethereum) {
//             try {
//                 const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
//                 setUserAddress(accounts[0]);
//                 setShow(true);
//             } catch (error) {
//                 console.error(error);
//             }
//         } else {
//             alert('MetaMask is not installed. Please install it to use this app.');
//         }
//     };


//     const handleChange = (event: React.SyntheticEvent, newValue: number) => {
//         setValue(newValue);
//     };



//     function rsaEncrypt(number: any, e: any, n: any) {
//         return (Math.pow(number, e) % n);
//     }

//     const goBack = async () => {
//         navigate('/');
//     }

//     function formatDate(dateString: string | number | Date) {
//         const date = new Date(dateString);
//         const day = date.getDate().toString().padStart(2, '0');
//         const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based in JS
//         const year = date.getFullYear();
//         return `${day}/${month}/${year}`;
//     }




//     return (
//         <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
//             <Box sx={{ flexGrow: 1 }}>
//                 <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
//                     {/* tabs */}
//                     <Tab
//                         label={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', fontSize: '14px' }}>QR Code</div>}
//                         {...a11yProps(0)}
//                     />
//                     <Tab
//                         label={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', fontSize: '14px' }}>NFT</div>}
//                         {...a11yProps(1)}
//                     />
//                 </Tabs>

//                 {/* Tab content */}
//                 <Box sx={{ flexGrow: 1 }}>
//                     <TabPanel value={value} index={0}>
//                         <Typography>
//                             <p>Here is the QR code for the ticket.</p>
//                             <br /> <br />
//                             <p><strong>Do not share this QR code with anyone.</strong></p>
//                             <p><strong>It is also used for entry at the gate.</strong></p>
//                             <br /> <br />
//                         </Typography>
//                         {show ? (
//                             <QRCode value={gibberish} size={200} /> // Render the QR Code
//                         ) : (
//                             <p>Connect wallet to show QR code</p>
//                         )}

//                         {!show ? (
//                             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', height: '510px' }}>
//                                 <Button
//                                     variant="outlined"
//                                     style={{
//                                         fontSize: '14px'
//                                         // No need for marginLeft or marginRight since justifyContent: 'space-between' will take care of the spacing
//                                     }}
//                                     ref={buttonRef}
//                                     onClick={connectWallet}
//                                     disabled={!isLoading}
//                                 >
//                                     {isLoading ? 'Connect Wallet' : showAddress}
//                                 </Button>
//                                 <Button variant="outlined" style={{ fontSize: '14px' }} onClick={goBack}>
//                                     Main Menu
//                                 </Button>
//                             </Box>
//                         ) : (
//                             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', height: '20.28vh' }}>
//                                 <Button
//                                     variant="outlined"
//                                     style={{ fontSize: '14px' }}
//                                     onClick={connectWallet}
//                                     disabled={!isLoading}
//                                 >
//                                     {isLoading ? 'Connect Wallet' : showAddress}
//                                 </Button>
//                                 <Button variant="outlined" style={{ fontSize: '14px' }} onClick={goBack}>
//                                     Main Menu
//                                 </Button>
//                             </Box>
//                         )}
//                     </TabPanel>
//                     <TabPanel value={value} index={1}>
//                         <Typography component="p" variant="h6" style={{ lineHeight: '2.0', textAlign: 'left', padding: '10px', fontSize: "20px" }}>
//                             <strong> Total NFTs: {nfts.length} </strong>
//                         </Typography>
//                         <div style={{
//                             maxHeight: '250px',
//                             overflowY: 'auto',
//                             minHeight: '50vh',
//                         }}>
//                             {nfts.map((nft, index) => (
//                                 <div key={nft.id} style={{
//                                     display: 'flex',
//                                     flexDirection: 'row',
//                                     alignItems: 'flex-start',
//                                     border: '1px solid #ccc',
//                                     padding: '16px',
//                                     marginBottom: '16px',
//                                 }}>
//                                     {/* Image container */}
//                                     <div style={{ marginRight: '20px' }}>
//                                         <img
//                                             src={nft.image_url || 'path_to_your_placeholder_image.jpg'}
//                                             alt={nft.name || 'No Image Available'}
//                                             style={{
//                                                 width: '200px', // Set a fixed width for the images
//                                                 height: '250px'  // Keep the aspect ratio
//                                             }}
//                                         />
//                                     </div>

//                                     {/* Text container */}
//                                     <div style={{ flex: '1', textAlign: 'left' }}>
//                                         <Typography component="p" style={{ fontWeight: 'bold', fontSize: "24px" }}> {/* Increased font size */}
//                                             NFT #{index + 1}
//                                         </Typography>
//                                         <Typography component="p" style={{ fontSize: "16px" }}> {/* Increased font size */}
//                                             Identifier: {nft.identifier}
//                                         </Typography>
//                                         <Typography component="p" style={{ fontSize: "16px" }}> {/* Increased font size */}
//                                             Name: {nft.name}
//                                         </Typography>
//                                         <Typography component="p" style={{ fontSize: "16px" }}> {/* Increased font size */}
//                                             Collection: {nft.collection}
//                                         </Typography>
//                                         <Typography component="p" style={{ fontSize: "16px" }}> {/* Increased font size */}
//                                             Contract Address: {nft.contract}
//                                         </Typography>
//                                         <Typography component="p" style={{ fontSize: "16px" }}> {/* Increased font size */}
//                                             Last Updated: {formatDate(nft.updated_at)}
//                                         </Typography>
//                                         <Typography component="p" style={{ fontSize: "16px" }}> {/* Increased font size */}
//                                             <a href={nft.opensea_url} target="_blank" rel="noopener noreferrer">View on OpenSea</a>
//                                         </Typography>
//                                     </div>
//                                 </div>
//                             ))}

//                         </div>
//                     </TabPanel>


//                 </Box>
//             </Box>



//         </Box>
//     );
// }


