interface Admin {
  username: string;
  password: string;
  role: 'admin' | 'university';
  institution?: string;
}

// Simple admin credentials (in production, use hashed passwords)
const admins: Admin[] = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'university', password: 'uni2024', role: 'university', institution: 'Tech University' }
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
  },

  // Add new admin (only for admin role, not university)
  addAdmin: (username: string, password: string): boolean => {
    if (!currentAdmin || currentAdmin.role !== 'admin') return false;
    
    // Check if username already exists
    if (admins.find(a => a.username === username)) {
      return false;
    }
    
    admins.push({ username, password, role: 'admin' });
    return true;
  },

  // Add new university (only for admin role)
  addUniversity: (username: string, password: string, institution: string): boolean => {
    if (!currentAdmin || currentAdmin.role !== 'admin') return false;
    
    // Check if username already exists
    if (admins.find(a => a.username === username)) {
      return false;
    }
    
    admins.push({ username, password, role: 'university', institution });
    return true;
  },

  // Check if current user can manage admins
  canManageAdmins: (): boolean => {
    return currentAdmin?.role === 'admin';
  },

  // Get all admins (for display purposes)
  getAllAdmins: (): Admin[] => {
    return admins.map(admin => ({ ...admin, password: '***' }));
  },

  // Get all universities
  getAllUniversities: (): Admin[] => {
    return admins.filter(admin => admin.role === 'university').map(admin => ({ ...admin, password: '***' }));
  },

  // Change password for current user
  changePassword: (currentPassword: string, newPassword: string): boolean => {
    if (!currentAdmin) return false;
    
    // Verify current password
    if (currentAdmin.password !== currentPassword) return false;
    
    // Update password
    const adminIndex = admins.findIndex(a => a.username === currentAdmin.username);
    if (adminIndex !== -1) {
      admins[adminIndex].password = newPassword;
      currentAdmin.password = newPassword;
      return true;
    }
    return false;
  }
};