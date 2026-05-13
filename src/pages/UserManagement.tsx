import React, { useState } from 'react';
import { 
  Users, ShieldPlus, Search, Filter, Key, MoreVertical, Plus,
  ShieldAlert, UserCog
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';

export function UserManagement() {
  const { user } = useAuth();
  
  const [users] = useState([
    { id: 'USR-001', name: 'Admin User', email: 'admin@vendorx.com', role: 'SuperAdmin', status: 'Active', branch: 'Global', lastLogin: 'Today, 10:45 AM' },
    { id: 'USR-002', name: 'Finance Manager', email: 'ap_manager@vendorx.com', role: 'AP_Manager', status: 'Active', branch: 'HQ-Finance', lastLogin: 'Yesterday, 4:20 PM' },
    { id: 'USR-003', name: 'John Doe', email: 'johndoe@vendorx.com', role: 'Procurement_Officer', status: 'Active', branch: 'Branch-NA', lastLogin: 'Today, 08:15 AM' },
    { id: 'USR-004', name: 'Jane Smith', email: 'jane@external.vendor.com', role: 'Vendor_Admin', status: 'Pending', branch: 'Vendor-10042', lastLogin: 'Never' },
    { id: 'USR-005', name: 'Security Audit', email: 'audit@vendorx.com', role: 'Read_Only', status: 'Locked', branch: 'HQ-Compliance', lastLogin: '3 months ago' },
  ]);

  const [roles] = useState([
    { name: 'SuperAdmin', count: 2, accessLevel: 'Full System' },
    { name: 'AP_Manager', count: 14, accessLevel: 'Invoice & Approvals' },
    { name: 'Procurement_Officer', count: 42, accessLevel: 'Vendors & POs' },
    { name: 'Vendor_Admin', count: 850, accessLevel: 'External Portal' },
  ]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-100 text-slate-700 rounded-lg">
            <UserCog className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">User, Roles & Privileges</h1>
            <p className="text-sm text-gray-500">Manage internal users, vendor access, and permission hierarchies.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Key className="w-4 h-4" /> Manage Roles
          </button>
          {user?.role === 'SuperAdmin' && (
            <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm">
              <Plus className="w-4 h-4" /> Invite User
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Roles Summary Panel */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
              <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                <ShieldPlus className="w-4 h-4" /> Configured Roles
              </h3>
            </div>
            <div className="divide-y divide-gray-100">
              {roles.map((r, i) => (
                <div key={i} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">{r.name}</h4>
                    <span className="text-xs text-gray-500">{r.accessLevel}</span>
                  </div>
                  <div className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full text-xs font-bold border border-blue-100">
                    {r.count} <span className="font-normal opacity-70">users</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 bg-gray-50 border-t border-gray-200 rounded-b-lg">
               <button className="w-full text-center text-sm font-medium text-blue-600 hover:underline">
                 Create Custom Role
               </button>
            </div>
          </div>
        </div>

        {/* User List Panel */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full flex flex-col">
            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className="font-semibold text-gray-700 flex items-center gap-2 whitespace-nowrap">
                <Users className="w-4 h-4" /> Directory
              </h3>
              
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none">
                  <Search className="w-4 h-4 text-gray-400 absolute left-2 top-1/2 -translate-y-1/2" />
                  <input type="text" placeholder="Search user..." className="text-sm pl-8 pr-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:border-blue-500 w-full sm:w-48" />
                </div>
                <button className="p-1.5 border border-gray-300 bg-white rounded text-gray-600 hover:bg-gray-50">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-white text-gray-500 font-semibold border-b border-gray-200 text-xs uppercase">
                  <tr>
                    <th className="px-4 py-3">User / Email</th>
                    <th className="px-4 py-3">Assigned Role</th>
                    <th className="px-4 py-3">Branch/Entity</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-700">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-900">{u.name}</div>
                        <div className="text-xs text-gray-500">{u.email}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-200">
                          {u.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{u.branch}</td>
                      <td className="px-4 py-3">
                        <span className={cn(
                          "text-[10px] font-bold uppercase px-2 py-0.5 rounded",
                          u.status === 'Active' ? "bg-green-100 text-green-800" :
                          u.status === 'Pending' ? "bg-orange-100 text-orange-800" :
                          "bg-red-100 text-red-800"
                        )}>
                          {u.status === 'Locked' && <ShieldAlert className="w-3 h-3 inline mr-1 -mt-0.5"/>}
                          {u.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 text-xs text-gray-500 text-center sm:text-left">
              Showing directory entries for current scope. Select a user to modify privileges.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
