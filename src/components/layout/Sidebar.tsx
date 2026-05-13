import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  FileText, 
  LayoutDashboard, 
  Settings, 
  Users, 
  BookOpen,
  PieChart,
  ShieldCheck,
  LifeBuoy,
  LogOut,
  UserCog
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
}

export function Sidebar({ isOpen }: SidebarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { label: 'Executive Dashboard', path: '/', icon: LayoutDashboard },
    { label: 'Vendor Management', path: '/vendors', icon: Building2 },
    { label: 'Invoice Automation', path: '/invoices', icon: FileText },
    { label: 'Procurement Collab', path: '/procurement', icon: Users },
    { label: 'Contracts & SLAs', path: '/contracts', icon: BookOpen },
    { label: 'Intelligence & Risk', path: '/intelligence', icon: PieChart },
    { label: 'Compliance & Audit', path: '/compliance', icon: ShieldCheck },
    { label: 'Vendor Ticketing', path: '/tickets', icon: LifeBuoy },
    { label: 'User Management', path: '/settings', icon: UserCog },
    { label: 'Platform Architecture', path: '/architecture', icon: Settings },
  ];

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-40 h-screen flex flex-col transition-transform bg-[#343a40] text-[#c2c7d0] shadow-xl",
        isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64 md:translate-x-0"
      )}
    >
      <div className="flex shrink-0 h-16 items-center px-4 bg-[#343a40] border-b border-[#4b545c]">
        <span className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold">
            V
          </div>
          VendorX ERP
        </span>
      </div>
      
      <div className="py-4 px-3 flex items-center border-b border-[#4b545c] mb-2 shrink-0">
        <div className="w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center text-white font-medium mr-3">
          {user?.avatarPrefix || 'U'}
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="text-sm text-white m-0 truncate">{user?.name || 'User'}</p>
          <p className="text-xs text-green-500 m-0 flex items-center gap-1">
             <span className="block w-2 h-2 rounded-full bg-green-500"></span> 
             <span className="truncate">{user?.role || 'Online'}</span>
          </p>
        </div>
      </div>

      <nav className="px-2 space-y-1 overflow-y-auto flex-1">
        <div className="px-2 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-2">
           Core Modules
        </div>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors",
                isActive 
                  ? "bg-blue-600 text-white" 
                  : "hover:bg-[#4b545c] hover:text-white"
              )
            }
          >
            <item.icon className="w-5 h-5 opacity-80" />
            <span className="text-sm font-medium">{item.label}</span>
            {item.path === '/invoices' && (
               <span className="ml-auto bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                 3
               </span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-[#4b545c] shrink-0">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-md transition-colors hover:bg-red-500 hover:text-white text-gray-400 group"
        >
          <LogOut className="w-5 h-5 opacity-80 group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium">Secure Logout</span>
        </button>
      </div>
    </aside>
  );
}
