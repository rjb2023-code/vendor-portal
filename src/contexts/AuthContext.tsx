import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Role = 'SuperAdmin' | 'AP_Manager' | 'Procurement_Officer' | 'Vendor_Admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  privileges: string[];
  avatarPrefix: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DUMMY_USERS: Record<string, User> = {
  'admin@vendorx.com': {
    id: 'USR-001',
    name: 'Admin User',
    email: 'admin@vendorx.com',
    role: 'SuperAdmin',
    privileges: ['all_access', 'manage_users', 'manage_roles', 'approve_invoices'],
    avatarPrefix: 'AD',
  },
  'ap_manager@vendorx.com': {
    id: 'USR-002',
    name: 'Finance Manager',
    email: 'ap_manager@vendorx.com',
    role: 'AP_Manager',
    privileges: ['view_invoices', 'approve_invoices', 'view_reports'],
    avatarPrefix: 'FM',
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string) => {
    // Simulate API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const foundUser = DUMMY_USERS[email] || DUMMY_USERS['admin@vendorx.com'];
        setUser(foundUser);
        resolve();
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
