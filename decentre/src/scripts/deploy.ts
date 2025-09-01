const { ethers } = require("hardhat");

async function main() {
    const Certificate = await ethers.getContractFactory("Certificate");
    const certificate = await Certificate.deploy();

    await certificate.waitForDeployment();

    console.log("Certificate contract deployed to:", await certificate.getAddress());
}

// Execute the deployment script
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });