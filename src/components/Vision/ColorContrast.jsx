import React from 'react';
import { Contrast } from 'lucide-react';

const ColorContrast = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <Contrast className="mr-3 text-purple-500" size={28} />
        Color Contrast Checker
      </h2>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center">
        <p className="text-gray-600">
          Color contrast analysis tools will appear here.
        </p>
      </div>
    </div>
  );
};

export default ColorContrast;