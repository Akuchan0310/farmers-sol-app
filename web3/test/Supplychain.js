const { ethers } = require('hardhat')

describe("SupplyChain", function () {
  it("should deploy the supplyChain contract", async () => {

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const SupplyChain = await ethers.getContractFactory("SupplyChain");
    const supplyChain = await SupplyChain.deploy();
    
    let addr = await supplyChain._owner;
    const uid = await supplyChain.uid;
    
    console.log(addr, uid);
  })
});
