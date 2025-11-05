import React from 'react';
import { TrendingUp } from 'lucide-react';

const StatsCard = ({ title, value, trend, color = 'blue' }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    red: 'from-red-500 to-red-600'
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
      <div className="flex items-end justify-between">
        <div className="text-3xl font-bold text-gray-800">{value}</div>
        {trend && (
          <div className={`flex items-center space-x-1 text-sm ${
            trend.startsWith('+') ? 'text-green-500' : 'text-red-500'
          }`}>
            <TrendingUp size={16} />
            <span>{trend}</span>
          </div>
        )}
      </div>
      <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full bg-gradient-to-r ${colorClasses[color]}`}
          style={{ 
            width: value.includes('%') 
              ? value 
              : `${Math.min(parseInt(value) / 20 * 100, 100)}%` 
          }}
        ></div>
      </div>
    </div>
  );
};

export default StatsCard;