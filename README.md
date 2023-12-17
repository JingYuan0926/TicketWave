cd contract
install with npm install --save-dev hardhat
run npx hardhat compile
run npx hardhat node
For localhost: npx hardhat run scripts/deploy.js --network localhost
For sepolia testnet: npx hardhat run scripts/deploy.js --network sepolia

cd client
install npm i -S ethers@5.7.2
npm start

When reopen vscode remember to run hardhat 
Address on the sepolia network: 0x77D29A2B1e479B27ca10c8457FdA6cc195eD940D
