import React from 'react';
import { 
  Sparkles, 
  Wand2, 
  FileText, 
  Globe, 
  Download, 
  ShieldCheck, 
  Zap, 
  Layout, 
  ArrowRight,
  CheckCircle,
  Cpu,
  Github,
  Linkedin
} from 'lucide-react';

export const LandingPage = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 animate-fadeIn space-y-20 pb-20">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 glow-gradient pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold shadow-lg">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Next-Gen AI Resume & Portfolio Builder</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            Build ATS-Optimized Resumes & <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
              Instant Portfolio Websites
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-normal">
            Turn your career experience into high-impact resumes and a live portfolio webpage with smart AI bullet polishing, 5 professional templates, and 1-click PDF export.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onGetStarted}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-extrabold text-base shadow-xl shadow-indigo-600/30 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <span>Build My Free Resume Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Key Feature Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-slate-900 text-xs font-semibold text-slate-400">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>ATS Score Optimization</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>5 Design Templates</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Gemini AI Enhancer</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Auto Portfolio Site</span>
            </div>
          </div>

        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-extrabold text-white">Everything You Need to Get Hired</h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">Designed for software engineers, designers, managers, and modern professionals.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4 hover:border-indigo-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Wand2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">AI Bullet Polisher</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Transform basic descriptions into high-impact action verbs and quantitative achievement statements powered by Google Gemini.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4 hover:border-indigo-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Auto Portfolio Generator</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Generate a standalone responsive personal portfolio webpage instantly from your resume data, exportable as single-file HTML.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4 hover:border-indigo-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">ATS Job Matcher</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Paste target job descriptions to analyze missing keywords, get match scores, and tailor your resume for recruitment algorithms.
            </p>
          </div>

        </div>
      </section>

      {/* Template Showcase Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Pick From 5 Handcrafted Templates</h2>
          <p className="text-xs text-slate-400">Switch templates anytime with zero re-typing required.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Modern Tech", desc: "Clean sidebar layout with indigo accents", tag: "Most Popular" },
            { title: "Executive Serif", desc: "Formal corporate layout with elegant typography", tag: "Executive" },
            { title: "Minimalist Scandinavian", desc: "High-whitespace clean readability", tag: "Clean" },
            { title: "Creative Portfolio", desc: "Bold color bands and skill badges", tag: "Creative" },
            { title: "Compact 1-Page", desc: "Maximized density for single-page applications", tag: "Compact" },
          ].map((item, idx) => (
            <div key={idx} className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3 relative group hover:border-indigo-500/50 transition-all">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-white">{item.title}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">{item.tag}</span>
              </div>
              <p className="text-xs text-slate-400">{item.desc}</p>
              <button
                onClick={onGetStarted}
                className="w-full py-2 rounded-xl bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white text-xs font-semibold transition-colors"
              >
                Use Template
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer / Developer Credits */}
      <footer className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 border-t border-slate-900 text-center space-y-3">
        <p className="text-xs text-slate-400 font-medium">
          Created with ❤️ by Subramanya • Built with React, Vite & Tailwind CSS
        </p>

        <div className="flex items-center justify-center gap-4 text-xs font-semibold">
          <a
            href="https://github.com/subramanyamahindrakar87-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-indigo-400 border border-slate-800 transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>GitHub Profile</span>
          </a>

          <a
            href="https://www.linkedin.com/in/subramanyapm/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-indigo-400 border border-slate-800 transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            <span>LinkedIn Profile</span>
          </a>
        </div>
      </footer>

    </div>
  );
};
