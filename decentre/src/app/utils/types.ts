// This file defines TypeScript types and interfaces used throughout the application for better type safety.

export interface Certificate {
    id: string;
    owner: string;
    issuedDate: Date;
    validUntil: Date;
    status: 'issued' | 'revoked';
}

export interface User {
    id: string;
    name: string;
    email: string;
}

export interface VerificationResult {
    isValid: boolean;
    certificate?: Certificate;
    message: string;
}