interface Certificate {
  studentId: string;
  studentName: string;
  course: string;
  institution: string;
  dateIssued: string;
  isRevoked: boolean;
}

// Simple in-memory storage for testing
const certificates: Map<string, Certificate> = new Map();

export const certificateStore = {
  // Issue a new certificate
  issue: (certificate: Omit<Certificate, 'dateIssued' | 'isRevoked'>) => {
    const newCert: Certificate = {
      ...certificate,
      dateIssued: new Date().toLocaleDateString(),
      isRevoked: false
    };
    certificates.set(certificate.studentId, newCert);
    return newCert;
  },

  // Verify/get a certificate by student ID
  verify: (studentId: string): Certificate | null => {
    return certificates.get(studentId) || null;
  },

  // Revoke a certificate
  revoke: (studentId: string): boolean => {
    const cert = certificates.get(studentId);
    if (cert) {
      cert.isRevoked = true;
      certificates.set(studentId, cert);
      return true;
    }
    return false;
  },

  // Get all certificates (for admin view)
  getAll: (): Certificate[] => {
    return Array.from(certificates.values());
  }
};