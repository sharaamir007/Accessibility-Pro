// OCR Utility Functions
export const extractTextFromImage = async (imageData) => {
  // Tesseract.js implementation
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

export const extractTextFromPDF = async (pdfData) => {
  // PDF.js implementation
  try {
    const pdfjs = await import('pdfjs-dist/webpack');
    const pdf = await pdfjs.getDocument({ data: pdfData }).promise;
    let fullText = '';
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map(item => item.str).join(' ');
      fullText += `Page ${i}: ${pageText}\n\n`;
    }
    
    return fullText.trim();
  } catch (error) {
    console.error('PDF Extraction Error:', error);
    throw new Error('Failed to extract text from PDF');
  }
};

export const extractTextFromWord = async (wordData) => {
  // Mammoth.js implementation
  try {
    const mammoth = await import('mammoth');
    const { value } = await mammoth.extractRawText({ arrayBuffer: wordData });
    return value.trim();
  } catch (error) {
    console.error('Word Extraction Error:', error);
    throw new Error('Failed to extract text from Word document');
  }
};