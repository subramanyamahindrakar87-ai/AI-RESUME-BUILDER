import React, { useState } from 'react';
import { Mail, Sparkles, Building, Briefcase, User, Copy, Check, Download, Loader2, Zap } from 'lucide-react';
import { generateCoverLetter } from '../../services/aiService';
import { exportToPdf } from '../../utils/pdfExporter';

export const StepCoverLetter = ({ data, onChange, apiKey }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const coverLetter = data.coverLetter || {
    recipientCompany: "Acme Tech Solutions",
    targetRole: data.personalInfo?.jobTitle || "Senior Full Stack Engineer",
    hiringManager: "Hiring Team",
    content: ""
  };

  const handleUpdate = (field, value) => {
    onChange({
      ...data,
      coverLetter: {
        ...coverLetter,
        [field]: value
      }
    });
  };

  const handleGenerate = async (overrides = {}) => {
    const comp = overrides.recipientCompany || coverLetter.recipientCompany || "Acme Tech Solutions";
    const role = overrides.targetRole || coverLetter.targetRole || "Senior Full Stack Engineer";
    const mgr = overrides.hiringManager || coverLetter.hiringManager || "Hiring Team";

    setIsGenerating(true);
    try {
      const result = await generateCoverLetter(
        comp,
        role,
        mgr,
        data,
        apiKey
      );
      onChange({
        ...data,
        coverLetter: {
          recipientCompany: comp,
          targetRole: role,
          hiringManager: mgr,
          content: result
        }
      });
    } catch (err) {
      console.error("Cover letter error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (coverLetter.content) {
      navigator.clipboard.writeText(coverLetter.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadPdf = () => {
    exportToPdf('cover-letter-preview-doc', `${(coverLetter.recipientCompany || 'Acme').replace(/\s+/g, '_')}_Cover_Letter.pdf`);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="border-b border-slate-800 pb-3">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Mail className="w-5 h-5 text-indigo-400" />
          Gemini AI Cover Letter & Objective Generator
        </h3>
        <p className="text-xs text-slate-400">Generate a tailored cover letter & career objective according to your specific target company and role requirements</p>
      </div>

      {/* Target Details Form & Preset Buttons */}
      <div className="space-y-4">
        
        {/* Preset Chips */}
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <label className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-amber-400" /> Quick Target Presets (Click to Auto-Fill & Generate):
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              { company: "Acme Tech Solutions", role: "Senior Full Stack Engineer", manager: "Hiring Team" },
              { company: "Google", role: "Staff Software Engineer", manager: "Engineering Director" },
              { company: "Microsoft", role: "Principal Cloud Architect", manager: "Talent Acquisition" },
              { company: "Stripe", role: "Senior Frontend Engineer", manager: "Engineering Manager" }
            ].map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleGenerate(preset)}
                disabled={isGenerating}
                className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 hover:border-indigo-500 text-xs font-semibold text-slate-300 hover:text-white transition-all hover:scale-105 disabled:opacity-40"
              >
                {preset.company} ({preset.role})
              </button>
            ))}
          </div>
        </div>

        {/* Editable Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
              <Building className="w-3.5 h-3.5 text-slate-400" /> Target Company *
            </label>
            <input
              type="text"
              value={coverLetter.recipientCompany || ''}
              onChange={(e) => handleUpdate('recipientCompany', e.target.value)}
              placeholder="e.g. Acme Tech Solutions"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5 text-slate-400" /> Target Role *
            </label>
            <input
              type="text"
              value={coverLetter.targetRole || ''}
              onChange={(e) => handleUpdate('targetRole', e.target.value)}
              placeholder="e.g. Senior Full Stack Engineer"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-slate-400" /> Hiring Manager / Team
            </label>
            <input
              type="text"
              value={coverLetter.hiringManager || ''}
              onChange={(e) => handleUpdate('hiringManager', e.target.value)}
              placeholder="e.g. Hiring Team"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

      </div>

      {/* Action Button & Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <button
          type="button"
          onClick={() => handleGenerate()}
          disabled={isGenerating}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 hover:scale-[1.02] text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50"
        >
          {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          <span>{isGenerating ? "Gemini Writing Cover Letter..." : "⚡ Auto-Generate Gemini Cover Letter"}</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            disabled={!coverLetter.content}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 disabled:opacity-40 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied!" : "Copy Text"}</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={!coverLetter.content}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 disabled:opacity-40 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-indigo-400" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Cover Letter Text Area */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-slate-300">Editable Cover Letter Content</label>
        <textarea
          rows={12}
          value={coverLetter.content || ''}
          onChange={(e) => handleUpdate('content', e.target.value)}
          placeholder="Click 'Auto-Generate Gemini Cover Letter' or choose a quick preset above..."
          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs sm:text-sm font-sans leading-relaxed focus:outline-none focus:border-indigo-500 resize-y"
        />
      </div>

      {/* Printable Hidden Cover Letter Preview */}
      <div className="hidden">
        <div id="cover-letter-preview-doc" className="p-10 bg-white text-slate-900 font-sans leading-relaxed text-sm min-h-[900px] space-y-6">
          <div className="border-b pb-4">
            <h1 className="text-2xl font-bold text-slate-900">{data.personalInfo.fullName}</h1>
            <p className="text-xs text-slate-600">{data.personalInfo.email} • {data.personalInfo.phone} • {data.personalInfo.location}</p>
          </div>
          <div className="text-xs text-slate-500 space-y-1">
            <p>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            <p className="font-bold text-slate-800">{coverLetter.hiringManager}</p>
            <p>{coverLetter.recipientCompany}</p>
          </div>
          <div className="text-slate-800 text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">
            {coverLetter.content}
          </div>
        </div>
      </div>

    </div>
  );
};

