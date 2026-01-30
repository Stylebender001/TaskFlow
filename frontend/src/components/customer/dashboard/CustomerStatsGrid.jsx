import React from 'react';
import { MdWork, MdAccessTime, MdCheckCircle, MdAttachMoney, MdPeople, MdStar } from 'react-icons/md';
import { formatCurrency } from '../../../utils/formatters/currency';

const CustomerStatsGrid = ({ stats }) => {
  const statCards = [
    {
      id: 'totalJobs',
      label: 'Total Jobs',
      value: stats.totalJobs,
      icon: <MdWork className="text-2xl text-blue-500" />,
      color: 'blue',
      change: '+12%',
      changeType: 'increase'
    },
    {
      id: 'activeJobs',
      label: 'Active Jobs',
      value: stats.activeJobs,
      icon: <MdAccessTime className="text-2xl text-green-500" />,
      color: 'green',
      change: '+3',
      changeType: 'increase'
    },
    {
      id: 'completedJobs',
      label: 'Completed',
      value: stats.completedJobs,
      icon: <MdCheckCircle className="text-2xl text-purple-500" />,
      color: 'purple',
      change: '+8%',
      changeType: 'increase'
    },
    {
      id: 'pendingApplications',
      label: 'Pending Applications',
      value: stats.pendingApplications,
      icon: <MdPeople className="text-2xl text-yellow-500" />,
      color: 'yellow',
      change: '+5',
      changeType: 'increase'
    },
    {
      id: 'totalSpent',
      label: 'Total Spent',
      value: formatCurrency(stats.totalSpent),
      icon: <MdAttachMoney className="text-2xl text-red-500" />,
      color: 'red',
      change: '+15%',
      changeType: 'increase'
    },
    {
      id: 'avgRating',
      label: 'Avg. Worker Rating',
      value: stats.avgRating.toFixed(1),
      icon: <MdStar className="text-2xl text-orange-500" />,
      color: 'orange',
      change: '+0.3',
      changeType: 'increase'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {statCards.map((card) => (
        <div
          key={card.id}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">{card.label}</p>
              <h3 className="text-2xl font-bold text-gray-800">{card.value}</h3>
              <div className="flex items-center gap-1 mt-2">
                <span className={`text-xs font-medium ${
                  card.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {card.change}
                </span>
                <span className="text-xs text-gray-500">from last month</span>
              </div>
            </div>
            <div className={`p-2 bg-${card.color}-50 rounded-lg`}>
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerStatsGrid;