import React from 'react';
import { MdPerson, MdAttachMoney, MdCalendarToday, MdChevronRight } from 'react-icons/md';
import { formatDate } from '../../../utils/formatters/date';
import { formatCurrency } from '../../../utils/formatters/currency';

const PendingApplicationsCard = ({ applications }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">Pending Applications</h3>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {applications.length} pending
            </span>
            <a
              href="/customer/applications"
              className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
            >
              View all <MdChevronRight />
            </a>
          </div>
        </div>
      </div>

      <div className="p-4">
        {applications.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
              <MdPerson className="text-xl text-gray-400" />
            </div>
            <p>No pending applications</p>
          </div>
        ) : (
          <div className="space-y-3">
            {applications.slice(0, 5).map((application) => (
              <div
                key={application._id}
                className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => window.location.href = `/customer/job/${application.job?._id}/applicants`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-sm">{application.job?.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <MdPerson className="text-xs" />
                        <span>{application.worker?.name || 'Worker'}</span>
                      </div>
                      <span className="text-xs text-gray-400">•</span>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <MdCalendarToday className="text-xs" />
                        <span>{formatDate(application.appliedAt, { relative: true })}</span>
                      </div>
                    </div>
                  </div>
                  <span className="font-bold text-green-600 text-sm">
                    {formatCurrency(application.proposedPrice)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>{application.job?.location}</span>
                  <button className="px-2 py-1 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 text-xs">
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingApplicationsCard;