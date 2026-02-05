import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Admin, AdminRole } from '@/lib/mockData';

// The three simulated users
export const simulatedUsers: Admin[] = [
  {
    id: 'admin-1',
    name: "Marie O'Sullivan",
    email: 'marie.osullivan@ogcio.gov.ie',
    role: 'super_admin',
    status: 'active',
    addedAt: '2024-01-01',
    addedBy: 'System',
  },
  {
    id: 'admin-2',
    name: 'Patrick Murphy',
    email: 'patrick.murphy@ogcio.gov.ie',
    role: 'admin',
    status: 'active',
    addedAt: '2024-01-15',
    addedBy: "Marie O'Sullivan",
  },
  {
    id: 'admin-3',
    name: 'Éanna Ó Faoláin',
    email: 'eanna.ofaolain@ogcio.gov.ie',
    role: 'read_only',
    status: 'active',
    addedAt: '2024-02-01',
    addedBy: "Marie O'Sullivan",
  },
];

interface AuthContextType {
  currentUser: Admin | null;
  setCurrentUser: (user: Admin | null) => void;
  isSuperAdmin: boolean;
  isAdmin: boolean;
  isReadOnly: boolean;
  canModify: boolean;
  canDelete: boolean;
  canAccessAllowList: boolean;
  canModifyAllowList: boolean;
  canAccessAdminManagement: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<Admin | null>(null);

  const isSuperAdmin = currentUser?.role === 'super_admin';
  const isAdmin = currentUser?.role === 'admin';
  const isReadOnly = currentUser?.role === 'read_only';
  
  // Super Admin: can do everything
  // Admin: can modify but NOT delete
  // Read Only: can only view
  const canModify = isSuperAdmin || isAdmin;
  const canDelete = isSuperAdmin;
  
  // Allow List: Super Admin can modify, Admin/Read Only can only view
  const canAccessAllowList = isSuperAdmin; // Only super admin can access
  const canModifyAllowList = isSuperAdmin;
  
  // Admin Management: Only Super Admin
  const canAccessAdminManagement = isSuperAdmin;

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isSuperAdmin,
        isAdmin,
        isReadOnly,
        canModify,
        canDelete,
        canAccessAllowList,
        canModifyAllowList,
        canAccessAdminManagement,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
