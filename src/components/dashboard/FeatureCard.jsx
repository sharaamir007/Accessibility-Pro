import React from 'react';

const FeatureCard = ({ icon, title, description, onClick, gradient, isActive = false }) => {
  return (
    <div 
      className={`bg-white rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-2 cursor-pointer ${
        isActive 
          ? 'border-blue-500 shadow-blue-100' 
          : 'border-gray-100 hover:shadow-xl'
      }`}
      onClick={onClick}
    >
      <div className={`h-1 ${gradient}`}></div>
      <div className="p-5">
        <div className="flex items-start space-x-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl ${
            isActive ? 'scale-110' : ''
          } transition-transform ${gradient}`}>
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;