import { ethers } from "ethers";

interface BlockchainConnection {
    provider: ethers.providers.Web3Provider;
    signer: ethers.Signer;
}

let cachedConnection: BlockchainConnection | null = null;

// Function to connect to the Ethereum network
export const connectToBlockchain = async (): Promise<BlockchainConnection> => {
    if (cachedConnection) {
        return cachedConnection;
    }

    if (typeof (window as any).ethereum !== 'undefined') {
        try {
            const provider = new ethers.providers.Web3Provider((window as any).ethereum);
            await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
            const signer = provider.getSigner();
            cachedConnection = { provider, signer };
            return cachedConnection;
        } catch (error) {
            throw new Error(`Failed to connect to wallet: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    } else {
        throw new Error("Ethereum provider not found. Please install MetaMask.");
    }
};

// Function to send a transaction
export const sendTransaction = async (transaction: ethers.providers.TransactionRequest) => {
    try {
        const { signer } = await connectToBlockchain();
        const txResponse = await signer.sendTransaction(transaction);
        return txResponse;
    } catch (error) {
        throw new Error(`Transaction failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};

// Function to get the current account
export const getCurrentAccount = async (): Promise<string> => {
    try {
        const { provider } = await connectToBlockchain();
        const accounts = await provider.listAccounts();
        return accounts[0] || '';
    } catch (error) {
        throw new Error(`Failed to get account: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};