const hre = require("hardhat");

// This script is for looking the greeting on chain after changing it
const CONTRACT_ADDRESS = "0x77D29A2B1e479B27ca10c8457FdA6cc195eD940D";

async function main() {
  const greeter = await hre.ethers.getContractAt("Greeter", CONTRACT_ADDRESS);
   
  console.log(await greeter.greet());

  console.log("This is the greeting on:", greeter.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
