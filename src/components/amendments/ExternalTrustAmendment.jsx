import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Input, Button } from '../common';
import Tesseract from 'tesseract.js';
import * as pdfjsLib from 'pdfjs-dist';
import {
  generateAmendmentId,
  saveAmendment,
  uploadAmendmentPDF,
  getOrdinalName
} from '../../services/amendmentService';
import {
  generateAmendmentPDF,
  previewAmendmentPDF
} from '../../services/amendmentPDFService';
import { saveClientData, generateClientId } from '../../services/firestoreService';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../services/firebase';

// Configure PDF.js worker - use unpkg CDN with correct version
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

const ExternalTrustAmendment = () => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [ocrProgress, setOcrProgress] = useState(0);
  const [ocrStatus, setOcrStatus] = useState('');
  const [processing, setProcessing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [selectedArticles, setSelectedArticles] = useState([]); // Array of indices of selected articles

  const [extractedData, setExtractedData] = useState({
    trustName: '',
    trustorName: '',
    trusteeName: '',
    originalTrustDate: '',
    ocrText: '',
    parsedArticles: [] // Array of {articleNumber, title, content}
  });

  const [clientData, setClientData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const [amendmentData, setAmendmentData] = useState({
    amendmentNumber: 1,
    amendmentDate: new Date().toISOString().split('T')[0],
    executionDate: new Date().toISOString().split('T')[0],
    sections: [
      {
        articleNumber: '',
        sectionTitle: '',
        sectionText: ''
      }
    ],
    scheduleOfAssets: ''
  });

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.type.startsWith('image/')) {
      setError('Please upload a PDF or image file');
      return;
    }

    setUploadedFile(file);
    setError('');
  };

  /**
   * Convert PDF page to enhanced image for OCR
   */
  const convertPDFPageToImage = async (pdf, pageNumber) => {
    const page = await pdf.getPage(pageNumber);

    // Use higher scale for better OCR quality
    const scale = 3.0;
    const viewport = page.getViewport({ scale });

    // Create canvas
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Fill with white background
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Render PDF page to canvas
    await page.render({
      canvasContext: context,
      viewport: viewport
    }).promise;

    // Enhance image for better OCR - convert to black & white
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const gray = 0.299 * r + 0.587 * g + 0.114 * b;
      const threshold = 128;
      const newValue = gray > threshold ? 255 : 0;
      data[i] = newValue;
      data[i + 1] = newValue;
      data[i + 2] = newValue;
    }

    context.putImageData(imageData, 0, 0);
    return canvas.toDataURL('image/png');
  };

  /**
   * Convert PDF first 3 pages to images and perform OCR on all
   */
  const convertPDFToImage = async (pdfFile) => {
    try {
      // Read PDF file as array buffer
      const arrayBuffer = await pdfFile.arrayBuffer();

      // Load PDF document
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      console.log('PDF loaded. Total pages:', pdf.numPages);

      // Process first 3 pages (or fewer if document is shorter)
      const pagesToProcess = Math.min(3, pdf.numPages);
      const imageUrls = [];

      for (let i = 1; i <= pagesToProcess; i++) {
        setOcrStatus(`Converting page ${i} of ${pagesToProcess} to image...`);
        const imageUrl = await convertPDFPageToImage(pdf, i);
        imageUrls.push(imageUrl);
        console.log(`Page ${i} converted to image`);
      }

      return imageUrls;

    } catch (err) {
      console.error('Error converting PDF to image:', err);
      throw new Error(`Failed to convert PDF: ${err.message}`);
    }
  };

  /**
   * Extract text directly from PDF (much faster and more accurate than OCR)
   */
  const extractTextFromPDF = async (pdfFile) => {
    try {
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      console.log('PDF loaded. Total pages:', pdf.numPages);

      // Extract text from ALL pages to get the complete trust document
      const pagesToRead = pdf.numPages;
      let allText = '';

      for (let i = 1; i <= pagesToRead; i++) {
        setOcrStatus(`Extracting text from page ${i} of ${pagesToRead}...`);
        setOcrProgress(Math.round((i / pagesToRead) * 100));

        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();

        // Combine all text items - preserve some structure with line breaks
        const pageText = textContent.items.map(item => item.str).join(' ');
        allText += pageText + '\n\n--- PAGE BREAK ---\n\n';

        if (i % 10 === 0) {
          console.log(`Processed ${i} of ${pagesToRead} pages...`);
        }
      }

      console.log('Total extracted text length:', allText.length);
      console.log('First 1000 characters:', allText.substring(0, 1000));

      return allText;
    } catch (err) {
      console.error('Error extracting text from PDF:', err);
      throw err;
    }
  };

  /**
   * Parse all articles/sections from the trust document text
   */
  const parseArticles = (text) => {
    const articles = [];

    // Split by page breaks to process
    const pages = text.split('--- PAGE BREAK ---');

    // Find where the actual trust content starts (after TOC)
    // Look for a page that has substantial article content, not just TOC
    let trustContentPages = pages.filter(page => {
      // Skip if it's mostly table of contents (has lots of dots and page numbers)
      const tocDensity = (page.match(/\.{3,}/g) || []).length;
      const pageLength = page.length;
      return pageLength > 500 && tocDensity < 10; // Real content pages
    });

    const mainContent = trustContentPages.join('\n\n');
    console.log('Starting article parsing, filtered content length:', mainContent.length);
    console.log('Sample content:', mainContent.substring(0, 500));

    // Match articles with various formats - simpler regex
    // Look for "Article [Word/Number] [Title]" followed by content
    const articleRegex = /Article\s+(One|Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten|Eleven|Twelve|Thirteen|Fourteen|Fifteen|Sixteen|Seventeen|Eighteen|Nineteen|Twenty|[IVX]+|\d+)\s+([^\n]+?)\s+Section/gi;

    let match;
    while ((match = articleRegex.exec(mainContent)) !== null) {
      const articleNumber = match[1];
      const title = match[2].trim();

      // Skip TOC entries (they have lots of dots or are very short)
      if (title.includes('....') || title.length < 5) {
        continue;
      }

      // Extract content for this article
      const contentStart = match.index;

      // Find the next article or end of document
      const remainingText = mainContent.substring(contentStart + match[0].length);
      const nextArticleMatch = remainingText.match(/Article\s+(?:One|Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten|Eleven|Twelve|Thirteen|Fourteen|Fifteen|Sixteen|Seventeen|Eighteen|Nineteen|Twenty|[IVX]+|\d+)\s+/i);

      let contentEnd = mainContent.length;
      if (nextArticleMatch) {
        contentEnd = contentStart + match[0].length + nextArticleMatch.index;
      }

      const content = mainContent.substring(contentStart, contentEnd).trim();

      // Only include if it has substantial content
      if (content.length > 200) {
        articles.push({
          articleNumber: articleNumber.toUpperCase(),
          title: title.replace(/\s+/g, ' ').trim(),
          content: content.substring(0, 3000) // Limit to first 3000 chars
        });
      }
    }

    console.log(`Parsed ${articles.length} articles from trust`);
    articles.forEach((article, index) => {
      console.log(`Article ${index + 1}: ${article.articleNumber} - ${article.title.substring(0, 50)}...`);
    });

    return articles;
  };

  const handleOCR = async () => {
    if (!uploadedFile) {
      setError('Please upload a file first');
      return;
    }

    setProcessing(true);
    setError('');
    setOcrStatus('Starting extraction...');
    setOcrProgress(0);

    try {
      let allText = '';

      // Handle PDF files - extract text directly (fast and accurate)
      if (uploadedFile.type === 'application/pdf') {
        setOcrStatus('Extracting text from PDF...');
        allText = await extractTextFromPDF(uploadedFile);
        console.log('Total extracted text length:', allText.length);
      } else {
        // Handle image files with OCR
        const imageUrl = URL.createObjectURL(uploadedFile);

        setOcrStatus('Running OCR on image...');
        const { data: { text } } = await Tesseract.recognize(
          imageUrl,
          'eng',
          {
            logger: (m) => {
              if (m.status === 'recognizing text') {
                setOcrProgress(Math.round(m.progress * 100));
                setOcrStatus(`Processing: ${Math.round(m.progress * 100)}%`);
              }
            }
          }
        );

        allText = text;
        URL.revokeObjectURL(imageUrl);
      }

      const text = allText;

      // Parse all articles from the trust document
      setOcrStatus('Parsing trust articles...');
      const parsedArticles = parseArticles(text);

      // Extract information using comprehensive regex patterns
      const extracted = {
        trustName: '',
        trustorName: '',
        trusteeName: '',
        originalTrustDate: '',
        ocrText: text,
        parsedArticles: parsedArticles
      };

      console.log('OCR Text Length:', text.length);
      console.log('OCR Text Preview:', text.substring(0, 500));

      // Clean up text - remove extra spaces and normalize
      const cleanText = text.replace(/\s+/g, ' ').trim();

      // Remove table of contents sections to avoid false matches
      // Look for text that has lots of dots (typical TOC formatting)
      const textWithoutTOC = cleanText.replace(/\.{3,}/g, '');

      // === TRUST NAME EXTRACTION ===
      // Try multiple patterns for trust names - be very specific to avoid TOC matches
      const trustNamePatterns = [
        // Match full trust name with "THE" prefix
        /THE\s+([A-Z][A-Z\s&.]+?)\s+(LIVING|REVOCABLE|FAMILY|IRREVOCABLE)\s+TRUST(?!\s+Succession)/i,
        // Match trust agreement header format
        /^THE\s+([A-Z][A-Z\s&.]+?LIVING\s+TRUST)/im,
        // Match in context of trust agreement
        /(?:trust\s+agreement|this\s+trust).*?(?:known\s+as|called)?\s+["\u201c]?THE\s+([A-Z][A-Z\s&.]+?LIVING\s+TRUST)["\u201d]?/i
      ];

      for (const pattern of trustNamePatterns) {
        const match = textWithoutTOC.match(pattern);
        if (match && match[1]) {
          // If pattern includes "LIVING TRUST" in capture group, use it as-is
          // Otherwise, reconstruct the full name
          let trustName = match[1].trim();
          if (!trustName.toUpperCase().includes('TRUST')) {
            // Add "LIVING TRUST" if not already included
            const trustType = match[2] ? match[2].toUpperCase() : 'LIVING';
            trustName = `THE ${trustName} ${trustType} TRUST`;
          } else if (!trustName.startsWith('THE')) {
            trustName = `THE ${trustName}`;
          }
          extracted.trustName = trustName.toUpperCase();
          console.log('Found trust name:', extracted.trustName);
          break;
        }
      }

      // === TRUSTOR/GRANTOR NAME EXTRACTION ===
      // Look for trustor/grantor with very specific patterns to avoid TOC
      const trustorPatterns = [
        // Joint trust: "We, [NAME] and [NAME], as Grantors"
        /We,\s+([A-Z][a-z]+\s+[A-Z][a-z]+\s+and\s+[A-Z][a-z]+\s+[A-Z][a-z]+),\s+as\s+(?:the\s+)?(?:Trustors?|Grantors?|Settlors?)/i,
        // Joint trust: "[NAME] and [NAME], as Grantors"
        /(?<!Article\s)(?<!Section\s)([A-Z][a-z]+\s+[A-Z][a-z]+\s+and\s+[A-Z][a-z]+\s+[A-Z][a-z]+),\s+as\s+(?:the\s+)?(?:Trustors?|Grantors?|Settlors?)/i,
        // Extract from trust name if it contains "and"
        /^THE\s+([A-Z][a-z]+\s+[A-Z][a-z]+\s+(?:AND|and)\s+[A-Z][a-z]+\s+[A-Z][a-z]+)\s+LIVING\s+TRUST/im,
        // "made by and between [NAME], as Trustor/Grantor"
        /(?:made|entered)\s+(?:by\s+and\s+)?between\s+([A-Z][a-z]+(?:\s+[A-Z]\.?)?\s+[A-Z][a-z]+(?:\s+and\s+[A-Z][a-z]+(?:\s+[A-Z]\.?)?\s+[A-Z][a-z]+)?),?\s+as\s+(?:the\s+)?(?:Trustors?|Grantors?|Settlors?)/i,
        // "Grantor: [NAME]" or "Trustor: [NAME]"
        /(?:^|\n)\s*(?:Trustors?|Grantors?|Settlors?):\s*([A-Z][a-z]+(?:\s+[A-Z]\.?)?\s+[A-Z][a-z]+)/im,
        // "[NAME], as Trustor" (but not if preceded by "Article" or "Section")
        /(?<!Article\s)(?<!Section\s)([A-Z][a-z]+(?:\s+[A-Z]\.?)?\s+[A-Z][a-z]+(?:\s+and\s+[A-Z][a-z]+(?:\s+[A-Z]\.?)?\s+[A-Z][a-z]+)?),\s+as\s+(?:the\s+)?(?:Trustors?|Grantors?|Settlors?)/i,
        // "I, [NAME], as Grantor" or "We, [NAME], as Grantors"
        /(?:I|We),\s+([A-Z][a-z]+(?:\s+[A-Z]\.?)?\s+[A-Z][a-z]+(?:\s+and\s+[A-Z][a-z]+(?:\s+[A-Z]\.?)?\s+[A-Z][a-z]+)?),\s+(?:as\s+)?(?:the\s+)?(?:Trustors?|Grantors?|Settlors?)/i,
        // In trust agreement context
        /trust\s+agreement.*?(?:by|from)\s+([A-Z][a-z]+\s+[A-Z][a-z]+(?:\s+and\s+[A-Z][a-z]+\s+[A-Z][a-z]+)?)(?:,\s+as\s+(?:Trustors?|Grantors?))?/i
      ];

      for (const pattern of trustorPatterns) {
        const match = textWithoutTOC.match(pattern);
        if (match && match[1]) {
          const name = match[1].trim().replace(/\s+and\s+/i, ' and ');
          // Avoid matches that look like section titles
          if (!name.match(/(?:Succession|Provisions|Information|Status|Powers|Distribution)/i)) {
            extracted.trustorName = name;
            console.log('Found trustor name:', extracted.trustorName);
            break;
          }
        }
      }

      // FALLBACK: If trustor not found, try to extract from trust name
      if (!extracted.trustorName && extracted.trustName) {
        const trustNameMatch = extracted.trustName.match(/THE\s+([A-Z][a-z]+\s+[A-Z][a-z]+(?:\s+AND\s+[A-Z][a-z]+\s+[A-Z][a-z]+)?)\s+LIVING\s+TRUST/i);
        if (trustNameMatch) {
          extracted.trustorName = trustNameMatch[1].replace(/\s+AND\s+/i, ' and ');
          console.log('Extracted trustor from trust name:', extracted.trustorName);
        }
      }

      // === TRUSTEE NAME EXTRACTION ===
      // Look for trustee with very specific patterns to avoid TOC
      const trusteePatterns = [
        // "[NAME], as Trustee"
        /(?<!Article\s)(?<!Section\s)([A-Z][a-z]+(?:\s+[A-Z]\.?)?\s+[A-Z][a-z]+(?:\s+and\s+[A-Z][a-z]+(?:\s+[A-Z]\.?)?\s+[A-Z][a-z]+)?),\s+as\s+(?:the\s+)?(?:Initial\s+)?Trustee/i,
        // "Trustee: [NAME]"
        /(?:^|\n)\s*(?:Initial\s+)?Trustee:\s*([A-Z][a-z]+(?:\s+[A-Z]\.?)?\s+[A-Z][a-z]+)/im,
        // "and [NAME], as Trustee"
        /and\s+([A-Z][a-z]+(?:\s+[A-Z]\.?)?\s+[A-Z][a-z]+),\s+as\s+(?:the\s+)?(?:Initial\s+)?Trustee/i
      ];

      for (const pattern of trusteePatterns) {
        const match = textWithoutTOC.match(pattern);
        if (match && match[1]) {
          const candidate = match[1].trim().replace(/\s+and\s+/i, ' and ');
          // Avoid matches that look like section titles or random phrases
          if (!candidate.match(/(?:Succession|Provisions|Information|Status|Powers|Distribution|or principal|the trust)/i)) {
            extracted.trusteeName = candidate;
            console.log('Found trustee name:', extracted.trusteeName);
            break;
          }
        }
      }

      // If trustee not found, trustor often serves as initial trustee
      if (!extracted.trusteeName && extracted.trustorName) {
        extracted.trusteeName = extracted.trustorName;
        console.log('Using trustor as trustee (fallback):', extracted.trusteeName);
      }

      // === DATE EXTRACTION ===
      // Try multiple date patterns - look for dates in trust agreement context
      const datePatterns = [
        // "dated [date]" or "executed on [date]"
        /(?:trust\s+agreement|this\s+trust).*?(?:dated|executed|made).*?(?:on\s+)?(?:the\s+)?(\d{1,2}(?:st|nd|rd|th)?\s+day\s+of\s+[A-Z][a-z]+,?\s+\d{4})/i,
        /(?:trust\s+agreement|this\s+trust).*?(?:dated|executed|made).*?([A-Z][a-z]+\s+\d{1,2},?\s+\d{4})/i,
        // Date on cover page or header (not in TOC)
        /(?:^|\n)([A-Z][a-z]+\s+\d{1,2},?\s+\d{4})(?=\s+LAW OFFICES|$)/im,
        // General date patterns as fallback
        /(?:dated|executed|made|created).*?([A-Z][a-z]+\s+\d{1,2},?\s+\d{4})/i,
        /(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4})/,
        /(\d{4}-\d{2}-\d{2})/
      ];

      for (const pattern of datePatterns) {
        const match = cleanText.match(pattern);
        if (match && match[1]) {
          const dateStr = match[1].trim();
          console.log('Found date string:', dateStr);

          // Try to parse and format the date
          try {
            // Handle "day of Month, Year" format
            const dayOfMatch = dateStr.match(/(\d{1,2})(?:st|nd|rd|th)?\s+day\s+of\s+([A-Z][a-z]+),?\s+(\d{4})/i);
            if (dayOfMatch) {
              const parsedDate = new Date(`${dayOfMatch[2]} ${dayOfMatch[1]}, ${dayOfMatch[3]}`);
              if (!isNaN(parsedDate)) {
                extracted.originalTrustDate = parsedDate.toISOString().split('T')[0];
              }
            } else {
              const parsedDate = new Date(dateStr);
              if (!isNaN(parsedDate)) {
                extracted.originalTrustDate = parsedDate.toISOString().split('T')[0];
              } else {
                extracted.originalTrustDate = dateStr;
              }
            }
          } catch {
            extracted.originalTrustDate = dateStr;
          }

          if (extracted.originalTrustDate) {
            console.log('Parsed date to:', extracted.originalTrustDate);
            break;
          }
        }
      }

      console.log('Extraction results:', {
        trustName: extracted.trustName,
        trustorName: extracted.trustorName,
        trusteeName: extracted.trusteeName,
        originalTrustDate: extracted.originalTrustDate
      });

      setExtractedData(extracted);
      setOcrStatus('OCR completed successfully!');
      nextStep();

    } catch (err) {
      console.error('OCR Error:', err);
      setError(`OCR failed: ${err.message}`);
      setOcrStatus('OCR failed');
    } finally {
      setProcessing(false);
    }
  };

  const updateExtractedData = (updates) => {
    setExtractedData(prev => ({ ...prev, ...updates }));
  };

  const updateClientData = (updates) => {
    setClientData(prev => ({ ...prev, ...updates }));
  };

  const updateAmendmentData = (updates) => {
    setAmendmentData(prev => ({ ...prev, ...updates }));
  };

  const addSection = () => {
    setAmendmentData(prev => ({
      ...prev,
      sections: [
        ...prev.sections,
        { articleNumber: '', sectionTitle: '', sectionText: '' }
      ]
    }));
  };

  const removeSection = (index) => {
    if (amendmentData.sections.length > 1) {
      setAmendmentData(prev => ({
        ...prev,
        sections: prev.sections.filter((_, i) => i !== index)
      }));
    }
  };

  const updateSection = (index, field, value) => {
    setAmendmentData(prev => ({
      ...prev,
      sections: prev.sections.map((section, i) =>
        i === index ? { ...section, [field]: value } : section
      )
    }));
  };


  const toggleArticleSelection = (index) => {
    setSelectedArticles(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const handleArticleSelectionComplete = () => {
    // Populate amendment sections with selected articles
    if (selectedArticles.length > 0) {
      const newSections = selectedArticles.map(index => {
        const article = extractedData.parsedArticles[index];
        return {
          articleNumber: `ARTICLE ${article.articleNumber}`,
          sectionTitle: article.title,
          sectionText: article.content
        };
      });

      setAmendmentData(prev => ({
        ...prev,
        sections: newSections
      }));
    }
    // If no articles selected, keep the default empty section for manual entry

    nextStep();
  };

  const handlePreview = () => {
    const fullAmendmentData = {
      ...amendmentData,
      trustorName: extractedData.trustorName,
      trusteeName: extractedData.trusteeName,
      originalTrustDate: extractedData.originalTrustDate,
      trustName: extractedData.trustName
    };
    previewAmendmentPDF(fullAmendmentData);
  };

  const handleSaveWithClient = async () => {
    setSaving(true);
    setError('');

    try {
      // 1. Create client in database
      const clientId = generateClientId(clientData.firstName, clientData.lastName);

      // Upload original trust document to storage
      let originalTrustUrl = '';
      if (uploadedFile) {
        const trustFileName = `trusts/${clientId}/original_trust.pdf`;
        const trustRef = ref(storage, trustFileName);
        await uploadBytes(trustRef, uploadedFile);
        originalTrustUrl = await getDownloadURL(trustRef);
      }

      const newClientData = {
        client: {
          firstName: clientData.firstName,
          lastName: clientData.lastName,
          email: clientData.email,
          phone: clientData.phone
        },
        trustName: extractedData.trustName,
        trustDate: extractedData.originalTrustDate,
        trustType: 'external', // Mark as external trust
        isJoint: false,
        originalTrustDocument: originalTrustUrl
      };

      const clientResult = await saveClientData(clientId, newClientData);
      if (!clientResult.success) {
        throw new Error(clientResult.error);
      }

      // 2. Generate and upload amendment PDF
      const fullAmendmentData = {
        ...amendmentData,
        trustorName: extractedData.trustorName,
        trusteeName: extractedData.trusteeName,
        originalTrustDate: extractedData.originalTrustDate,
        trustName: extractedData.trustName
      };

      const pdfBlob = generateAmendmentPDF(fullAmendmentData);
      const amendmentId = generateAmendmentId(clientId, amendmentData.amendmentNumber);

      const uploadResult = await uploadAmendmentPDF(clientId, amendmentId, pdfBlob);
      if (!uploadResult.success) {
        throw new Error(uploadResult.error);
      }

      // 3. Save amendment to Firestore
      const amendmentDataToSave = {
        ...fullAmendmentData,
        pdfUrl: uploadResult.url,
        originalTrustDocumentUrl: originalTrustUrl
      };

      const amendmentResult = await saveAmendment(clientId, amendmentId, amendmentDataToSave);
      if (!amendmentResult.success) {
        throw new Error(amendmentResult.error);
      }

      alert('Client and amendment saved successfully!');
      navigate(`/client/${clientId}`);

    } catch (err) {
      console.error('Error saving:', err);
      setError(`Failed to save: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 5));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <Button variant="outline" onClick={() => navigate('/')} className="mb-4">
          ← Back to Home
        </Button>

        <h1 className="text-3xl font-bold text-gray-900">
          Create Amendment for External Trust
        </h1>
        <p className="text-gray-600 mt-2">
          Upload an existing trust document and create an amendment
        </p>
      </div>

      {/* Progress Steps */}
      <Card className="mb-6">
        <div className="flex items-center justify-between">
          {[
            { num: 1, label: 'Upload Trust' },
            { num: 2, label: 'Verify Info' },
            { num: 3, label: 'Client Info' },
            { num: 4, label: 'Amendment' },
            { num: 5, label: 'Review' }
          ].map((step, index) => (
            <div key={step.num} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    currentStep >= step.num
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step.num}
                </div>
                <div className="text-xs mt-2 text-center font-medium">
                  {step.label}
                </div>
              </div>
              {index < 4 && (
                <div
                  className={`h-1 flex-1 mx-2 ${
                    currentStep > step.num ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </Card>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Step 1: Upload Trust Document */}
      {currentStep === 1 && (
        <Card>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Upload Trust Document</h2>
          <p className="text-gray-600 mb-6">
            Upload the existing trust document (PDF or image). We'll use OCR to extract key information.
          </p>

          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> For PDF files with selectable text, we'll extract the complete trust document and parse all articles.
              For scanned PDFs or images, we'll use OCR technology. This allows you to select which specific articles you want to amend.
            </p>
            <p className="text-sm text-blue-800 mt-2">
              <strong>Processing time:</strong> Extraction takes a few seconds depending on document size. OCR may take longer for scanned images.
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Trust Document
            </label>
            <input
              type="file"
              accept=".pdf,image/*"
              onChange={handleFileUpload}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
            {uploadedFile && (
              <p className="mt-2 text-sm text-green-600">
                ✓ File selected: {uploadedFile.name} ({uploadedFile.type === 'application/pdf' ? 'PDF' : 'Image'})
              </p>
            )}
          </div>

          {ocrProgress > 0 && (
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-700">{ocrStatus}</span>
                <span className="text-sm text-gray-700">{ocrProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all"
                  style={{ width: `${ocrProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3">
            <Button
              variant="primary"
              onClick={handleOCR}
              loading={processing}
              disabled={!uploadedFile || processing}
            >
              {processing ? 'Processing...' : 'Extract Information with OCR'}
            </Button>
          </div>
        </Card>
      )}

      {/* Step 2: Verify Extracted Information & Select Articles */}
      {currentStep === 2 && (
        <Card>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Verify Information & Select Articles</h2>
          <p className="text-gray-600 mb-6">
            Review the extracted information and select which articles you want to amend.
          </p>

          {/* Trust Information */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Trust Information</h3>
            <div className="space-y-4">
              <Input
                label="Trust Name"
                value={extractedData.trustName}
                onChange={(e) => updateExtractedData({ trustName: e.target.value })}
                required
              />

              <Input
                label="Trustor Name"
                value={extractedData.trustorName}
                onChange={(e) => updateExtractedData({ trustorName: e.target.value })}
                required
              />

              <Input
                label="Trustee Name"
                value={extractedData.trusteeName}
                onChange={(e) => updateExtractedData({ trusteeName: e.target.value })}
                required
              />

              <Input
                label="Original Trust Date"
                type="date"
                value={extractedData.originalTrustDate}
                onChange={(e) => updateExtractedData({ originalTrustDate: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Article Selection */}
          {extractedData.parsedArticles && extractedData.parsedArticles.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Select Articles to Amend</h3>
              <p className="text-sm text-gray-600 mb-4">
                We found {extractedData.parsedArticles.length} articles in the trust. Select the ones you want to amend:
              </p>

              <div className="space-y-3 max-h-96 overflow-y-auto border border-gray-200 rounded-lg p-4">
                {extractedData.parsedArticles.map((article, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                      selectedArticles.includes(index)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                    onClick={() => toggleArticleSelection(index)}
                  >
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        checked={selectedArticles.includes(index)}
                        onChange={() => toggleArticleSelection(index)}
                        className="mt-1 mr-3"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">
                          Article {article.articleNumber}: {article.title}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {article.content.substring(0, 150)}...
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedArticles.length > 0 && (
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800">
                    ✓ {selectedArticles.length} article{selectedArticles.length > 1 ? 's' : ''} selected for amendment
                  </p>
                </div>
              )}
            </div>
          )}

          {extractedData.ocrText && (
            <details className="mb-6">
              <summary className="cursor-pointer text-sm font-semibold text-gray-700 mb-2">
                View Full Extracted Text
              </summary>
              <div className="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-200 max-h-60 overflow-y-auto">
                <pre className="text-xs whitespace-pre-wrap">{extractedData.ocrText.substring(0, 5000)}</pre>
              </div>
            </details>
          )}

          <div className="flex justify-between">
            <Button variant="outline" onClick={prevStep}>
              ← Back
            </Button>
            <Button
              variant="primary"
              onClick={handleArticleSelectionComplete}
            >
              Next: Client Info →
            </Button>
          </div>

          {extractedData.parsedArticles.length === 0 && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> No articles were automatically parsed from the trust. You can proceed
                and manually enter the amendment sections in the next steps.
              </p>
            </div>
          )}
        </Card>
      )}

      {/* Step 3: Client Information */}
      {currentStep === 3 && (
        <Card>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Client Information</h2>
          <p className="text-gray-600 mb-6">
            Enter the client's contact information to save in the database.
          </p>

          <div className="space-y-4">
            <Input
              label="First Name"
              value={clientData.firstName}
              onChange={(e) => updateClientData({ firstName: e.target.value })}
              required
            />

            <Input
              label="Last Name"
              value={clientData.lastName}
              onChange={(e) => updateClientData({ lastName: e.target.value })}
              required
            />

            <Input
              label="Email"
              type="email"
              value={clientData.email}
              onChange={(e) => updateClientData({ email: e.target.value })}
            />

            <Input
              label="Phone"
              type="tel"
              value={clientData.phone}
              onChange={(e) => updateClientData({ phone: e.target.value })}
            />
          </div>

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={prevStep}>
              ← Back
            </Button>
            <Button variant="primary" onClick={nextStep}>
              Next: Amendment Details →
            </Button>
          </div>
        </Card>
      )}

      {/* Step 4: Amendment Sections (reusing same UI from AmendmentForm) */}
      {currentStep === 4 && (
        <Card>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Edit Amendment Sections</h2>
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> The sections below have been pre-filled with the current text from the trust.
              Edit the text to reflect the changes you want to make. The amendment will replace the original
              section with your edited version.
            </p>
          </div>

          {amendmentData.sections.map((section, index) => (
            <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Section {index + 1}</h3>
                {amendmentData.sections.length > 1 && (
                  <Button
                    variant="outline"
                    onClick={() => removeSection(index)}
                    className="text-red-600 hover:bg-red-50"
                  >
                    Remove
                  </Button>
                )}
              </div>

              <div className="space-y-4">
                <Input
                  label="Article Number"
                  value={section.articleNumber}
                  onChange={(e) => updateSection(index, 'articleNumber', e.target.value)}
                />

                <Input
                  label="Section Title"
                  value={section.sectionTitle}
                  onChange={(e) => updateSection(index, 'sectionTitle', e.target.value)}
                />

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Section Text <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[150px]"
                    value={section.sectionText}
                    onChange={(e) => updateSection(index, 'sectionText', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          ))}

          <Button variant="outline" onClick={addSection} className="mb-6">
            + Add Another Section
          </Button>

          <Input
            label="Date of Execution"
            type="date"
            value={amendmentData.executionDate}
            onChange={(e) => updateAmendmentData({ executionDate: e.target.value })}
            required
          />

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={prevStep}>
              ← Back
            </Button>
            <Button variant="primary" onClick={nextStep}>
              Next: Review →
            </Button>
          </div>
        </Card>
      )}

      {/* Step 5: Review & Save */}
      {currentStep === 5 && (
        <Card>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Review & Save</h2>

          <div className="space-y-4 mb-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Trust Information</h3>
              <p className="text-sm text-gray-700"><strong>Trust Name:</strong> {extractedData.trustName}</p>
              <p className="text-sm text-gray-700"><strong>Trustor:</strong> {extractedData.trustorName}</p>
              <p className="text-sm text-gray-700"><strong>Trustee:</strong> {extractedData.trusteeName}</p>
              <p className="text-sm text-gray-700"><strong>Original Date:</strong> {extractedData.originalTrustDate}</p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Client Information</h3>
              <p className="text-sm text-gray-700"><strong>Name:</strong> {clientData.firstName} {clientData.lastName}</p>
              <p className="text-sm text-gray-700"><strong>Email:</strong> {clientData.email}</p>
              <p className="text-sm text-gray-700"><strong>Phone:</strong> {clientData.phone}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Amendment Sections ({amendmentData.sections.length})</h3>
              {amendmentData.sections.map((section, index) => (
                <div key={index} className="mb-2">
                  <p className="text-sm font-semibold text-gray-700">
                    {section.articleNumber} - {section.sectionTitle}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mb-6">
            <Button variant="outline" onClick={handlePreview} className="flex-1">
              👁️ Preview Amendment PDF
            </Button>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={prevStep}>
              ← Back
            </Button>
            <Button
              variant="primary"
              onClick={handleSaveWithClient}
              loading={saving}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Client & Amendment'}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ExternalTrustAmendment;
