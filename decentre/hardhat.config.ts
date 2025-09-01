import { task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY;

module.exports = {
  solidity: "0.8.4",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: SEPOLIA_PRIVATE_KEY ? [`0x${SEPOLIA_PRIVATE_KEY}`] : [],
    },
  },
};

task("accounts", "Prints the list of accounts", async (taskArgs: any, hre: any) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});