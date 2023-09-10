const hre = require("hardhat");
var contract = '';

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

async function main() {
  const SupplyChain = await hre.ethers.deployContract("SupplyChain");

  // await SupplyChain.waitForDeployment();
  
  contract = SupplyChain.address;
  console.log(
    `Contract deployed to ${contract}`
  );

  await sleep(30*1000);

  const owner = await SupplyChain._owner;
  console.log(owner);

  await hre.run("verify:verify", {
    address: SupplyChain.address,
    constructorArguments: [],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

module.exports = contract; // Export contract variable