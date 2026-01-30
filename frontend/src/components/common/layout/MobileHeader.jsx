import React from 'react';
import { MdMenu, MdClose, MdNotifications } from 'react-icons/md';

// CHANGE THIS FROM:
// export const MobileHeader = ({ sidebarOpen, setSidebarOpen, user }) => {
// TO:
const MobileHeader = ({ sidebarOpen, setSidebarOpen, user }) => {
  return (
    <header className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Toggle menu"
      >
        {sidebarOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
      </button>
      
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-gray-100">
          <MdNotifications size={20} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        {/* User Avatar */}
        <div className="w-8 h-8 bg-linear-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
          {user?.name?.charAt(0) || 'U'}
        </div>
      </div>
    </header>
  );
};

// ADD THIS LINE:
export default MobileHeader;