/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { ExecutiveDashboard } from './pages/Dashboard';
import { VendorManagement } from './pages/VendorManagement';
import { InvoiceManagement } from './pages/InvoiceManagement';
import { Architecture } from './pages/Architecture';
import { Login } from './pages/Login';
import { UserManagement } from './pages/UserManagement';
import { AuthProvider, useAuth } from './contexts/AuthContext';

import { VendorIntelligence } from './pages/VendorIntelligence';
import { VendorRegistration } from './pages/VendorRegistration';
import { VendorGuidelines } from './pages/VendorGuidelines';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Layout>{children}</Layout>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      {/* Protected Routes */}
      <Route path="/" element={<ProtectedRoute><ExecutiveDashboard /></ProtectedRoute>} />
      <Route path="/vendors" element={<ProtectedRoute><VendorManagement /></ProtectedRoute>} />
      <Route path="/vendors/register" element={<ProtectedRoute><VendorRegistration /></ProtectedRoute>} />
      <Route path="/vendors/guidelines" element={<ProtectedRoute><VendorGuidelines /></ProtectedRoute>} />
      <Route path="/invoices" element={<ProtectedRoute><InvoiceManagement /></ProtectedRoute>} />
      <Route path="/contracts" element={<ProtectedRoute><Architecture /></ProtectedRoute>} />
      <Route path="/intelligence" element={<ProtectedRoute><VendorIntelligence /></ProtectedRoute>} />
      <Route path="/compliance" element={<ProtectedRoute><Architecture /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
      
      {/* Missing routes catch-all */}
      <Route path="*" element={
        <ProtectedRoute>
          <div className="flex flex-col items-center justify-center h-96 text-gray-500">
            <h2 className="text-xl font-bold mb-2">Module Not Implemented</h2>
            <p>See Platform Architecture for complete specification.</p>
            <button onClick={() => window.history.back()} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md text-sm">
              Go Back
            </button>
          </div>
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
