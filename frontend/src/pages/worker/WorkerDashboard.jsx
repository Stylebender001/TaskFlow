import React from 'react';
import WorkerDashboardLayout from '../../components/worker/layout/WorkerDashboardLayout';

const WorkerDashboard = () => {
  return (
    <WorkerDashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Worker Dashboard</h1>
          <p className="text-gray-600 mt-2">Track your jobs, applications, and earnings</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Worker Dashboard</h3>
          <p className="text-gray-500 mb-6">This feature is under development and will be available soon.</p>
          <a
            href="/worker/jobs"
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Browse Jobs
          </a>
        </div>
      </div>
    </WorkerDashboardLayout>
  );
};

export default WorkerDashboard;