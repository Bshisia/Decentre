// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Certificate {
    struct Cert {
        string studentName;
        string studentId;
        string course;
        string institution;
        uint256 dateIssued;
        bool isRevoked;
        bool exists;
    }

    address public admin;
    mapping(string => Cert) public certificates; // studentId => Certificate
    mapping(address => bool) public authorizedAdmins;

    event CertificateIssued(string indexed studentId, string studentName, string course, string institution);
    event CertificateRevoked(string indexed studentId);
    event AdminAdded(address indexed admin);

    modifier onlyAdmin() {
        require(msg.sender == admin || authorizedAdmins[msg.sender], "Only admin can perform this action");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function addAdmin(address newAdmin) public {
        require(msg.sender == admin, "Only main admin can add admins");
        authorizedAdmins[newAdmin] = true;
        emit AdminAdded(newAdmin);
    }

    function issueCertificate(
        string memory studentId,
        string memory studentName,
        string memory course,
        string memory institution
    ) public onlyAdmin {
        require(!certificates[studentId].exists, "Certificate already exists for this student ID");
        
        certificates[studentId] = Cert({
            studentName: studentName,
            studentId: studentId,
            course: course,
            institution: institution,
            dateIssued: block.timestamp,
            isRevoked: false,
            exists: true
        });
        
        emit CertificateIssued(studentId, studentName, course, institution);
    }

    function verifyCertificate(string memory studentId) public view returns (
        string memory studentName,
        string memory course,
        string memory institution,
        uint256 dateIssued,
        bool isRevoked
    ) {
        Cert memory cert = certificates[studentId];
        require(cert.exists, "Certificate not found");
        return (cert.studentName, cert.course, cert.institution, cert.dateIssued, cert.isRevoked);
    }

    function revokeCertificate(string memory studentId) public onlyAdmin {
        require(certificates[studentId].exists, "Certificate not found");
        certificates[studentId].isRevoked = true;
        emit CertificateRevoked(studentId);
    }
}