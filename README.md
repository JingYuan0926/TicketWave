# What is TicketWave?

TicketWave is an user centric platform that revolutionizes the concert ticketing industry by leveraging blockchain technology and NFTs to provide a secure, transparent, flexible and user-friendly experience for concert-goers. Our focus extends beyond just integrating cutting-edge technology, we are committed to ensuring that TicketWave is intuitively easy to use, even for those without a technical background. This commitment involves designing the platform to be familiar and accessible, akin to traditional ticketing systems, yet enhanced with the benefits of blockchain. With dedication and passion, TicketWave is not only about concerts but about making the world a better place for all music lovers by prioritizing user needs and ensuring fairness in ticketing.

# Why Viction Blockchain?

TicketWave integrates with the Viction blockchain, a system aligned with our platform's core values of transparency and efficiency. Known for its low transaction fees, Viction is an optimal choice for platforms that handle a high volume of transactions, like ticketing services. TicketWave takes advantage of Viction's unique features to offer a fraud-resistant and scalper-proof system. Our platform includes innovative functions such as 'Buy Now Pay Later' and secure ticket resale, all powered by smart contracts written in Solidity. These contracts are deployable on Viction and other EVM-compatible blockchains, ensuring wide compatibility and flexibility.

A comparative analysis highlights the stark differences in transaction speed and cost between Ethereum and Viction. For instance, processing a full payment for six tickets on Ethereum takes about 10 seconds and incurs a gas fee of approximately $10 USD. In contrast, the same transaction on Viction takes only 1 second with a minimal fee of $1 USD. The disparity becomes even more pronounced with our 'Buy Now Pay Later' option: Ethereum transactions take 20 seconds and cost $50 in gas fees, whereas Viction completes them in just 2 seconds for a mere $10. This efficiency scales significantly for larger volumes, such as 10,000 tickets, illustrating Viction's superior speed and lower costs. Such efficiency not only enhances user experience but also makes Viction an ideal blockchain solution for TicketWave's high-volume transactions.

# Novelty - How unique is the application? Does this use case exsist currently?

While TicketWave incorporates several features common in contemporary blockchain-based ticketing platforms, such as anti-fraud mechanisms, NFT-based ticketing to prevent scalping, and a transparent resale market, our application distinguishes itself in several notable ways:

1. Buy Now Pay Later Option: Unlike many NFT ticketing services, TicketWave offers a flexible payment solution that allows users to secure their tickets immediately while paying over time. This feature is tailored to enhance affordability and accessibility, making it a standout in the market.
2. User-Friendly Design: Our platform is engineered with the non-technical user in mind. The ease of use is a core principle, ensuring that anyone can access our services with minimal hassle. The only requirement is a simple download of MetaMask, a testament to our commitment to user-centric design.
3. Privacy: In an age where data privacy is paramount, TicketWave takes a stand by eliminating the need for personal information like emails or phone numbers, setting a new standard in data protection. Despite this approach, our platform maintains rigorous security for ticket transactions using blockchain technology and encryption methods, ensuring both user trust and ticket integrity are uncompromised.
4. Ongoing Innovation and Passion: While functional features are essential, what truly sets TicketWave apart is the relentless drive and passion of our team. We are constantly exploring new use cases and opportunities to enhance the user experience and contribute positively to the ecosystem. Our dedication to innovation and user satisfaction is the heartbeat of TicketWave, and it's a quality that can't be replicated.

# Engineering - How well engineered is the dApp given its current state?

TicketWave exhibits a high degree of engineering proficiency, particularly evident in its seamless MetaMask integration and effective payment processing capabilities. The dApp's functionality, including its successful interaction with the Viction blockchain, underscores its robust engineering. Furthermore, its ability to fetch and display on-chain data using React demonstrates a well-architected front-end that is both responsive and interactive.

However, it's noteworthy that certain sections of the website are currently under development, with some areas remaining unfilled and limited interactive elements, such as only the first card being clickable under the 'Learn More' section. This suggests ongoing work to enhance the user experience and expand the website's functionality. Overall, while TicketWave's core features are solidly built and operational, there is an apparent scope for further development to fully realize its potential as a user-centric platform.

# Functionality - What can you do with the application?
1. Wallet Connectivity: Securely link your MetaMask wallet to manage transactions with ease.
2. Flexible Payment Solutions: Choose between immediate full payment or our accommodating 'Buy Now Pay Later' option.
3. Live Ticket Analytics: Stay informed with updates on ticket sales and availability, alongside a detailed NFT transaction history to prevent unfair ticket distribution.
4. Transparent Resale Market: Navigate our honest and open platform for buying and selling NFT tickets to prevent scammer and ticket scalpers
5. Smart Redirection: The system intuitively guides you to the QR code display post-purchase or to the BNPL progress tracker if you have installments remaining.
6. NFT Portfolio: Post-wallet connection, display all your NFTs in one place on the QR page.
7. Secure Ticketing with Encrypted QR Codes: Experience unparalleled security with each ticket's encrypted QR code, ensuring scam-proof and high-security entry. Even in the unlikely event of interception, our two-layer security and multi-factor authentication mean that only legitimate ticket holders gain access.
8. Flexible Entry Methods: Choose your preferred entry method: traditional ticket download with ID verification, or a swift digital experience using our web app's QR code display. Whether you opt for physical proof or digital ease, we've got your entry covered.

# Prerequisite for Running the Code
1. Download GIT: [https://git-scm.com/downloads](https://git-scm.com/downloads)
2. Download Visual Studio Code: [https://code.visualstudio.com/](https://code.visualstudio.com/)
3. Download the source code of TicketWave in cmd: git clone https://github.com/JingYuan0926/TicketWave.git

# How to Run Code for Smart Contract

Execute the following commands:
```
cd contract
npm install --save-dev hardhat
```

For localhost setup:
```
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
```

For deployment of smart contract on test networks:
- TomoChain Testnet:

```
npx hardhat run scripts/deploy.js --network tomochain
```

- Etherum Sepolia:
```
npx hardhat run scripts/deploy.js --network sepolia
```

# How to Run Code for Front End

Navigate to the client directory and install dependencies:
```
cd client
npm install
npm i -S ethers@5.7.2
npm start
```

# Check NFT in Wallet

- View your NFTs on OpenSea (Testnets): [https://testnets.opensea.io/yourwalletaddress](https://testnets.opensea.io/yourwalletaddress)
- MetaMask NFT autodetect (Mainnet): [MetaMask Support](https://support.metamask.io/hc/en-us/articles/360058238591-NFT-tokens-in-your-MetaMask-wallet)

# Pitch Deck and Demo Video

- Pitch Deck: [View on Canva](https://www.canva.com/design/DAFxOOCgBK4/bsrtjD-eRy7GxXg5Yli1eA/edit)
- Demo Video: [Watch on YouTube](https://youtu.be/8hQWND7RDU0)

