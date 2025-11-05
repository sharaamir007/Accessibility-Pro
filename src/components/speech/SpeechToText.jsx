import React, { useState } from 'react';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';
import { Mic, Square, Copy, Trash2 } from 'lucide-react';

const SpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const { 
    transcript, 
    startListening, 
    stopListening, 
    resetTranscript,
    browserSupportsSpeechRecognition 
  } = useSpeechRecognition();

  const handleListen = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
    setIsListening(!isListening);
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(transcript);
    alert('Text copied to clipboard!');
  };

  const handleClearText = () => {
    resetTranscript();
  };

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <span className="w-3 h-3 bg-red-500 rounded-full mr-3"></span>
          Speech to Text
        </h2>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mic className="text-red-500" size={32} />
          </div>
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Browser Not Supported
          </h3>
          <p className="text-red-600">
            Your browser doesn't support speech recognition. 
            Please try Chrome, Edge, or Safari for the best experience.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <span className={`w-3 h-3 rounded-full mr-3 ${isListening ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></span>
        Speech to Text
      </h2>
      
      <div className="space-y-6">
        {/* Recording Button */}
        <div className="flex justify-center">
          <button
            onClick={handleListen}
            className={`w-24 h-24 rounded-full flex items-center justify-center text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${
              isListening 
                ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
            }`}
          >
            {isListening ? (
              <Square size={32} />
            ) : (
              <Mic size={32} />
            )}
          </button>
        </div>

        {/* Status Indicator */}
        <div className="text-center">
          <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium ${
            isListening 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-600'
          }`}>
            <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
            <span>{isListening ? 'Listening... Speak now' : 'Ready to listen'}</span>
          </div>
        </div>

        {/* Transcript Display */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 min-h-[200px]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Transcript</h3>
            <div className="flex space-x-2">
              <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
                {transcript.length} characters
              </span>
            </div>
          </div>
          <div className="max-h-60 overflow-y-auto">
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap min-h-[100px]">
              {transcript || (
                <span className="text-gray-400 italic">
                  Start speaking to see your transcript here. 
                  The text will appear in real-time as you speak.
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={handleClearText}
            disabled={!transcript}
            className="flex-1 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 text-gray-700 py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <Trash2 size={18} />
            <span>Clear</span>
          </button>
          <button
            onClick={handleCopyText}
            disabled={!transcript}
            className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <Copy size={18} />
            <span>Copy Text</span>
          </button>
        </div>

        {/* Tips Section */}
        <div className="bg-blue-50 rounded-2xl p-4">
          <h4 className="font-semibold text-blue-800 text-sm mb-2">💡 Tips for Better Results</h4>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>• Speak clearly and at a moderate pace</li>
            <li>• Use a quiet environment with minimal background noise</li>
            <li>• Keep the microphone close to your mouth</li>
            <li>• Use punctuation commands like "period", "comma", "new paragraph"</li>
          </ul>
        </div>

        {/* Browser Support Info */}
        <div className="bg-green-50 rounded-2xl p-4">
          <h4 className="font-semibold text-green-800 text-sm mb-2">✅ Browser Compatibility</h4>
          <div className="grid grid-cols-2 gap-2 text-green-700 text-sm">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Chrome</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Edge</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Safari</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>Firefox*</span>
            </div>
          </div>
          <p className="text-green-600 text-xs mt-2">* Firefox may require additional permissions</p>
        </div>
      </div>
    </div>
  );
};

export default SpeechToText;