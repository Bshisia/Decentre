import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const CERTIFICATES_FILE = path.join(DATA_DIR, 'certificates.json');

// Ensure data directory exists
if (typeof window === 'undefined') {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export const fileStorage = {
  // Save certificates to file
  saveCertificates: (certificates: any) => {
    if (typeof window === 'undefined') {
      const data = JSON.stringify(certificates, null, 2);
      fs.writeFileSync(CERTIFICATES_FILE, data, 'utf8');
    }
  },

  // Load certificates from file
  loadCertificates: () => {
    if (typeof window === 'undefined') {
      try {
        if (fs.existsSync(CERTIFICATES_FILE)) {
          const data = fs.readFileSync(CERTIFICATES_FILE, 'utf8');
          return JSON.parse(data);
        }
      } catch (error) {
        console.error('Error loading certificates:', error);
      }
    }
    return {};
  }
};