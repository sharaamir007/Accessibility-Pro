import { useState, useEffect } from 'react';

export const useAccessibility = () => {
  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem('accessibility-fontSize') || 'medium';
  });

  const [highContrast, setHighContrast] = useState(() => {
    return localStorage.getItem('accessibility-highContrast') === 'true';
  });

  const [voiceGuidance, setVoiceGuidance] = useState(() => {
    const stored = localStorage.getItem('accessibility-voiceGuidance');
    return stored ? stored === 'true' : true;
  });

  const [reducedMotion, setReducedMotion] = useState(() => {
    return localStorage.getItem('accessibility-reducedMotion') === 'true';
  });

  // Save to localStorage whenever settings change
  useEffect(() => {
    localStorage.setItem('accessibility-fontSize', fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('accessibility-highContrast', highContrast.toString());
  }, [highContrast]);

  useEffect(() => {
    localStorage.setItem('accessibility-voiceGuidance', voiceGuidance.toString());
  }, [voiceGuidance]);

  useEffect(() => {
    localStorage.setItem('accessibility-reducedMotion', reducedMotion.toString());
  }, [reducedMotion]);

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

  const resetSettings = () => {
    setFontSize('medium');
    setHighContrast(false);
    setVoiceGuidance(true);
    setReducedMotion(false);
  };

  return {
    fontSize,
    setFontSize,
    highContrast,
    toggleHighContrast,
    voiceGuidance,
    toggleVoiceGuidance,
    reducedMotion,
    toggleReducedMotion,
    fontSizeValues,
    resetSettings
  };
};