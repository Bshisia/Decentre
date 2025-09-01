// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ICertificate {
    function issueCertificate(string memory studentId, string memory studentName, string memory course, string memory institution) external;
    function verifyCertificate(string memory studentId) external view returns (string memory, string memory, string memory, uint256, bool);
    function revokeCertificate(string memory studentId) external;
}