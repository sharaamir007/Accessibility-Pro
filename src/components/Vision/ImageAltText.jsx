import React, { useState, useRef } from 'react';
import { Upload, Image, Download, Trash2, Sparkles, Text, AlertCircle, Check, X } from 'lucide-react';

const ImageAltText = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [testResult, setTestResult] = useState(null);
  const [fileName, setFileName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    console.log('📁 File selected:', file);
    
    if (file && file.type.startsWith('image/')) {
      if (file.size > 10 * 1024 * 1024) {
        setError('Image size too large. Please select an image under 10MB.');
        return;
      }
      
      setError('');
      setFileName(file.name);
      setImageFile(file); // Store the actual file object
      
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log('🖼️ Image loaded successfully');
        setSelectedImage(e.target.result);
      };
      
      reader.onerror = (error) => {
        console.error('❌ File reading error:', error);
        setError('Failed to read the image file. Please try another image.');
      };
      
      reader.readAsDataURL(file);
    } else {
      setError('Please select a valid image file (PNG, JPG, JPEG, GIF, WEBP, BMP)');
    }
  };

  // Test Tesseract
  const testTesseract = async () => {
    setTestResult('testing');
    console.log('🧪 Testing Tesseract.js...');
    
    try {
      const { createWorker } = await import('tesseract.js');
      
      const worker = await createWorker('eng', 1, {
        logger: m => console.log('Test progress:', m)
      });
      
      console.log('✅ Worker created successfully');
      await worker.terminate();
      console.log('✅ Worker terminated successfully');
      
      setTestResult('success');
      setTimeout(() => setTestResult(null), 3000);
      return true;
      
    } catch (testError) {
      console.error('❌ Tesseract test failed:', testError);
      setTestResult('failed');
      setError(`Tesseract test failed: ${testError.message || 'Unknown error'}`);
      setTimeout(() => setTestResult(null), 5000);
      return false;
    }
  };

  const extractTextFromImage = async () => {
    if (!selectedImage || !imageFile) {
      setError('Please upload an image first');
      return;
    }
    
    console.log('🚀 Starting OCR process...');
    console.log('📄 Image file:', imageFile);
    
    setIsProcessing(true);
    setProgress(0);
    setExtractedText('');
    setError('');
    
    try {
      const { createWorker } = await import('tesseract.js');
      
      console.log('👷 Creating Tesseract worker...');
      const worker = await createWorker('eng', 1, {
        logger: m => {
          console.log('📊 Tesseract progress:', m);
          if (m.status === 'recognizing text') {
            setProgress(Math.round(m.progress * 100));
          }
        }
      });

      console.log('🔍 Recognizing text from image file...');
      
      // Use the actual File object instead of data URL
      const result = await worker.recognize(imageFile);
      console.log('📝 OCR Result:', result);
      
      const text = result.data.text.trim();
      console.log('📝 Extracted text:', text);
      
      console.log('🛑 Terminating worker...');
      await worker.terminate();
      
      if (text && text.length > 10) { // Check if we got meaningful text
        setExtractedText(text);
        console.log('✅ Text extraction successful');
      } else {
        setExtractedText('No readable text could be detected in this image. The image might not contain clear text, or the text might be too small/blurry.\n\nTry:\n• Images with clear, printed text\n• Higher resolution images\n• Better lighting and contrast');
        console.log('⚠️ No meaningful text detected in image');
      }
      
      setIsProcessing(false);
      setProgress(0);
      
    } catch (error) {
      console.error('💥 OCR Error Details:', error);
      
      let errorMessage = 'OCR processing failed: ';
      if (error.message) {
        errorMessage += error.message;
      } else {
        errorMessage += 'Unable to process the image. The image format might not be supported.';
      }
      
      // Additional troubleshooting based on error type
      if (error.message.includes('SetImageFile')) {
        errorMessage += '\n\nTroubleshooting:\n• Try a different image format (PNG or JPG work best)\n• Ensure the image is not corrupted\n• Try a smaller image file';
      }
      
      setError(errorMessage);
      setExtractedText('');
      setIsProcessing(false);
      setProgress(0);
    }
  };

  // Simple text extraction that works reliably
  const extractTextSimple = async () => {
    if (!selectedImage || !imageFile) {
      setError('Please upload an image first');
      return;
    }
    
    console.log('🔄 Using simple OCR mode...');
    
    setIsProcessing(true);
    setProgress(0);
    setExtractedText('');
    setError('');
    
    try {
      const { createWorker } = await import('tesseract.js');
      
      // Simple worker without extra configuration
      const worker = await createWorker('eng');
      
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 10;
          if (newProgress >= 90) {
            clearInterval(progressInterval);
          }
          return newProgress;
        });
      }, 200);

      const result = await worker.recognize(imageFile);
      clearInterval(progressInterval);
      setProgress(100);
      
      await worker.terminate();
      
      const text = result.data.text.trim();
      
      if (text && text.length > 5) {
        setExtractedText(text);
      } else {
        setExtractedText(`OCR completed but no significant text was found.\n\nImage: ${fileName}\nStatus: Processed successfully\n\nTry images with:\n• Clear printed text\n• Good contrast\n• Standard fonts\n• Adequate size`);
      }
      
      setIsProcessing(false);
      setProgress(0);
      
    } catch (error) {
      console.error('Simple OCR failed:', error);
      setError(`OCR failed: ${error.message}. Using simulation mode instead.`);
      // Fall back to simulation
      extractTextFallback();
    }
  };

  // Fallback: Simple text extraction simulation
  const extractTextFallback = () => {
    if (!selectedImage) {
      setError('Please upload an image first');
      return;
    }
    
    console.log('🔄 Using simulation mode');
    
    setIsProcessing(true);
    setExtractedText('');
    setError('');
    
    // Simulate processing with progress
    let simProgress = 0;
    const progressInterval = setInterval(() => {
      simProgress += 10;
      setProgress(simProgress);
      if (simProgress >= 100) {
        clearInterval(progressInterval);
        
        const sampleTexts = [
          `OCR Simulation Result\n\nFile: ${fileName}\nStatus: Demo Mode\n\nThis demonstrates how OCR would extract text from your image. In production with proper setup, Tesseract.js would show the actual text content.\n\nSample extracted text might include:\n• Document titles and headers\n• Paragraphs of text\n• Contact information\n• Product descriptions`,

          `Image Text Extraction Demo\n\nImage: ${fileName}\nProcessing: Complete (Simulation)\n\nActual OCR would convert image text to editable content:\n\n"Welcome to Accessibility Pro"\n"123 Main Street, Suite 100"\n"Contact: info@example.com"\n"Making digital content accessible for everyone."`,

          `Demo OCR Output\n\nFile processed: ${fileName}\nText extraction simulation active\n\nFeatures demonstrated:\n✓ Image upload and preview\n✓ Text extraction interface\n✓ Copy and download functionality\n✓ Progress tracking\n\nReal OCR would provide the actual text content from your image.`
        ];
        
        const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
        setExtractedText(randomText);
        setIsProcessing(false);
        setProgress(0);
      }
    }, 150);
  };

  const clearImage = () => {
    console.log('🗑️ Clearing image');
    setSelectedImage(null);
    setExtractedText('');
    setError('');
    setFileName('');
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const copyText = () => {
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
        <Image className="mr-3 text-cyan-500" size={28} />
        Image Text Extractor (OCR)
      </h2>

      {/* Debug Section */}
      <div className="bg-gray-100 rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-800 text-sm">Tesseract.js Status</h3>
            <p className="text-gray-600 text-xs">
              {selectedImage ? `Image loaded: ${fileName}` : 'No image selected'}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            {testResult === 'testing' && (
              <div className="flex items-center space-x-2 text-blue-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span className="text-sm">Testing...</span>
              </div>
            )}
            {testResult === 'success' && (
              <div className="flex items-center space-x-2 text-green-600">
                <Check size={16} />
                <span className="text-sm">Tesseract OK!</span>
              </div>
            )}
            {testResult === 'failed' && (
              <div className="flex items-center space-x-2 text-red-600">
                <X size={16} />
                <span className="text-sm">Tesseract Failed</span>
              </div>
            )}
            <button
              onClick={testTesseract}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              Test Tesseract
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start space-x-3">
          <AlertCircle className="text-red-500 mt-0.5 flex-shrink-0" size={20} />
          <div className="flex-1">
            <h4 className="font-semibold text-red-800">Error</h4>
            <p className="text-red-700 text-sm whitespace-pre-wrap">{error}</p>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => setError('')}
                className="text-red-600 hover:text-red-800 text-xs bg-red-100 px-2 py-1 rounded"
              >
                Dismiss
              </button>
              <button
                onClick={extractTextSimple}
                className="text-green-600 hover:text-green-800 text-xs bg-green-100 px-2 py-1 rounded"
              >
                Try Simple OCR
              </button>
              <button
                onClick={extractTextFallback}
                className="text-blue-600 hover:text-blue-800 text-xs bg-blue-100 px-2 py-1 rounded"
              >
                Use Simulation
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Image Upload */}
        <div className="space-y-4">
          <div className={`border-2 border-dashed rounded-2xl p-6 text-center transition-colors min-h-[300px] flex items-center justify-center ${
            selectedImage ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-cyan-400'
          }`}>
            {selectedImage ? (
              <div className="space-y-4 w-full">
                <div className="relative">
                  <img 
                    src={selectedImage} 
                    alt="Uploaded for text extraction" 
                    className="max-h-64 max-w-full rounded-lg mx-auto shadow-lg object-contain border-2 border-green-200"
                  />
                  <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    ✓ Loaded
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <p><strong>File:</strong> {fileName}</p>
                  <p><strong>Type:</strong> {imageFile?.type || 'Unknown'}</p>
                  <p><strong>Size:</strong> {(imageFile?.size / 1024).toFixed(1)} KB</p>
                </div>
                <button
                  onClick={clearImage}
                  className="text-red-500 hover:text-red-700 transition-colors flex items-center justify-center space-x-2 mx-auto border border-red-200 px-4 py-2 rounded-lg"
                >
                  <Trash2 size={16} />
                  <span>Remove Image</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto">
                  <Upload className="text-cyan-500" size={32} />
                </div>
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                    id="image-upload"
                  />
                  <label 
                    htmlFor="image-upload"
                    className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer inline-block"
                  >
                    Choose Image File
                  </label>
                  <p className="text-gray-600 mt-2 text-sm">
                    Click to select an image file
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    PNG, JPG, JPEG, GIF, WEBP, BMP
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {selectedImage && (
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={extractTextFromImage}
                  disabled={isProcessing}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 text-white font-semibold py-3 px-2 rounded-xl transition-all duration-300 flex items-center justify-center space-x-1"
                >
                  <Sparkles size={16} />
                  <span className="text-xs">Advanced OCR</span>
                </button>
                
                <button
                  onClick={extractTextSimple}
                  disabled={isProcessing}
                  className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 disabled:opacity-50 text-white font-semibold py-3 px-2 rounded-xl transition-all duration-300 flex items-center justify-center space-x-1"
                >
                  <Text size={16} />
                  <span className="text-xs">Simple OCR</span>
                </button>
                
                <button
                  onClick={extractTextFallback}
                  disabled={isProcessing}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 text-white font-semibold py-3 px-2 rounded-xl transition-all duration-300 flex items-center justify-center space-x-1"
                >
                  <Image size={16} />
                  <span className="text-xs">Simulation</span>
                </button>
              </div>
              
              {isProcessing && (
                <div className="space-y-2 bg-blue-50 p-4 rounded-lg">
                  <div className="flex justify-between text-sm text-blue-700">
                    <span>Processing image...</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-blue-600 text-center">
                    {progress < 100 ? 'Analyzing image content...' : 'Finalizing text extraction...'}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column - Results */}
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm h-full">
            <h3 className="font-semibold text-gray-700 mb-4 flex items-center">
              <Text className="mr-2 text-cyan-500" size={18} />
              Extracted Text
            </h3>
            
            {extractedText ? (
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 min-h-[200px] max-h-80 overflow-y-auto">
                  <pre className="text-gray-800 leading-relaxed whitespace-pre-wrap font-sans text-sm">
                    {extractedText}
                  </pre>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={copyText}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <Download size={16} />
                    <span>Copy Text</span>
                  </button>
                  <button
                    onClick={downloadText}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <Download size={16} />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <Text size={48} className="mx-auto mb-4 text-gray-300" />
                <p>Upload an image and choose an extraction method</p>
                <p className="text-sm mt-2">
                  <span className="text-cyan-500">Advanced:</span> Full OCR<br/>
                  <span className="text-purple-500">Simple:</span> Basic OCR<br/>
                  <span className="text-green-500">Simulation:</span> Demo mode
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-blue-50 rounded-2xl p-6">
        <h3 className="font-semibold text-blue-800 mb-3">💡 Tips for Best Results</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
          <div>
            <h4 className="font-medium mb-2">🖼️ Image Quality</h4>
            <ul className="space-y-1">
              <li>• Use PNG or JPG format</li>
              <li>• Clear, high-contrast images</li>
              <li>• Good lighting, no shadows</li>
              <li>• Straight-on photos (not angled)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">📝 Text Quality</h4>
            <ul className="space-y-1">
              <li>• Printed text works best</li>
              <li>• Standard fonts (Arial, Times)</li>
              <li>• Font size 12pt or larger</li>
              <li>• Minimal background noise</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageAltText;