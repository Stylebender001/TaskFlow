import React from 'react';
import Sidebar from '../../common/layout/sidebar';
import MobileHeader from '../../common/layout/MobileHeader';
import { 
  MdDashboard, 
  MdWork, 
  MdPeople, 
  MdPayment, 
  MdPerson,
  MdLogout
} from 'react-icons/md';

const WorkerDashboardLayout = ({ children, sidebarOpen, setSidebarOpen, user }) => {
  const menuItems = [
    { id: 'dashboard', icon: <MdDashboard />, label: 'Dashboard', path: '/worker/dashboard' },
    { id: 'jobs', icon: <MdWork />, label: 'Find Jobs', path: '/worker/jobs' },
    { id: 'applications', icon: <MdPeople />, label: 'My Applications', path: '/worker/applications' },
    { id: 'earnings', icon: <MdPayment />, label: 'Earnings', path: '/worker/earnings' },
    { id: 'profile', icon: <MdPerson />, label: 'Profile', path: '/worker/profile' },
  ];

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        user={user}
      />

      <div className="flex">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          menuItems={menuItems}
          user={user}
          logoText="TaskFlow Worker"
          onLogout={handleLogout}
        />

        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default WorkerDashboardLayout;