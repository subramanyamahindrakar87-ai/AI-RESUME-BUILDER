import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Globe, Linkedin, Github, Sparkles, Loader2 } from 'lucide-react';
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
            <Github className="w-3.5 h-3.5 text-slate-400" /> GitHub URL
          </label>
          <input
            type="text"
            value={data.personalInfo.github || ''}
            onChange={(e) => handleChange('github', e.target.value)}
            placeholder="https://github.com/username"
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
