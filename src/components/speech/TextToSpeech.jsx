import React, { useState } from 'react';
import { Volume2, Play, Square } from 'lucide-react';

const TextToSpeech = () => {
  const [text, setText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakText = () => {
    if (!text.trim()) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const clearText = () => {
    setText('');
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <Volume2 className="mr-3 text-purple-500" size={28} />
        Text to Speech
      </h2>

      <div className="space-y-4">
        <label className="text-sm font-semibold text-gray-700">Enter text to speak:</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here..."
          className="w-full h-40 p-4 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isSpeaking}
        />
      </div>

      <div className="flex space-x-4">
        <button
          onClick={speakText}
          disabled={!text.trim()}
          className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-3 ${
            isSpeaking
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isSpeaking ? <Square size={20} /> : <Play size={20} />}
          <span>{isSpeaking ? 'Stop' : 'Speak'}</span>
        </button>

        <button
          onClick={clearText}
          disabled={!text.trim()}
          className="px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Clear
        </button>
      </div>

      <div className="bg-blue-50 rounded-xl p-4">
        <h4 className="font-semibold text-blue-800 mb-2">Try these sample texts:</h4>
        <div className="space-y-2">
          {[
            "Hello! Welcome to our accessibility tool.",
            "This text will be converted to speech using your browser's capabilities.",
            "You can adjust the speed and pitch using the controls above."
          ].map((sample, index) => (
            <button
              key={index}
              onClick={() => setText(sample)}
              className="block w-full text-left p-2 rounded-lg hover:bg-blue-100 transition-colors text-blue-700 text-sm"
            >
              {sample}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TextToSpeech;