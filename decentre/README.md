# Decentre
A decentralized certification system where admins store student certificates and employers verify them using only student IDs.

## Features
- Admin-controlled certificate issuance
- ID-based certificate verification (no wallet needed)
- Blockchain-secured certificate storage
- Certificate revocation capability

## Quick Start

### 1. Install Dependencies
```bash
cd decentre
npm install
```

### 2. Set Environment Variables
```bash
cp .env.example .env
# Edit .env with your Alchemy API key and private key
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Access Application
- Open http://localhost:3000
- Use `/admin` for certificate management
- Use `/verify` for certificate verification

## Blockchain Deployment (Optional)

### Deploy to Sepolia Testnet
```bash
npx hardhat run scripts/deploy.ts --network sepolia
```

### Run Tests
```bash
npm test
```

## How It Works
1. **Admin Issues Certificate**: Enter student ID, name, course, institution
2. **Certificate Stored**: Securely stored on blockchain with student ID as key
3. **Employer Verifies**: Enter student ID to instantly verify certificate
4. **No Physical Documents**: Students only need to share their ID number

## Pages
- `/` - Home page with navigation
- `/admin` - Issue and manage certificates
- `/verify` - Verify certificates by student ID

## License
This project is licensed under the MIT License. See the LICENSE file for details.