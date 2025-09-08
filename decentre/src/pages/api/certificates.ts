import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const CERTIFICATES_FILE = path.join(DATA_DIR, 'certificates.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Save certificates to file
    try {
      const certificates = req.body;
      const data = JSON.stringify(certificates, null, 2);
      fs.writeFileSync(CERTIFICATES_FILE, data, 'utf8');
      res.status(200).json({ success: true, message: 'Data saved to file' });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to save data' });
    }
  } else if (req.method === 'GET') {
    // Load certificates from file
    try {
      if (fs.existsSync(CERTIFICATES_FILE)) {
        const data = fs.readFileSync(CERTIFICATES_FILE, 'utf8');
        const certificates = JSON.parse(data);
        res.status(200).json(certificates);
      } else {
        res.status(200).json({});
      }
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to load data' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}