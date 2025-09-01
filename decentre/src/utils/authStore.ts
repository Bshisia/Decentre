interface Admin {
  username: string;
  password: string;
  role: 'admin';
}

// Simple admin credentials (in production, use hashed passwords)
const admins: Admin[] = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'university', password: 'uni2024', role: 'admin' }
];

let currentAdmin: Admin | null = null;

export const authStore = {
  // Login admin
  login: (username: string, password: string): boolean => {
    const admin = admins.find(a => a.username === username && a.password === password);
    if (admin) {
      currentAdmin = admin;
      return true;
    }
    return false;
  },

  // Logout admin
  logout: (): void => {
    currentAdmin = null;
  },

  // Check if admin is logged in
  isAuthenticated: (): boolean => {
    return currentAdmin !== null;
  },

  // Get current admin
  getCurrentAdmin: (): Admin | null => {
    return currentAdmin;
  }
};