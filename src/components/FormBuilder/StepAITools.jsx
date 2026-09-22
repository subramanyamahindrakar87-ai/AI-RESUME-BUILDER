import React, { useState } from 'react';
import { Sparkles, Target, CheckCircle2, AlertTriangle, Lightbulb, Loader2 } from 'lucide-react';
import { analyzeJobDescription } from '../../services/aiService';

export const StepAITools = ({ data, apiKey }) => {
  const [jobDesc, setJobDesc] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleAnalyze = async () => {
    if (!jobDesc.trim()) return;
    setIsAnalyzing(true);
    try {
      const res = await analyzeJobDescription(jobDesc, data, apiKey);
      setAnalysisResult(res);
    } catch (err) {
      console.error("Job analysis error:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="border-b border-slate-800 pb-3">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Target className="w-5 h-5 text-indigo-400" />
          Job Description ATS Matcher & AI Optimizer
        </h3>
        <p className="text-xs text-slate-400">Paste any target job description to match keywords and get tailored AI advice</p>
      </div>

      <div className="space-y-3">
        <label className="block text-xs font-semibold text-slate-300">Target Job Description</label>
        <textarea
          rows={5}
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
          placeholder="Paste job posting text here (e.g. We are looking for a Senior Full Stack Engineer proficient in React, Node.js, Cloud deployments...)"
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 resize-none"
        />

        <button
          type="button"
          onClick={handleAnalyze}
          disabled={isAnalyzing || !jobDesc.trim()}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50"
        >
          {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          <span>{isAnalyzing ? "AI Analyzing Match..." : "Run AI Job Match Audit"}</span>
        </button>
      </div>

      {analysisResult && (
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h4 className="text-sm font-bold text-white">ATS Keyword Match Report</h4>
              <p className="text-xs text-slate-400">Targeted relevance score</p>
            </div>
            <div className="text-right">
              <span className={`text-2xl font-black ${analysisResult.matchScore >= 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {analysisResult.matchScore}%
              </span>
              <span className="text-[10px] text-slate-400 block -mt-1">Match Index</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Strengths */}
            <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
              <h5 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Matched Skills & Strengths
              </h5>
              <ul className="space-y-1">
                {analysisResult.strengthPoints.map((point, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Missing Keywords */}
            <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-2">
              <h5 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" /> Missing Keywords to Include
              </h5>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {analysisResult.missingKeywords.map((kw, idx) => (
                  <span key={idx} className="px-2.5 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
                    + {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* AI Advice */}
          {analysisResult.tailoredAdvice && (
            <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-start gap-2 text-xs text-indigo-200">
              <Lightbulb className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block mb-0.5 text-indigo-300">Tailored AI Recommendation:</span>
                <span>{analysisResult.tailoredAdvice}</span>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
