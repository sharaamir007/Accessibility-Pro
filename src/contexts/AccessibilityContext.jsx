import React, { createContext, useContext, useState } from 'react';

const AccessibilityContext = createContext();

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

export const AccessibilityProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState('medium');
  const [highContrast, setHighContrast] = useState(false);
  const [voiceGuidance, setVoiceGuidance] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  const fontSizeValues = {
    small: '14px',
    medium: '16px',
    large: '18px',
    xlarge: '20px'
  };

  const toggleHighContrast = () => {
    setHighContrast(prev => !prev);
  };

  const toggleVoiceGuidance = () => {
    setVoiceGuidance(prev => !prev);
  };

  const toggleReducedMotion = () => {
    setReducedMotion(prev => !prev);
  };

  const value = {
    fontSize,
    setFontSize,
    highContrast,
    toggleHighContrast,
    voiceGuidance,
    toggleVoiceGuidance,
    reducedMotion,
    toggleReducedMotion,
    fontSizeValues
  };

  return (
    <AccessibilityContext.Provider value={value}>
      <div 
        className={`min-h-screen transition-colors duration-300 ${
          highContrast 
            ? 'bg-black text-white' 
            : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
        }`}
        style={{ fontSize: fontSizeValues[fontSize] }}
      >
        {children}
      </div>
    </AccessibilityContext.Provider>
  );
};