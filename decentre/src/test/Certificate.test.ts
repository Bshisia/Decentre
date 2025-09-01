const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Certificate Contract", function () {
    let Certificate;
    let certificate;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function () {
        Certificate = await ethers.getContractFactory("Certificate");
        [owner, addr1, addr2] = await ethers.getSigners();
        certificate = await Certificate.deploy();
        await certificate.deployed();
    });

    describe("Issuing Certificates", function () {
        it("Should issue a certificate correctly", async function () {
            await certificate.issueCertificate(addr1.address, "Certificate 1");
            const cert = await certificate.certificates(addr1.address);
            expect(cert.name).to.equal("Certificate 1");
            expect(cert.issued).to.be.true;
        });
    });

    describe("Verifying Certificates", function () {
        it("Should verify a certificate correctly", async function () {
            await certificate.issueCertificate(addr1.address, "Certificate 1");
            const isValid = await certificate.verifyCertificate(addr1.address);
            expect(isValid).to.be.true;
        });
    });

    describe("Revoking Certificates", function () {
        it("Should revoke a certificate correctly", async function () {
            await certificate.issueCertificate(addr1.address, "Certificate 1");
            await certificate.revokeCertificate(addr1.address);
            const cert = await certificate.certificates(addr1.address);
            expect(cert.issued).to.be.false;
        });
    });
});