import React from 'react';
import WorkerDashboardLayout from '../../components/worker/layout/WorkerDashboardLayout';

const JobsFeedPage = () => {
  return (
    <WorkerDashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Find Jobs</h1>
          <p className="text-gray-600 mt-2">Browse and apply to jobs that match your skills</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Job Feed</h3>
          <p className="text-gray-500 mb-6">Browse available jobs. Feature coming soon.</p>
          <div className="flex gap-4 justify-center">
            <a
              href="/worker/dashboard"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Back to Dashboard
            </a>
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Browse Jobs
            </button>
          </div>
        </div>
      </div>
    </WorkerDashboardLayout>
  );
};

export default JobsFeedPage;