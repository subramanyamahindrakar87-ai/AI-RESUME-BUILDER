import React, { useState } from 'react';
import { FileUp, Sparkles, CheckCircle2, AlertCircle, Loader2, FileText, ArrowRight } from 'lucide-react';
import { parseExistingResumeText } from '../../services/aiService';

export const StepResumeParser = ({ data, onChange, apiKey }) => {
  const [rawText, setRawText] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [parseResult, setParseResult] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
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
          AI Resume File & Text Auto-Parser
        </h3>
        <p className="text-xs text-slate-400">Upload your existing resume file or paste text to auto-fill all form fields with AI</p>
      </div>

      {/* File Upload & Paste Area */}
      <div className="space-y-4">
        
        <div className="p-6 border-2 border-dashed border-slate-800 hover:border-indigo-500/50 rounded-2xl bg-slate-900/40 text-center space-y-3 transition-colors">
          <FileText className="w-8 h-8 text-indigo-400 mx-auto" />
          <div>
            <span className="text-xs font-bold text-white block">Upload Existing Resume (.txt / .md / text file)</span>
            <span className="text-[11px] text-slate-400">Select a file from your computer or paste text below</span>
          </div>

          <label className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer transition-colors">
            <FileUp className="w-3.5 h-3.5 text-indigo-400" /> Choose Resume File
            <input type="file" accept=".txt,.md,.json" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Or Paste Raw Resume Text</label>
          <textarea
            rows={7}
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder="Paste your old resume text here (Name, Email, Job Title, Work Experience bullet points...)"
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
