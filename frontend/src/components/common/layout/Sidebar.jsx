import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdChevronRight, MdLogout } from 'react-icons/md';

const Sidebar = ({ isOpen, onClose, menuItems, user, logoText, onLogout }) => {
  const location = useLocation();

  return (
    <aside
      className={`
        fixed lg:static top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 z-40
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}
    >
      {/* Sidebar Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-linear-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
            TF
          </div>
          <div>
            <h2 className="font-bold text-lg">{logoText}</h2>
            <p className="text-sm text-gray-500">Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.id}>
                <Link
                  to={item.path}
                  onClick={onClose}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                    ${isActive
                      ? 'bg-linear-to-r from-blue-50 to-purple-50 text-blue-600 border border-blue-100'
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <span className={`text-lg ${isActive ? 'text-blue-500' : 'text-gray-400'}`}>
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <MdChevronRight className="ml-auto text-blue-500" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile Section */}
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-linear-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold truncate">{user?.name || 'User'}</h4>
            <p className="text-sm text-gray-500 truncate">{user?.email || ''}</p>
          </div>
        </div>
        
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
        >
          <MdLogout className="text-lg" />
          <span className="font-medium">Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;