import React from 'react';
import Sidebar from '../../common/layout/sidebar';
import MobileHeader from '../../../components/common/Layout/MobileHeader';
import { 
  MdDashboard, 
  MdWork, 
  MdPeople, 
  MdPayment, 
  MdReviews,
  MdSettings,
  MdAddCircle,
  MdLogout
} from 'react-icons/md';

const CustomerDashboardLayout = ({ children, sidebarOpen, setSidebarOpen, user }) => {
  const menuItems = [
    { id: 'dashboard', icon: <MdDashboard />, label: 'Dashboard', path: '/customer/dashboard' },
    { id: 'jobs', icon: <MdWork />, label: 'My Jobs', path: '/customer/jobs' },
    { id: 'applications', icon: <MdPeople />, label: 'Applications', path: '/customer/applications' },
    { id: 'payments', icon: <MdPayment />, label: 'Payments', path: '/customer/payments' },
    { id: 'reviews', icon: <MdReviews />, label: 'Reviews', path: '/customer/reviews' },
    { id: 'settings', icon: <MdSettings />, label: 'Settings', path: '/customer/settings' },
  ];

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <MobileHeader 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        user={user}
      />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          menuItems={menuItems}
          user={user}
          logoText="TaskFlow Customer"
          onLogout={handleLogout}
        />

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default CustomerDashboardLayout;