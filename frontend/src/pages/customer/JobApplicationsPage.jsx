import React from 'react';
import CustomerDashboardLayout from '../../components/customer/layout/CustomerDashboardLayout';

const JobApplicationsPage = () => {
  return (
    <CustomerDashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Job Applications</h1>
          <p className="text-gray-600 mt-2">Manage applications for your posted jobs</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Applications Feature</h3>
          <p className="text-gray-500 mb-6">This feature is under development and will be available soon.</p>
          <a
            href="/customer/dashboard"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Dashboard
          </a>
        </div>
      </div>
    </CustomerDashboardLayout>
  );
};

export default JobApplicationsPage;