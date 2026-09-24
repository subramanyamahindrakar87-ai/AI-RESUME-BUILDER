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
    <div className="min-h-screen bg-slate-950 text-slate-100 animate-fadeIn space-y-20 pb-20 relative overflow-hidden cosmic-bg">
      
      {/* Background Glowing 3D Orbs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-indigo-600/20 blur-[120px] pointer-events-none animate-orb-pulse" />
      <div className="absolute top-1/3 right-10 w-96 h-96 rounded-full bg-pink-600/15 blur-[140px] pointer-events-none animate-orb-pulse" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-cyan-500/15 blur-[130px] pointer-events-none animate-orb-pulse" />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 glow-gradient pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-slate-900/90 border border-indigo-500/30 text-indigo-300 text-xs font-bold shadow-xl shadow-indigo-500/10 hologram-glow animate-float-3d">
            <Sparkles className="w-4 h-4 text-pink-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span>Next-Gen AI Resume & Portfolio Builder</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight">
            Build ATS-Optimized Resumes & <br className="hidden sm:inline" />
            <span className="text-gradient-3d">
              Instant 3D Portfolio Webpages
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            Turn your career experience into high-impact resumes and a live interactive portfolio webpage with smart AI bullet polishing, 5 professional templates, and 1-click PDF export.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <button
              onClick={onGetStarted}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-9 py-4.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white font-extrabold text-base shadow-2xl shadow-indigo-500/40 hover:shadow-pink-500/30 hover:scale-[1.04] active:scale-95 transition-all duration-300 border border-white/20"
            >
              <Wand2 className="w-5 h-5 text-yellow-300" />
              <span>Build My Free Resume Now</span>
              <ArrowRight className="w-5 h-5 text-indigo-200" />
            </button>
          </div>

          {/* Key Feature Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-10 border-t border-slate-800/80 text-xs font-bold text-slate-300">
            <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-900/50 border border-slate-800">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>ATS Score Optimization</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-900/50 border border-slate-800">
              <CheckCircle className="w-4 h-4 text-cyan-400" />
              <span>5 Design Templates</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-900/50 border border-slate-800">
              <CheckCircle className="w-4 h-4 text-pink-400" />
              <span>Gemini AI Enhancer</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-900/50 border border-slate-800">
              <CheckCircle className="w-4 h-4 text-violet-400" />
              <span>Auto 3D Portfolio Site</span>
            </div>
          </div>

        </div>
      </section>

      {/* Feature Cards Grid with 3D Tilt */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Everything You Need to Get Hired</h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">Designed for software engineers, designers, managers, and modern professionals.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="glass-card-3d p-7 rounded-3xl border border-indigo-500/30 space-y-5 cursor-pointer group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 p-0.5 shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-indigo-400">
                <Wand2 className="w-7 h-7" />
              </div>
            </div>
            <h3 className="text-xl font-extrabold text-white group-hover:text-indigo-300 transition-colors">AI Bullet Polisher</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Transform basic descriptions into high-impact action verbs and quantitative achievement statements powered by Google Gemini.
            </p>
          </div>

          <div className="glass-card-3d p-7 rounded-3xl border border-violet-500/30 space-y-5 cursor-pointer group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-violet-600 to-pink-500 p-0.5 shadow-lg shadow-violet-500/30 group-hover:scale-110 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-violet-400">
                <Globe className="w-7 h-7" />
              </div>
            </div>
            <h3 className="text-xl font-extrabold text-white group-hover:text-violet-300 transition-colors">Auto Portfolio Generator</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Generate a standalone responsive personal 3D portfolio webpage instantly from your resume data, exportable as single-file HTML.
            </p>
          </div>

          <div className="glass-card-3d p-7 rounded-3xl border border-pink-500/30 space-y-5 cursor-pointer group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-600 to-cyan-500 p-0.5 shadow-lg shadow-pink-500/30 group-hover:scale-110 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-pink-400">
                <ShieldCheck className="w-7 h-7" />
              </div>
            </div>
            <h3 className="text-xl font-extrabold text-white group-hover:text-pink-300 transition-colors">ATS Job Matcher</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Paste target job descriptions to analyze missing keywords, get match scores, and tailor your resume for recruitment algorithms.
            </p>
          </div>

        </div>
      </section>

      {/* Template Showcase Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-white">Pick From 5 Handcrafted Templates</h2>
          <p className="text-xs text-slate-400">Switch templates anytime with zero re-typing required.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Modern Tech", desc: "Clean sidebar layout with indigo accents", tag: "Most Popular", color: "from-indigo-500 to-violet-600" },
            { title: "Executive Serif", desc: "Formal corporate layout with elegant typography", tag: "Executive", color: "from-amber-500 to-amber-700" },
            { title: "Minimalist Scandinavian", desc: "High-whitespace clean readability", tag: "Clean", color: "from-cyan-500 to-blue-600" },
            { title: "Creative Portfolio", desc: "Bold color bands and skill badges", tag: "Creative", color: "from-pink-500 to-rose-600" },
            { title: "Compact 1-Page", desc: "Maximized density for single-page applications", tag: "Compact", color: "from-emerald-500 to-teal-600" },
          ].map((item, idx) => (
            <div key={idx} className="glass-card-3d p-6 rounded-2xl border border-slate-800 space-y-4 relative group cursor-pointer">
              <div className="flex justify-between items-center">
                <span className="text-sm font-extrabold text-white">{item.title}</span>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full bg-gradient-to-r ${item.color} text-white shadow-md`}>{item.tag}</span>
              </div>
              <p className="text-xs text-slate-300">{item.desc}</p>
              <button
                onClick={onGetStarted}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-violet-600 text-slate-200 hover:text-white text-xs font-bold transition-all shadow-md"
              >
                Use Template
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer / Developer Credits */}
      <footer className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 border-t border-slate-800/80 text-center space-y-4 relative z-10">
        <p className="text-xs text-slate-400 font-medium">
          Created with ❤️ by Subramanya • Built with React, Vite & Tailwind CSS
        </p>

        <div className="flex items-center justify-center gap-4 text-xs font-bold">
          <a
            href="https://github.com/subramanyamahindrakar87-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-indigo-400 border border-slate-800 shadow-lg hover:border-indigo-500/40 transition-all"
          >
            <Github className="w-4 h-4" />
            <span>GitHub Profile</span>
          </a>

          <a
            href="https://www.linkedin.com/in/subramanyapm/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-indigo-400 border border-slate-800 shadow-lg hover:border-indigo-500/40 transition-all"
          >
            <Linkedin className="w-4 h-4" />
            <span>LinkedIn Profile</span>
          </a>
        </div>
      </footer>

    </div>
  );
};
