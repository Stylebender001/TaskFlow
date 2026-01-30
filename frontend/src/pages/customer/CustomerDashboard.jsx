import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import CustomerDashboardLayout from '../../components/customer/layout/CustomerDashboardLayout';
import CustomerStatsGrid from '../../components/customer/dashboard/CustomerStatsGrid';
import ActiveJobsList from '../../components/customer/dashboard/ActiveJobsList';
import RecentJobsGrid from '../../components/customer/dashboard/RecentJobsGrid';
import PendingApplicationsCard from '../../components/customer/dashboard/PendingApplicationsCard';
import LoadingSpinner from '../../components/common/UI/LoadingSpinner';
import { useCustomerDashboard } from '../../hooks/customer/useCustomerDashboard';

const CustomerDashboard = () => {
  const { user } = useContext(AuthContext);
  const { stats, activeJobs, recentJobs, pendingApplications, loading, refetch } = useCustomerDashboard();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <CustomerDashboardLayout
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      user={user}
    >
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Welcome back, {user?.name}!</h1>
              <p className="text-blue-100 mt-2">
                Here's what's happening with your jobs today.
              </p>
            </div>
            <button 
              onClick={() => window.location.href = '/customer/create-job'}
              className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all whitespace-nowrap"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Post New Job
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <CustomerStatsGrid stats={stats} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Active Jobs */}
          <div className="lg:col-span-2 space-y-6">
            <ActiveJobsList jobs={activeJobs} onRefetch={refetch} />
            <RecentJobsGrid jobs={recentJobs} />
          </div>

          {/* Right Column - Pending Applications */}
          <div className="space-y-6">
            <PendingApplicationsCard applications={pendingApplications} />
            
            {/* Quick Stats Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Response Rate</span>
                  <span className="font-bold">85%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Avg. Time to Hire</span>
                  <span className="font-bold">2.5 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Worker Satisfaction</span>
                  <span className="font-bold text-green-600">4.8/5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomerDashboardLayout>
  );
};

export default CustomerDashboard;