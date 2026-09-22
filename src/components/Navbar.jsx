import React from 'react';
import { 
  Sparkles, 
  FileText, 
  Globe, 
  Download, 
  Key, 
  Eye, 
  Layout, 
  CheckCircle,
  Wand2,
  Github,
  Linkedin
} from 'lucide-react';

export const Navbar = ({ 
  activeView, 
  setActiveView, 
  onOpenApiKeyModal, 
  hasApiKey, 
  onDownloadPdf, 
  onTogglePreview 
}) => {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveView('landing')} 
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-indigo-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <span className="font-extrabold text-lg text-white tracking-tight flex items-center gap-1.5">
              ResumeAI <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 font-semibold border border-indigo-500/20">PRO</span>
            </span>
            <span className="text-[11px] text-slate-400 block -mt-0.5">Resume & Portfolio Generator</span>
          </div>
        </div>

        {/* Permanent Developer Links & Navigation Tabs */}
        <div className="flex items-center gap-3">
          <nav className="hidden md:flex items-center gap-1 p-1 bg-slate-900/80 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveView('builder')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                activeView === 'builder'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Resume Builder
            </button>

            <button
              onClick={() => setActiveView('portfolio')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                activeView === 'portfolio'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              Portfolio Webpage
            </button>
          </nav>

          {/* Permanent Creator Social Links */}
          <div className="hidden lg:flex items-center gap-1.5 px-2 py-1 bg-slate-900/60 rounded-xl border border-slate-800/80 text-xs">
            <a
              href="https://github.com/subramanyamahindrakar87-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2 py-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Developer GitHub (https://github.com/subramanyamahindrakar87-ai)"
            >
              <Github className="w-3.5 h-3.5 text-indigo-400" />
              <span className="font-semibold text-[11px]">GitHub</span>
            </a>
            <span className="text-slate-700">|</span>
            <a
              href="https://www.linkedin.com/in/subramanyapm/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2 py-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Developer LinkedIn (https://www.linkedin.com/in/subramanyapm/)"
            >
              <Linkedin className="w-3.5 h-3.5 text-indigo-400" />
              <span className="font-semibold text-[11px]">LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Actions Toolbar */}
        <div className="flex items-center gap-2">
          {/* API Key Modal Button */}
          <button
            onClick={onOpenApiKeyModal}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              hasApiKey
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-indigo-500/50 hover:text-indigo-300'
            }`}
            title={hasApiKey ? "Gemini API Active" : "Add Gemini API Key for Live AI"}
          >
            <Key className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{hasApiKey ? "AI Connected" : "Gemini API"}</span>
            {hasApiKey && <CheckCircle className="w-3 h-3 text-emerald-400" />}
          </button>

          {/* Quick Preview Toggle (Mobile & Desktop) */}
          <button
            onClick={onTogglePreview}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Preview</span>
          </button>

          {/* Download PDF Button */}
          <button
            onClick={onDownloadPdf}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-md shadow-indigo-600/25 transition-all transform active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
        </div>

      </div>
    </header>
  );
};
