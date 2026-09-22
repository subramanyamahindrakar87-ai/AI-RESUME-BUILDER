import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Square, Sparkles, Copy, Check, Loader2, Mic } from 'lucide-react';
import { generateElevatorPitch } from '../../services/aiService';

export const StepVoicePitch = ({ data, onChange, apiKey }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [copied, setCopied] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(0);
  const [speechRate, setSpeechRate] = useState(1.0);

  const pitchText = data.elevatorPitch?.content || "";

  useEffect(() => {
    if ('speechSynthesis' in window) {
      const loadVoices = () => {
        const available = window.speechSynthesis.getVoices();
        setVoices(available);
      };
      loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  }, []);

  const handleUpdate = (content) => {
    onChange({
      ...data,
      elevatorPitch: {
        ...data.elevatorPitch,
        content
      }
    });
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const result = await generateElevatorPitch(data, apiKey);
      handleUpdate(result);
    } catch (err) {
      console.error("Elevator pitch generation error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePlaySpeech = () => {
    if (!('speechSynthesis' in window) || !pitchText) return;

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
      setIsPaused(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(pitchText);
    if (voices[selectedVoice]) {
      utterance.voice = voices[selectedVoice];
    }
    utterance.rate = speechRate;

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handlePauseSpeech = () => {
    if ('speechSynthesis' in window && isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
      setIsPaused(true);
    }
  };

  const handleStopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(pitchText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="border-b border-slate-800 pb-3">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Mic className="w-5 h-5 text-indigo-400" />
          AI Voice Elevator Pitch & Audio Player
        </h3>
        <p className="text-xs text-slate-400">Generates a 60-second spoken pitch for recruiter phone screens with built-in voice audio playback</p>
      </div>

      {/* Audio Playback Control Panel */}
      <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {!isPlaying ? (
              <button
                type="button"
                onClick={handlePlaySpeech}
                disabled={!pitchText}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-all disabled:opacity-40"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>{isPaused ? "Resume Audio" : "Listen Spoken Pitch"}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePauseSpeech}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-md transition-all"
              >
                <Pause className="w-4 h-4 fill-white" />
                <span>Pause Audio</span>
              </button>
            )}

            {(isPlaying || isPaused) && (
              <button
                type="button"
                onClick={handleStopSpeech}
                className="p-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 transition-colors"
                title="Stop Audio"
              >
                <Square className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-bold shadow-md transition-all disabled:opacity-50"
          >
            {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>{isGenerating ? "AI Pitch Writing..." : "Generate AI Spoken Pitch"}</span>
          </button>
        </div>

        {/* Speech Voice & Speed Settings */}
        {voices.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800/80">
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Select Speech Voice</label>
              <select
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(Number(e.target.value))}
                className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
              >
                {voices.map((v, idx) => (
                  <option key={idx} value={idx}>
                    {v.name} ({v.lang})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-semibold text-slate-400 mb-1">
                <span>Speech Speed</span>
                <span>{speechRate}x</span>
              </div>
              <input
                type="range"
                min="0.75"
                max="1.5"
                step="0.1"
                value={speechRate}
                onChange={(e) => setSpeechRate(Number(e.target.value))}
                className="w-full h-2 rounded-lg bg-slate-950 accent-indigo-500 cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>

      {/* Spoken Pitch Script Editor */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold text-slate-300">Spoken Elevator Pitch Script</label>
          <button
            type="button"
            onClick={handleCopy}
            disabled={!pitchText}
            className="flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 disabled:opacity-40 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied!" : "Copy Script"}</span>
          </button>
        </div>

        <textarea
          rows={6}
          value={pitchText}
          onChange={(e) => handleUpdate(e.target.value)}
          placeholder="Click 'Generate AI Spoken Pitch' or write your 60-second phone screen script here..."
          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs sm:text-sm leading-relaxed focus:outline-none focus:border-indigo-500 resize-none"
        />
      </div>

    </div>
  );
};
