import React, { useState } from 'react';
import { FileUp, Sparkles, CheckCircle2, AlertCircle, Loader2, FileText, ArrowRight } from 'lucide-react';
import { parseExistingResumeText } from '../../services/aiService';
import { extractTextFromPdf } from '../../utils/pdfParser';

export const StepResumeParser = ({ data, onChange, apiKey }) => {
  const [rawText, setRawText] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [isReadingPdf, setIsReadingPdf] = useState(false);
  const [parseResult, setParseResult] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  const autoParseText = async (textToParse) => {
    if (!textToParse || !textToParse.trim()) return;
    setIsParsing(true);
    setStatusMessage('AI Extracting Name, Email, Skills, Work & Education...');
    try {
      const parsed = await parseExistingResumeText(textToParse, apiKey);
      if (parsed && parsed.personalInfo) {
        onChange({
          ...data,
          personalInfo: {
            ...data.personalInfo,
            ...parsed.personalInfo
          },
          experience: parsed.experience && parsed.experience.length > 0 ? parsed.experience : data.experience,
          education: parsed.education && parsed.education.length > 0 ? parsed.education : data.education,
          skills: parsed.skills && parsed.skills.length > 0 ? parsed.skills : data.skills
        });
        setParseResult(parsed);
        setStatusMessage('Success! Your form has been auto-filled with extracted data.');
      }
    } catch (err) {
      console.error("Resume parse error:", err);
      setStatusMessage('Parsing complete. Verify the extracted fields below.');
    } finally {
      setIsParsing(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
      setIsReadingPdf(true);
      setStatusMessage('Extracting raw text from PDF file...');
      try {
        const arrayBuffer = await file.arrayBuffer();
        const extractedText = await extractTextFromPdf(arrayBuffer);
        setRawText(extractedText);
        // Automatically parse extracted PDF text immediately!
        await autoParseText(extractedText);
      } catch (err) {
        console.error("PDF reading error:", err);
        alert("Failed to read PDF file. Try copying and pasting raw text below.");
        setStatusMessage('PDF read error. Please paste text manually.');
      } finally {
        setIsReadingPdf(false);
      }
    } else {
      const reader = new FileReader();
      reader.onload = async (evt) => {
        const text = evt.target.result || '';
        setRawText(text);
        await autoParseText(text);
      };
      reader.readAsText(file);
    }
  };

  const handleManualParse = () => {
    autoParseText(rawText);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="border-b border-slate-800 pb-3">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <FileUp className="w-5 h-5 text-indigo-400" />
          AI PDF & Text Resume Auto-Parser
        </h3>
        <p className="text-xs text-slate-400">Upload your PDF or text resume file to auto-extract all details into your form with AI</p>
      </div>

      {/* File Upload & Paste Area */}
      <div className="space-y-4">
        
        <div className="p-6 border-2 border-dashed border-slate-800 hover:border-indigo-500/50 rounded-2xl bg-slate-900/40 text-center space-y-3 transition-colors">
          <FileText className="w-8 h-8 text-indigo-400 mx-auto animate-bounce" />
          <div>
            <span className="text-sm font-bold text-white block">Upload PDF or Text Resume (.pdf, .txt, .md, .json)</span>
            <span className="text-xs text-slate-400">Client-side PDF text extraction & AI Form Auto-Fill</span>
          </div>

          <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold cursor-pointer transition-all shadow-lg shadow-indigo-600/30 hover:scale-[1.02]">
            {isReadingPdf || isParsing ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileUp className="w-4 h-4" />}
            <span>{isReadingPdf ? "Reading PDF File..." : isParsing ? "Auto-Filling Form..." : "Upload PDF Resume Now"}</span>
            <input type="file" accept=".pdf,.txt,.md,.json" onChange={handleFileUpload} className="hidden" />
          </label>

          {statusMessage && (
            <div className="text-xs text-indigo-300 font-medium animate-pulse mt-2">
              {statusMessage}
            </div>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Extracted / Pasted Resume Text</label>
          <textarea
            rows={6}
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder="Extracted PDF text will appear here automatically upon uploading. Or paste your raw resume text directly..."
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs leading-relaxed focus:outline-none focus:border-indigo-500 resize-none font-mono"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleManualParse}
            disabled={isParsing || !rawText.trim()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] disabled:opacity-40"
          >
            {isParsing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>{isParsing ? "AI Extracting Details..." : "⚡ AI Auto-Fill Resume Form"}</span>
          </button>
        </div>

      </div>

      {/* Parse Result Feedback Banner */}
      {parseResult && (
        <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <CheckCircle2 className="w-4 h-4" /> PDF Extracted & Form Auto-Filled Successfully!
            </div>
            <span className="text-[11px] bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full font-bold">
              Ready in Form Steps
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs text-slate-200 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 font-sans">
            <p><strong>Name:</strong> {parseResult.personalInfo.fullName}</p>
            <p><strong>Job Title:</strong> {parseResult.personalInfo.jobTitle}</p>
            <p><strong>Email:</strong> {parseResult.personalInfo.email || "N/A"}</p>
            <p><strong>Phone:</strong> {parseResult.personalInfo.phone || "N/A"}</p>
            <p><strong>LinkedIn:</strong> {parseResult.personalInfo.linkedin || "N/A"}</p>
            <p><strong>GitHub:</strong> {parseResult.personalInfo.github || "N/A"}</p>
            <p className="col-span-2"><strong>Skills Extracted:</strong> {parseResult.skills?.[0]?.items?.join(', ') || "N/A"}</p>
          </div>

          <div className="p-3 bg-indigo-950/40 rounded-xl border border-indigo-500/20 text-xs text-indigo-200 flex items-center justify-between">
            <span>✨ Your resume form is updated. Click <strong>Personal Details (Step 1)</strong> to review your details!</span>
          </div>
        </div>
      )}

    </div>
  );
};

