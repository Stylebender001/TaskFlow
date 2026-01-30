import React, { useState } from 'react';
import { MdLocationOn, MdPeople, MdAttachMoney, MdMoreVert, MdEdit, MdDelete } from 'react-icons/md';
import { formatCurrency } from '../../../utils/formatters/currency';
import { formatDate } from '../../../utils/formatters/date';
import api from '../../../api/axios';

const ActiveJobsList = ({ jobs, onRefetch }) => {
  const [loading, setLoading] = useState(false);

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    
    try {
      setLoading(true);
      await api.delete(`/jobs/${jobId}`);
      onRefetch();
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Failed to delete job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      open: { color: 'bg-green-100 text-green-800', label: 'Open' },
      assigned: { color: 'bg-blue-100 text-blue-800', label: 'Assigned' },
      in_progress: { color: 'bg-yellow-100 text-yellow-800', label: 'In Progress' },
    };
    
    const config = statusConfig[status] || statusConfig.open;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">Active Jobs</h3>
          <span className="text-sm text-gray-500">{jobs.length} active</span>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {jobs.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <MdPeople className="text-2xl text-gray-400" />
            </div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">No active jobs</h4>
            <p className="text-gray-500 mb-4">Create your first job to get started</p>
            <a
              href="/customer/create-job"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Post a Job
            </a>
          </div>
        ) : (
          jobs.map((job) => (
            <div key={job._id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-bold text-lg">{job.title}</h4>
                    {getStatusBadge(job.status)}
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{job.description}</p>
                </div>
                <div className="relative">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <MdMoreVert className="text-gray-500" />
                  </button>
                  {/* Dropdown menu would go here */}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <MdLocationOn />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MdPeople />
                  <span>{job.assignedWorkers?.length || 0}/{job.workersNeeded} workers</span>
                </div>
                <div className="flex items-center gap-1">
                  <MdAttachMoney />
                  <span>{formatCurrency(job.budget)}</span>
                </div>
                <div>
                  <span>Posted: {formatDate(job.createdAt)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <a
                    href={`/customer/job/${job._id}/applicants`}
                    className="px-4 py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100"
                  >
                    View Applicants ({job.applicationsCount || 0})
                  </a>
                  <a
                    href={`/customer/job/${job._id}`}
                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    View Details
                  </a>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => window.location.href = `/customer/job/${job._id}/edit`}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                    title="Edit job"
                  >
                    <MdEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteJob(job._id)}
                    disabled={loading}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                    title="Delete job"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActiveJobsList;