// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  const [deployer, addr1, addr2] = await ethers.getSigners();

  const NFT = await hre.ethers.getContractFactory("ThumbsUpOnly");
  const nft = await NFT.deploy();

  async function printBalances() {
    console.log("Deployer NFT Count: ", (await nft.balanceOf(deployer.address)).toString());
    console.log("Addr1 NFT Count: ", (await nft.balanceOf(addr1.address)).toString());
    console.log("Addr2 NFT Count: ", (await nft.balanceOf(addr2.address)).toString());
  }
  await nft.deployed();

  console.log("Thumbs Up Only deployed to:", nft.address);

  await nft.safeMint(deployer.address);
  await nft.safeMint(addr1.address);
  await nft.safeMint(addr1.address);
  
  console.log("Addr1 TokenID0: ", (await nft.tokenOfOwnerByIndex(addr1.address, 0)).toString());
  console.log("Addr1 TokenID1: ", (await nft.tokenOfOwnerByIndex(addr1.address, 1)).toString());

  await printBalances();

  console.log("Sending NFT from Addr1 to Addr2");
  await nft.connect(addr1).transferFrom(addr1.address, addr2.address, 2);

  await printBalances();
  
  console.log("Addr1 TokenID0: ", (await nft.tokenOfOwnerByIndex(addr1.address, 0)).toString());
  console.log("Addr2 TokenID0: ", (await nft.tokenOfOwnerByIndex(addr2.address, 0)).toString());

  console.log(await nft.tokenURI(1));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }
);
