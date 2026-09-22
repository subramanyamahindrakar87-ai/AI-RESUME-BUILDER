import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Globe, Linkedin, Github, Sparkles, Loader2, Languages } from 'lucide-react';
import { generateProfessionalSummary } from '../../services/aiService';

export const StepPersonalInfo = ({ data, onChange, apiKey }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (field, value) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value
      }
    });
  };

  const handleGenerateSummary = async () => {
    setIsGenerating(true);
    try {
      const summary = await generateProfessionalSummary(
        data.personalInfo.jobTitle,
        data.experience,
        apiKey
      );
      handleChange('summary', summary);
    } catch (err) {
      console.error("Summary generation error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      <div className="border-b border-slate-800 pb-3">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <User className="w-5 h-5 text-indigo-400" />
          Personal Details
        </h3>
        <p className="text-xs text-slate-400">Basic contact details and professional header info</p>
      </div>

      {/* Profile Photo Uploader & Avatar Presets */}
      <div className="glass-card p-4 rounded-2xl border border-slate-800 space-y-3">
        <label className="block text-xs font-semibold text-slate-300 flex items-center justify-between">
          <span>Profile Photo / AI Avatar</span>
          <span className="text-[11px] text-indigo-400">Shows on Resume & Portfolio</span>
        </label>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Avatar Preview */}
          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-950 border-2 border-indigo-500/40 shrink-0 shadow-lg relative group">
            {data.personalInfo.profilePicture ? (
              <img src={data.personalInfo.profilePicture} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-600 font-bold text-xl">
                {data.personalInfo.fullName ? data.personalInfo.fullName.charAt(0) : "P"}
              </div>
            )}
          </div>

          <div className="space-y-2 flex-1 w-full">
            {/* Custom Image Upload & URL input */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={data.personalInfo.profilePicture || ''}
                onChange={(e) => handleChange('profilePicture', e.target.value)}
                placeholder="Paste Image URL or upload below..."
                className="flex-1 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500"
              />
              <label className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer shrink-0 transition-colors">
                Upload File
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files && e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (evt) => handleChange('profilePicture', evt.target.result);
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
            </div>

            {/* Quick Tech Avatar Presets */}
            <div className="flex items-center gap-2 pt-0.5">
              <span className="text-[10px] text-slate-400 font-semibold">Presets:</span>
              {[
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
                "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
              ].map((url, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleChange('profilePicture', url)}
                  className="w-6 h-6 rounded-full overflow-hidden border border-slate-700 hover:border-indigo-400 transition-all shrink-0"
                >
                  <img src={url} alt={`Preset ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
              {data.personalInfo.profilePicture && (
                <button
                  type="button"
                  onClick={() => handleChange('profilePicture', '')}
                  className="text-[10px] text-rose-400 hover:underline ml-1"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
          <input
            type="text"
            value={data.personalInfo.fullName || ''}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="e.g. Alex Morgan"
            className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Job Title / Target Role *</label>
          <input
            type="text"
            value={data.personalInfo.jobTitle || ''}
            onChange={(e) => handleChange('jobTitle', e.target.value)}
            placeholder="e.g. Senior Full Stack Engineer"
            className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
            <Mail className="w-3.5 h-3.5 text-slate-400" /> Email Address *
          </label>
          <input
            type="email"
            value={data.personalInfo.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="alex@example.com"
            className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
            <Phone className="w-3.5 h-3.5 text-slate-400" /> Phone Number
          </label>
          <input
            type="text"
            value={data.personalInfo.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+1 (555) 000-0000"
            className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" /> Location
          </label>
          <input
            type="text"
            value={data.personalInfo.location || ''}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="San Francisco, CA"
            className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-slate-400" /> Website / Portfolio URL
          </label>
          <input
            type="text"
            value={data.personalInfo.website || ''}
            onChange={(e) => handleChange('website', e.target.value)}
            placeholder="https://alexmorgan.dev"
            className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
            <Linkedin className="w-3.5 h-3.5 text-slate-400" /> LinkedIn URL
          </label>
          <input
            type="text"
            value={data.personalInfo.linkedin || ''}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            placeholder="https://linkedin.com/in/username"
            className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
            <Github className="w-3.5 h-3.5 text-slate-400" /> Your GitHub URL
          </label>
          <input
            type="text"
            value={data.personalInfo.github || ''}
            onChange={(e) => handleChange('github', e.target.value)}
            placeholder="https://github.com/your-username"
            className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-slate-400" /> Twitter / X Profile URL
          </label>
          <input
            type="text"
            value={data.personalInfo.twitter || ''}
            onChange={(e) => handleChange('twitter', e.target.value)}
            placeholder="https://x.com/your-handle"
            className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-slate-400" /> Custom Link (Blog / Drive PDF)
          </label>
          <input
            type="text"
            value={data.personalInfo.customLink || ''}
            onChange={(e) => handleChange('customLink', e.target.value)}
            placeholder="https://drive.google.com/your-file"
            className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
            <Languages className="w-3.5 h-3.5 text-slate-400" /> Languages Spoken / Known
          </label>
          <input
            type="text"
            value={data.personalInfo.languages || ''}
            onChange={(e) => handleChange('languages', e.target.value)}
            placeholder="e.g. English (Native), Spanish (Fluent), French (Basic)"
            className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>
      </div>

      {/* Professional Summary Section with AI Button */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs font-semibold text-slate-300">Professional Summary</label>
          <button
            type="button"
            onClick={handleGenerateSummary}
            disabled={isGenerating}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/20 transition-all disabled:opacity-50"
          >
            {isGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-indigo-400" />}
            <span>{isGenerating ? "AI Writing..." : "AI Generate Summary"}</span>
          </button>
        </div>
        <textarea
          rows={4}
          value={data.personalInfo.summary || ''}
          onChange={(e) => handleChange('summary', e.target.value)}
          placeholder="Brief overview of your professional background, strengths, and achievements..."
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-all resize-none"
        />
      </div>

    </div>
  );
};
