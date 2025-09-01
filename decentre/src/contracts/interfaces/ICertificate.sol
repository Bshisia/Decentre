// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ICertificate {
    function issueCertificate(address recipient, string memory details) external;
    function verifyCertificate(uint256 certificateId) external view returns (bool);
    function revokeCertificate(uint256 certificateId) external;
}