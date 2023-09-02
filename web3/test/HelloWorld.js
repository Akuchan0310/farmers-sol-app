const { ethers } = require('hardhat')

describe("HelloWorld", function () {
  it("should deploy hehe", async () => {

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const HelloWorld = await ethers.getContractFactory("HelloWorld");
    const helloWorld = await HelloWorld.deploy();
    
    let str = await helloWorld.callFn();
    
    console.log(str);
  })
});
