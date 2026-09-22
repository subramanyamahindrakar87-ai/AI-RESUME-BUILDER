import React, { useState } from 'react';
import { X, Key, ExternalLink, Check, Sparkles, AlertCircle } from 'lucide-react';

export const ApiKeyModal = ({ isOpen, onClose, apiKey, onSaveApiKey }) => {
  const [inputKey, setInputKey] = useState(apiKey || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveApiKey(inputKey.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  const handleClear = () => {
    setInputKey('');
    onSaveApiKey('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Google Gemini API Key</h3>
            <p className="text-xs text-slate-400">Power real-time AI suggestions & ATS optimization</p>
          </div>
        </div>

        {/* Info Banner */}
        <div className="p-3 mb-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300 space-y-2">
          <p className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <span>The builder comes with a high-quality offline AI engine. For live Gemini 2.5 Flash responses, enter your free API key.</span>
          </p>
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-semibold underline underline-offset-2"
          >
            Get a Free Gemini API Key <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Input Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">API Key</label>
            <input
              type="password"
              placeholder="AIzaSy..."
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          <div className="flex items-center justify-between gap-3 pt-2">
            {apiKey ? (
              <button
                onClick={handleClear}
                className="px-3 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
              >
                Clear Key
              </button>
            ) : <div />}

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow-md shadow-indigo-600/30 transition-all"
              >
                {savedSuccess ? <Check className="w-4 h-4 text-emerald-300" /> : null}
                <span>{savedSuccess ? "Saved!" : "Save Key"}</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
