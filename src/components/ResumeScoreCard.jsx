import React, { useMemo } from 'react';
import { auditResumeHealth } from '../services/aiService';
import { ShieldCheck, AlertCircle, CheckCircle, Info, Sparkles } from 'lucide-react';

export const ResumeScoreCard = ({ resumeData }) => {
  const { score, suggestions } = useMemo(() => auditResumeHealth(resumeData), [resumeData]);

  const scoreColor = score >= 85 ? 'text-emerald-400' : score >= 65 ? 'text-amber-400' : 'text-rose-400';
  const progressBg = score >= 85 ? 'bg-emerald-500' : score >= 65 ? 'bg-amber-500' : 'bg-rose-500';

  return (
    <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">ATS Health Audit</h4>
            <p className="text-[11px] text-slate-400">Real-time resume readiness score</p>
          </div>
        </div>

        <div className="text-right">
          <span className={`text-xl font-extrabold ${scoreColor}`}>{score}%</span>
          <span className="text-[10px] text-slate-400 block -mt-1">Score</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
        <div 
          className={`h-full ${progressBg} transition-all duration-500 rounded-full`} 
          style={{ width: `${score}%` }}
        />
      </div>

      {/* Feedback Suggestions */}
      {suggestions.length > 0 && (
        <div className="space-y-1.5 pt-1">
          {suggestions.slice(0, 3).map((item, idx) => (
            <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-300">
              {item.type === 'error' && <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />}
              {item.type === 'warning' && <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />}
              {item.type === 'info' && <Info className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />}
              {item.type === 'success' && <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />}
              <span>{item.message}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
