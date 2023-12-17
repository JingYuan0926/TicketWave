const hre = require("hardhat");

// This script is for changing the greeting of the contract by calling the setGreeting function on chain
const CONTRACT_ADDRESS = "0x77D29A2B1e479B27ca10c8457FdA6cc195eD940D";

async function main() {
  const greeter = await hre.ethers.getContractAt("Greeter", CONTRACT_ADDRESS);
   await greeter.setGreeting("Hello World!");

  await greeter.deployed();

  console.log("Greeter on ", greeter.address, " has been changed");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
