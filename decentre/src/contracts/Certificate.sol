// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Certificate {
    struct Cert {
        string name;
        string course;
        uint256 dateIssued;
        bool isRevoked;
    }

    mapping(address => Cert) public certificates;

    event CertificateIssued(address indexed recipient, string name, string course, uint256 dateIssued);
    event CertificateRevoked(address indexed recipient);

    function issueCertificate(address recipient, string memory name, string memory course) public {
        require(certificates[recipient].dateIssued == 0, "Certificate already issued");
        certificates[recipient] = Cert(name, course, block.timestamp, false);
        emit CertificateIssued(recipient, name, course, block.timestamp);
    }

    function verifyCertificate(address recipient) public view returns (string memory, string memory, uint256, bool) {
        Cert memory cert = certificates[recipient];
        require(cert.dateIssued != 0, "Certificate not found");
        return (cert.name, cert.course, cert.dateIssued, cert.isRevoked);
    }

    function revokeCertificate(address recipient) public {
        require(certificates[recipient].dateIssued != 0, "Certificate not found");
        certificates[recipient].isRevoked = true;
        emit CertificateRevoked(recipient);
    }
}