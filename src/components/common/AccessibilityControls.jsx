import React from 'react';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { Text, Eye, Volume2, Zap } from 'lucide-react';

const AccessibilityControls = () => {
  const {
    fontSize,
    setFontSize,
    highContrast,
    toggleHighContrast,
    voiceGuidance,
    toggleVoiceGuidance,
    reducedMotion,
    toggleReducedMotion
  } = useAccessibility();

  const controlItems = [
    {
      icon: <Text size={20} />,
      title: 'Font Size',
      description: 'Adjust the text size for better readability',
      control: (
        <select
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
          <option value="xlarge">Extra Large</option>
        </select>
      )
    },
    {
      icon: <Eye size={20} />,
      title: 'High Contrast',
      description: 'Increase color contrast for better visibility',
      control: (
        <button
          onClick={toggleHighContrast}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            highContrast ? 'bg-blue-600' : 'bg-gray-200'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              highContrast ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <Zap className="mr-3 text-gray-600" size={28} />
        Accessibility Settings
      </h2>

      <div className="grid grid-cols-1 gap-6">
        {controlItems.map((item, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-gray-700 rounded-lg flex items-center justify-center text-white">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
              <div>
                {item.control}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccessibilityControls;