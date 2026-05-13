import React from 'react';
import { Bell, Search, Menu, MessageSquare, Maximize } from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
}

export function Header({ toggleSidebar }: HeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sticky top-0 z-30 ml-0 md:ml-64 shadow-sm transition-all">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-md text-gray-600 md:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="hidden sm:flex items-center bg-gray-100 px-3 py-1.5 rounded-md border border-transparent focus-within:border-blue-500 focus-within:bg-white transition-colors">
          <Search className="w-4 h-4 text-gray-500 mr-2" />
          <input 
            type="text" 
            placeholder="Search POs, Invoices, Vendors..." 
            className="bg-transparent border-none outline-none text-sm w-64"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full relative">
          <MessageSquare className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center">
            2
          </span>
        </button>
        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-4 h-4 bg-orange-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center">
            4
          </span>
        </button>
        <button className="hidden sm:block p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
          <Maximize className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
