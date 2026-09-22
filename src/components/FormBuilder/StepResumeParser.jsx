import React, { useState } from 'react';
import { FileUp, Sparkles, CheckCircle2, AlertCircle, Loader2, FileText } from 'lucide-react';
import { parseExistingResumeText } from '../../services/aiService';
import { extractTextFromPdf } from '../../utils/pdfParser';

export const StepResumeParser = ({ data, onChange, apiKey }) => {
  const [rawText, setRawText] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [isReadingPdf, setIsReadingPdf] = useState(false);
  const [parseResult, setParseResult] = useState(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
      setIsReadingPdf(true);
      try {
        const arrayBuffer = await file.arrayBuffer();
        const extractedText = await extractTextFromPdf(arrayBuffer);
        setRawText(extractedText);
      } catch (err) {
        console.error("PDF reading error:", err);
        alert("Failed to read PDF file. Try copying and pasting raw text below.");
      } finally {
        setIsReadingPdf(false);
      }
    } else {
      const reader = new FileReader();
      reader.onload = (evt) => {
        setRawText(evt.target.result || '');
      };
      reader.readAsText(file);
    }
  };

  const handleParse = async () => {
    if (!rawText.trim()) return;
    setIsParsing(true);
    try {
      const parsed = await parseExistingResumeText(rawText, apiKey);
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
      }
    } catch (err) {
      console.error("Resume parse error:", err);
    } finally {
      setIsParsing(false);
    }
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
          <FileText className="w-8 h-8 text-indigo-400 mx-auto" />
          <div>
            <span className="text-xs font-bold text-white block">Upload PDF or Text Resume (.pdf, .txt, .md, .json)</span>
            <span className="text-[11px] text-slate-400">Client-side PDF text extraction powered by PDF.js</span>
          </div>

          <label className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold cursor-pointer transition-colors shadow-md shadow-indigo-600/30">
            {isReadingPdf ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileUp className="w-3.5 h-3.5" />}
            <span>{isReadingPdf ? "Reading PDF File..." : "Choose PDF / Resume File"}</span>
            <input type="file" accept=".pdf,.txt,.md,.json" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Extracted / Pasted Resume Text</label>
          <textarea
            rows={7}
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder="Extracted PDF text will appear here. Or paste your raw resume text directly..."
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs leading-relaxed focus:outline-none focus:border-indigo-500 resize-none font-mono"
          />
        </div>

        <button
          type="button"
          onClick={handleParse}
          disabled={isParsing || !rawText.trim()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-40"
        >
          {isParsing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          <span>{isParsing ? "AI Extracting Details..." : "AI Auto-Fill Resume Form"}</span>
        </button>

      </div>

      {/* Parse Result Feedback Banner */}
      {parseResult && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2 animate-fadeIn">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
            <CheckCircle2 className="w-4 h-4" /> Extracted & Auto-Filled Successfully!
          </div>
          <div className="text-xs text-slate-300 space-y-0.5 font-sans">
            <p><strong>Extracted Name:</strong> {parseResult.personalInfo.fullName}</p>
            <p><strong>Job Title:</strong> {parseResult.personalInfo.jobTitle}</p>
            <p><strong>Email:</strong> {parseResult.personalInfo.email || "N/A"}</p>
            <p><strong>Work History Entries:</strong> {parseResult.experience?.length || 0}</p>
          </div>
        </div>
      )}

    </div>
  );
};
