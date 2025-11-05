import { useState, useCallback } from 'react';

export const useTextToSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);

  const loadVoices = useCallback(() => {
    if ('speechSynthesis' in window) {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    }
  }, []);

  const speak = useCallback((text, options = {}) => {
    if (!text || !window.speechSynthesis) return;

    const {
      rate = 1,
      pitch = 1,
      volume = 1,
      voice = null
    } = options;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;
    
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const pause = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.pause();
    }
  }, []);

  const resume = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.resume();
    }
  }, []);

  // Load voices when component mounts
  useState(() => {
    if ('speechSynthesis' in window) {
      loadVoices();
      // Some browsers load voices asynchronously
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  });

  return {
    isSpeaking,
    voices,
    loadVoices,
    speak,
    stop,
    pause,
    resume,
    browserSupportsSpeechSynthesis: 'speechSynthesis' in window
  };
};