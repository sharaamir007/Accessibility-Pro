import React, { useState, useRef } from 'react';
import { Upload, FileText, Image, Download, Trash2, Scan } from 'lucide-react';

const OCRTextExtractor = () => {
  const [files, setFiles] = useState([]);
  const [extractedText, setExtractedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  const supportedFormats = [
    'image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/bmp', 'image/webp'
  ];

  const handleFileSelect = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const validFiles = selectedFiles.filter(file => 
      supportedFormats.includes(file.type)
    );
    
    if (validFiles.length > 0) {
      setFiles(prev => [...prev, ...validFiles]);
      processFiles(validFiles);
    } else {
      alert('Please select valid image files (PNG, JPG, JPEG, GIF, WEBP, BMP)');
    }
  };

  const processFiles = async (filesToProcess) => {
    setIsProcessing(true);
    setProgress(0);
    setExtractedText('');
    
    let allText = '';
    
    for (let i = 0; i < filesToProcess.length; i++) {
      const file = filesToProcess[i];
      setProgress(Math.round(((i + 1) / filesToProcess.length) * 100));
      
      try {
        const text = await extractTextFromFile(file);
        allText += `=== ${file.name} ===\n${text}\n\n`;
      } catch (error) {
        console.error(`Error processing ${file.name}:`, error);
        allText += `=== ${file.name} ===\nError: Could not extract text\n\n`;
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    setExtractedText(allText);
    setIsProcessing(false);
    setProgress(0);
  };

  const extractTextFromFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          let text = '';
          
          if (file.type.startsWith('image/')) {
            text = await extractTextFromImage(e.target.result);
          }
          
          resolve(text || 'No text could be extracted from this file.');
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  const extractTextFromImage = async (imageData) => {
    try {
      const { createWorker } = await import('tesseract.js');
      const worker = await createWorker('eng');
      const { data: { text } } = await worker.recognize(imageData);
      await worker.terminate();
      return text.trim();
    } catch (error) {
      console.error('OCR Error:', error);
      throw new Error('Failed to extract text from image');
    }
  };

  const clearFiles = () => {
    setFiles([]);
    setExtractedText('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(extractedText);
    alert('Text copied to clipboard!');
  };

  const downloadText = () => {
    const blob = new Blob([extractedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'extracted-text.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <Scan className="mr-3 text-blue-500" size={28} />
        Document & Image OCR
      </h2>

      <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept={supportedFormats.join(',')}
          multiple
          className="hidden"
        />
        
        <div className="space-y-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <Upload className="text-blue-500" size={32} />
          </div>
          
          <div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Choose Images
            </button>
            <p className="text-gray-600 mt-2">
              Supports: PNG, JPG, GIF, WEBP, BMP
            </p>
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-700">Selected Files</h3>
            <button
              onClick={clearFiles}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <Trash2 size={20} />
            </button>
          </div>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center space-x-3 text-sm text-gray-600">
                <FileText size={16} />
                <span>{file.name}</span>
                <span className="text-xs text-gray-500">
                  ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {isProcessing && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Processing files...</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {extractedText && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-700">Extracted Text</h3>
            <div className="flex space-x-2">
              <button
                onClick={copyToClipboard}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Download size={16} />
                <span>Copy</span>
              </button>
              <button
                onClick={downloadText}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Download size={16} />
                <span>Download</span>
              </button>
            </div>
          </div>
          
          <div className="bg-gray-900 text-green-400 rounded-xl p-4 font-mono text-sm max-h-96 overflow-y-auto">
            <pre className="whitespace-pre-wrap">{extractedText}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default OCRTextExtractor;