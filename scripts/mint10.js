const hre = require("hardhat");
const winston = require('winston');

async function main() {
  //logging
  const logConfiguration = {
    'transports': [
      new winston.transports.Console(),
      new winston.transports.File({
          filename: 'logs/minting.log'
      })
  ]
  };
  const logger = winston.createLogger(logConfiguration);

  const [owner] = await ethers.getSigners();

  const NFT = await hre.ethers.getContractFactory("ThumbsUpOnly");
  const nft = await NFT.attach(process.env.RINKEBY_NFT);

  logger.info("NFT  deployed to:", nft.address);

  //Mint token
  for (i=0; i < 10; i++) {
    var nextTokenId = await nft.totalSupply();
    var tx = await nft.safeMint(owner.address);
  
  logger.info(`Next NFT Minted ID: ${nextTokenId.toString()}, Owner of NFT: ${owner.address}, Hash location of Minted NFT: ${tx.hash}`);
}

}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });