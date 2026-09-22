import React, { useState } from 'react';
import { StepPersonalInfo } from './StepPersonalInfo';
import { StepExperience } from './StepExperience';
import { StepEducation } from './StepEducation';
import { StepSkills } from './StepSkills';
import { StepProjects } from './StepProjects';
import { StepCertifications } from './StepCertifications';
import { StepAITools } from './StepAITools';
import { StepCoverLetter } from './StepCoverLetter';
import { StepInterviewPrep } from './StepInterviewPrep';
import { StepVoicePitch } from './StepVoicePitch';
import { StepCustomSections } from './StepCustomSections';
import { StepResumeParser } from './StepResumeParser';
import { ResumeScoreCard } from '../ResumeScoreCard';

import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Cpu, 
  FolderGit2, 
  Award, 
  Target, 
  Mail,
  MessageSquare,
  Mic,
  Layers,
  Globe,
  FileUp,
  ChevronRight, 
  ChevronLeft,
  Palette,
  Layout,
  Type,
  Maximize2,
  QrCode,
  Check,
  Download,
  Upload,
  Copy
} from 'lucide-react';

const STEPS = [
  { id: 'parser', label: 'AI Auto-Fill', icon: FileUp },
  { id: 'personal', label: 'Personal Info', icon: User },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'skills', label: 'Skills', icon: Cpu },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'certifications', label: 'Certifications', icon: Award },
  { id: 'customSections', label: 'Custom Sections', icon: Layers },
  { id: 'coverLetter', label: 'Cover Letter', icon: Mail },
  { id: 'voicePitch', label: 'Voice Pitch', icon: Mic },
  { id: 'interviewPrep', label: 'Interview Q&A', icon: MessageSquare },
  { id: 'aiTools', label: 'ATS Matcher', icon: Target },
];

const TEMPLATES = [
  { id: 'modern', name: 'Modern Tech', desc: 'Vibrant indigo accents, sleek sidebar' },
  { id: 'executive', name: 'Executive Serif', desc: 'Formal corporate, centered header' },
  { id: 'minimalist', name: 'Scandinavian Minimal', desc: 'Clean, high-whitespace elegance' },
  { id: 'creative', name: 'Creative Portfolio', desc: 'Bold badges & project cards' },
  { id: 'compact', name: 'Compact 1-Page', desc: 'Dense layout for max content' },
];

const ACCENT_COLORS = [
  { hex: '#6366f1', name: 'Indigo' },
  { hex: '#06b6d4', name: 'Cyan' },
  { hex: '#10b981', name: 'Emerald' },
  { hex: '#ec4899', name: 'Pink' },
  { hex: '#f59e0b', name: 'Amber' },
  { hex: '#3b82f6', name: 'Blue' },
  { hex: '#8b5cf6', name: 'Violet' },
];

export const FormWizard = ({ resumeData, setResumeData, apiKey, onTogglePreview }) => {
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [savedProfiles, setSavedProfiles] = useState(() => {
    const saved = localStorage.getItem('ai_resume_saved_profiles');
    return saved ? JSON.parse(saved) : {};
  });

  const currentStep = STEPS[activeStepIdx];

  const handleCustomizationChange = (field, value) => {
    setResumeData({
      ...resumeData,
      customization: {
        ...resumeData.customization,
        [field]: value
      }
    });
  };

  const handleSaveProfileVariant = (variantName) => {
    const updated = {
      ...savedProfiles,
      [variantName]: resumeData
    };
    setSavedProfiles(updated);
    localStorage.setItem('ai_resume_saved_profiles', JSON.stringify(updated));
    alert(`Saved resume profile variant: "${variantName}"!`);
  };

  const handleLoadProfileVariant = (variantName) => {
    if (savedProfiles[variantName]) {
      setResumeData(savedProfiles[variantName]);
    }
  };

  const handleExportJson = () => {
    const jsonStr = JSON.stringify(resumeData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(resumeData.personalInfo.fullName || 'resume').toLowerCase().replace(/\s+/g, '_')}_backup.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const parsed = JSON.parse(evt.target.result);
          if (parsed && parsed.personalInfo) {
            setResumeData(parsed);
            alert("Resume data restored successfully!");
          } else {
            alert("Invalid JSON format.");
          }
        } catch (err) {
          alert("Error parsing JSON file.");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Step Progress Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isActive = idx === activeStepIdx;
          const isDone = idx < activeStepIdx;

          return (
            <button
              key={step.id}
              onClick={() => setActiveStepIdx(idx)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : isDone
                  ? 'bg-slate-800/80 text-indigo-300 hover:bg-slate-800'
                  : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{step.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Grid: Form Steps + Customizer Toolbar & ATS Score Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Active Step Form */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 border border-slate-800/80 shadow-xl space-y-6">
          {currentStep.id === 'parser' && <StepResumeParser data={resumeData} onChange={setResumeData} apiKey={apiKey} />}
          {currentStep.id === 'personal' && <StepPersonalInfo data={resumeData} onChange={setResumeData} apiKey={apiKey} />}
          {currentStep.id === 'experience' && <StepExperience data={resumeData} onChange={setResumeData} apiKey={apiKey} />}
          {currentStep.id === 'education' && <StepEducation data={resumeData} onChange={setResumeData} />}
          {currentStep.id === 'skills' && <StepSkills data={resumeData} onChange={setResumeData} />}
          {currentStep.id === 'projects' && <StepProjects data={resumeData} onChange={setResumeData} />}
          {currentStep.id === 'certifications' && <StepCertifications data={resumeData} onChange={setResumeData} />}
          {currentStep.id === 'customSections' && <StepCustomSections data={resumeData} onChange={setResumeData} />}
          {currentStep.id === 'coverLetter' && <StepCoverLetter data={resumeData} onChange={setResumeData} apiKey={apiKey} />}
          {currentStep.id === 'voicePitch' && <StepVoicePitch data={resumeData} onChange={setResumeData} apiKey={apiKey} />}
          {currentStep.id === 'interviewPrep' && <StepInterviewPrep data={resumeData} apiKey={apiKey} />}
          {currentStep.id === 'aiTools' && <StepAITools data={resumeData} apiKey={apiKey} />}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              type="button"
              disabled={activeStepIdx === 0}
              onClick={() => setActiveStepIdx(prev => Math.max(0, prev - 1))}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 transition-all"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>

            <div className="text-xs text-slate-400 font-medium">
              Step {activeStepIdx + 1} of {STEPS.length}
            </div>

            {activeStepIdx < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={() => setActiveStepIdx(prev => Math.min(STEPS.length - 1, prev + 1))}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all"
              >
                Next Step <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={onTogglePreview}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30 transition-all"
              >
                <Maximize2 className="w-4 h-4" /> View Full Resume
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Template Customizer & ATS Health Score */}
        <div className="space-y-6">
          
          {/* ATS Health Audit Card */}
          <ResumeScoreCard resumeData={resumeData} />

          {/* A/B Resume Profile Switcher */}
          <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white flex items-center gap-1.5">
                <Copy className="w-4 h-4 text-indigo-400" /> A/B Resume Variations
              </label>
              <span className="text-[10px] text-slate-400">Save & Swap Versions</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const name = prompt("Enter profile variation name (e.g. Frontend Focus, Full Stack, Lead Architect):");
                  if (name) handleSaveProfileVariant(name);
                }}
                className="flex-1 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold transition-all"
              >
                Save Current Version
              </button>
            </div>

            {Object.keys(savedProfiles).length > 0 && (
              <div className="space-y-1 pt-1">
                <label className="block text-[11px] text-slate-400 font-semibold">Load Saved Profile:</label>
                <div className="flex flex-wrap gap-1.5">
                  {Object.keys(savedProfiles).map((pName) => (
                    <button
                      key={pName}
                      type="button"
                      onClick={() => handleLoadProfileVariant(pName)}
                      className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 hover:border-indigo-500 text-xs text-slate-300 hover:text-white transition-all"
                    >
                      {pName}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Template & Visual Customizer Panel */}
          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Palette className="w-4 h-4 text-indigo-400" /> Design & Theme Customizer
            </h4>

            {/* Portfolio Theme Switcher */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-300 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-indigo-400" /> Portfolio Website Theme
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: 'dark-glass', label: 'Dark Glass' },
                  { id: 'cyberpunk', label: 'Cyberpunk Neon' },
                  { id: 'minimal-light', label: 'Clean Light' },
                  { id: 'emerald', label: 'Emerald Slate' },
                ].map((pTheme) => (
                  <button
                    key={pTheme.id}
                    onClick={() => handleCustomizationChange('portfolioTheme', pTheme.id)}
                    className={`py-1.5 px-2 rounded-xl text-xs font-medium border text-center transition-all ${
                      (resumeData.customization?.portfolioTheme || 'dark-glass') === pTheme.id
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {pTheme.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Template Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-300 flex items-center gap-1">
                <Layout className="w-3.5 h-3.5 text-slate-400" /> Resume Template
              </label>
              <div className="grid grid-cols-1 gap-2">
                {TEMPLATES.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    onClick={() => handleCustomizationChange('template', tmpl.id)}
                    className={`p-2.5 rounded-xl text-left border transition-all ${
                      resumeData.customization.template === tmpl.id
                        ? 'bg-indigo-600/15 border-indigo-500 text-indigo-200'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                    }`}
                  >
                    <span className="text-xs font-bold block text-white">{tmpl.name}</span>
                    <span className="text-[11px] block opacity-80">{tmpl.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Accent Color Picker (Presets + Custom HEX) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-slate-300">Accent Color</label>
                <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                  <input
                    type="color"
                    value={resumeData.customization.accentColor || '#6366f1'}
                    onChange={(e) => handleCustomizationChange('accentColor', e.target.value)}
                    className="w-5 h-5 rounded cursor-pointer bg-transparent border-0"
                    title="Custom HEX Color Picker"
                  />
                  <span>{resumeData.customization.accentColor}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {ACCENT_COLORS.map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => handleCustomizationChange('accentColor', c.hex)}
                    className={`w-7 h-7 rounded-full transition-transform flex items-center justify-center ${
                      resumeData.customization.accentColor === c.hex
                        ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-950 scale-110'
                        : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {resumeData.customization.accentColor === c.hex && <Check className="w-3.5 h-3.5 text-white" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Font Family Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-300 flex items-center gap-1">
                <Type className="w-3.5 h-3.5 text-slate-400" /> Font Typography
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'sans', label: 'Modern Sans' },
                  { id: 'serif', label: 'Classic Serif' },
                  { id: 'mono', label: 'Tech Mono' },
                ].map((font) => (
                  <button
                    key={font.id}
                    onClick={() => handleCustomizationChange('fontFamily', font.id)}
                    className={`py-1.5 rounded-lg text-xs font-medium border text-center transition-all ${
                      resumeData.customization.fontFamily === font.id
                        ? 'bg-indigo-600 text-white border-indigo-500'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {font.label}
                  </button>
                ))}
              </div>
            </div>

            {/* QR Code Feature Options */}
            <div className="pt-3 border-t border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-white flex items-center gap-1.5">
                  <QrCode className="w-4 h-4 text-indigo-400" /> Resume QR Code
                </label>
                <input
                  type="checkbox"
                  checked={Boolean(resumeData.customization.showQrCode)}
                  onChange={(e) => handleCustomizationChange('showQrCode', e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 bg-slate-950"
                />
              </div>

              {resumeData.customization.showQrCode && (
                <div className="space-y-1">
                  <label className="block text-[11px] text-slate-400">QR Scan Target Link</label>
                  <input
                    type="text"
                    value={resumeData.customization.qrCodeTarget || ''}
                    onChange={(e) => handleCustomizationChange('qrCodeTarget', e.target.value)}
                    placeholder="https://yourportfolio.dev"
                    className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              )}
            </div>

            {/* Data Backup & Restore (JSON Export/Import) */}
            <div className="pt-3 border-t border-slate-800/80 space-y-2">
              <label className="block text-xs font-bold text-white">Backup & Restore Resume</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleExportJson}
                  className="flex items-center justify-center gap-1 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-indigo-400" /> Export JSON
                </button>

                <label className="flex items-center justify-center gap-1 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 cursor-pointer transition-colors">
                  <Upload className="w-3.5 h-3.5 text-emerald-400" /> Restore JSON
                  <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
                </label>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
