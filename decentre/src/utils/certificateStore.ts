interface Certificate {
  studentId: string;
  studentName: string;
  course: string;
  institution: string;
  dateIssued: string;
  isRevoked: boolean;
  photo?: string;
  certificateFile?: {
    name: string;
    type: string;
    data: string; // base64 encoded file data
    size: number;
  };
}

// Storage with localStorage persistence
const STORAGE_KEY = 'decentre_certificates';

const loadCertificates = (): Map<string, Certificate> => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      return new Map(Object.entries(data));
    }
  }
  return new Map();
};

const saveCertificates = (certificates: Map<string, Certificate>) => {
  if (typeof window !== 'undefined') {
    const data = Object.fromEntries(certificates);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    
    // Also save to file via API
    fetch('/api/certificates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).catch(err => console.log('File save failed:', err));
  }
};

const certificates: Map<string, Certificate> = loadCertificates();

export const certificateStore = {
  // Issue a new certificate
  issue: (certificate: Omit<Certificate, 'dateIssued' | 'isRevoked'>) => {
    const newCert: Certificate = {
      ...certificate,
      dateIssued: new Date().toLocaleDateString(),
      isRevoked: false
    };
    certificates.set(certificate.studentId, newCert);
    saveCertificates(certificates);
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
      saveCertificates(certificates);
      return true;
    }
    return false;
  },

  // Get all certificates (for admin view)
  getAll: (): Certificate[] => {
    return Array.from(certificates.values());
  },

  // Get certificates by institution (for university view)
  getByInstitution: (institution: string): Certificate[] => {
    return Array.from(certificates.values()).filter(cert => cert.institution === institution);
  }
};