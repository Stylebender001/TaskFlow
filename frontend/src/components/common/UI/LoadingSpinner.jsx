import React from 'react';

const LoadingSpinner = ({ size = 'md', color = 'blue' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
    xl: 'w-16 h-16 border-4'
  };

  const colorClasses = {
    blue: 'border-blue-200 border-t-blue-600',
    purple: 'border-purple-200 border-t-purple-600',
    green: 'border-green-200 border-t-green-600',
    gray: 'border-gray-200 border-t-gray-600'
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-spin`}
      />
      <p className="mt-2 text-gray-600 text-sm">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;