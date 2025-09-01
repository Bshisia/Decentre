# Decentre
A decentralized certification system for managing and verifying academic documents and certificates.

## Overview
Decentre is a web application that allows institutions to issue, manage, and verify certificates on the blockchain. By leveraging smart contracts, Decentre ensures the authenticity and integrity of academic documents.

## Features
- Issue certificates to students
- Verify the authenticity of certificates
- Revoke certificates if necessary
- User-friendly dashboard for managing certificates

## Setup Instructions
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/decentre.git
   ```
2. Navigate to the project directory:
   ```
   cd decentre
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Configure the Hardhat environment:
   - Update `hardhat.config.ts` with your network settings.

5. Deploy the smart contracts:
   ```
   npx hardhat run scripts/deploy.ts
   ```

## Usage
- Start the development server:
   ```
   npm run dev
   ```
- Access the application at `http://localhost:3000`.

## License
This project is licensed under the MIT License. See the LICENSE file for details.