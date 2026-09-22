import React, { useState } from 'react';
import { HelpCircle, Sparkles, MessageSquare, Lightbulb, CheckCircle2, Copy, Check, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { generateInterviewPrep } from '../../services/aiService';

export const StepInterviewPrep = ({ data, apiKey }) => {
  const [questions, setQuestions] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [openIdx, setOpenIdx] = useState(0);
  const [copiedIdx, setCopiedIdx] = useState(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await generateInterviewPrep(data, apiKey);
      setQuestions(res);
      setOpenIdx(0);
    } catch (err) {
      console.error("Interview prep error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyAnswer = (idx, text) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-indigo-400" />
            AI Mock Interview Q&A Generator
          </h3>
          <p className="text-xs text-slate-400">Generate 5 tailored technical & behavioral interview questions with model STAR answers</p>
        </div>

        <button
          type="button"
          onClick={handleGenerate}
          disabled={isGenerating}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-all disabled:opacity-50"
        >
          {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          <span>{isGenerating ? "AI Generating Prep..." : "Generate AI Interview Questions"}</span>
        </button>
      </div>

      {questions.length === 0 ? (
        <div className="p-8 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-900/40 space-y-3">
          <HelpCircle className="w-10 h-10 text-indigo-400 mx-auto opacity-80" />
          <div>
            <h4 className="text-sm font-bold text-white">Prepare for Your Next Job Interview</h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
              Click the button above to generate 5 custom interview questions tailored specifically to your target role as a <strong className="text-indigo-300">{data.personalInfo.jobTitle || "Software Engineer"}</strong>.
            </p>
          </div>
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5" /> Start AI Interview Prep
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {questions.map((q, idx) => {
            const isOpen = openIdx === idx;
            const isCopied = copiedIdx === idx;

            return (
              <div 
                key={idx} 
                className={`glass-card rounded-2xl border transition-all ${
                  isOpen ? 'border-indigo-500/50 bg-slate-900/80 shadow-xl' : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Header Toggle */}
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-4 flex items-center justify-between gap-4 text-left"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        {q.category || "Q&A"} #{idx + 1}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white leading-snug">{q.question}</h4>
                  </div>

                  <div className="shrink-0 text-slate-400">
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {/* Expanded Answer Content */}
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 space-y-4 border-t border-slate-800/80 animate-fadeIn">
                    
                    {/* Sample STAR Method Answer */}
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Model STAR Answer
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyAnswer(idx, q.sampleAnswer)}
                          className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-white transition-colors"
                        >
                          {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{isCopied ? "Copied" : "Copy Answer"}</span>
                        </button>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">{q.sampleAnswer}</p>
                    </div>

                    {/* Candidate Pro Tip */}
                    {q.keyTip && (
                      <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-start gap-2 text-xs text-indigo-200">
                        <Lightbulb className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold block mb-0.5 text-indigo-300">Candidate Pro Tip:</span>
                          <span>{q.keyTip}</span>
                        </div>
                      </div>
                    )}

                  </div>
                )}

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
