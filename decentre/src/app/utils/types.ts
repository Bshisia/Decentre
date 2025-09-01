export interface Certificate {
    studentId: string;
    studentName: string;
    course: string;
    institution: string;
    dateIssued: number;
    isRevoked: boolean;
    exists: boolean;
}

export interface Admin {
    address: string;
    isAuthorized: boolean;
}

export interface VerificationResult {
    isValid: boolean;
    certificate?: Certificate;
    message: string;
}

export interface CertificateForm {
    studentId: string;
    studentName: string;
    course: string;
    institution: string;
}