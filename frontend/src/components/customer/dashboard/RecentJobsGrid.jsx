import React from 'react';
import { MdLocationOn, MdCalendarToday, MdChevronRight } from 'react-icons/md';
import { formatDate } from '../../../utils/formatters/date';
import { formatCurrency } from '../../../utils/formatters/currency';

const RecentJobsGrid = ({ jobs }) => {
  const getStatusColor = (status) => {
    const colors = {
      open: 'text-green-600 bg-green-50',
      assigned: 'text-blue-600 bg-blue-50',
      in_progress: 'text-yellow-600 bg-yellow-50',
      completed: 'text-purple-600 bg-purple-50',
      cancelled: 'text-red-600 bg-red-50'
    };
    return colors[status] || colors.open;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">Recent Jobs</h3>
          <a
            href="/customer/jobs"
            className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
          >
            View all <MdChevronRight />
          </a>
        </div>
      </div>

      <div className="p-6">
        {jobs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No recent jobs</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.slice(0, 6).map((job) => (
              <div
                key={job._id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => window.location.href = `/customer/job/${job._id}`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-sm mb-1">{job.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                      {job.status.replace('_', ' ')}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">{formatDate(job.createdAt, { relative: true })}</span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{job.description}</p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-gray-500">
                    <MdLocationOn className="text-xs" />
                    <span className="truncate">{job.location}</span>
                  </div>
                  <div className="font-bold text-blue-600">
                    {formatCurrency(job.budget)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentJobsGrid;