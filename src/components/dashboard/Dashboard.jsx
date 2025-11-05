import React, { useState } from 'react';
import FeatureCard from './FeatureCard';
import SpeechToText from '../speech/SpeechToText';
import TextToSpeech from '../speech/TextToSpeech';
import ImageAltText from '../vision/ImageAltText';
import OCRTextExtractor from '../vision/OCRTextExtractor';
import ColorContrast from '../vision/ColorContrast';
import AccessibilityControls from '../common/AccessibilityControls';
import { Mic, Volume2, Eye, Scan, Palette, Settings } from 'lucide-react';

const Dashboard = () => {
  const features = [
    {
      id: 'speech-to-text',
      icon: <Mic size={24} />,
      title: 'Speech to Text',
      description: 'Convert spoken words into written text with high accuracy',
      gradient: 'bg-gradient-to-r from-green-400 to-blue-500',
      component: <SpeechToText />
    },
    {
      id: 'text-to-speech',
      icon: <Volume2 size={24} />,
      title: 'Text to Speech',
      description: 'Convert written text into natural sounding speech',
      gradient: 'bg-gradient-to-r from-purple-400 to-pink-500',
      component: <TextToSpeech />
    },
    {
      id: 'image-alt-text',
      icon: <Eye size={24} />,
      title: 'Image Description',
      description: 'Generate alt text descriptions for images automatically',
      gradient: 'bg-gradient-to-r from-blue-400 to-cyan-500',
      component: <ImageAltText />
    },
    {
      id: 'ocr-extractor',
      icon: <Scan size={24} />,
      title: 'Document OCR',
      description: 'Extract text from PDF, Word documents, and images',
      gradient: 'bg-gradient-to-r from-orange-400 to-red-500',
      component: <OCRTextExtractor />
    },
    {
      id: 'color-contrast',
      icon: <Palette size={24} />,
      title: 'Color Contrast',
      description: 'Check and adjust color contrast for better readability',
      gradient: 'bg-gradient-to-r from-yellow-400 to-orange-500',
      component: <ColorContrast />
    },
    {
      id: 'accessibility-settings',
      icon: <Settings size={24} />,
      title: 'Accessibility Settings',
      description: 'Customize font size, contrast, and other accessibility options',
      gradient: 'bg-gradient-to-r from-gray-400 to-gray-600',
      component: <AccessibilityControls />
    }
  ];

  const [activeFeature, setActiveFeature] = useState(features[0]);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-800">
          Accessibility <span className="text-blue-600">Pro</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Empowering everyone with modern speech and vision accessibility tools
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Features Navigation */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Tools</h2>
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              gradient={feature.gradient}
              isActive={activeFeature.id === feature.id}
              onClick={() => setActiveFeature(feature)}
            />
          ))}
        </div>

        {/* Active Feature Display */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 min-h-[600px]">
            {activeFeature.component}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;