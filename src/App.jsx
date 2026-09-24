import React, { useState, useEffect } from 'react';
import { initialResumeData } from './types/resumeData';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { FormWizard } from './components/FormBuilder/FormWizard';
import { PortfolioPage } from './components/PortfolioView/PortfolioPage';
import { ApiKeyModal } from './components/ApiKeyModal';
import { PreviewModal } from './components/PreviewModal';
import { exportToPdf } from './utils/pdfExporter';
import { TemplateSwitcher } from './components/ResumeTemplates/TemplateSwitcher';
import { RotateCcw, Eye, Sparkles } from 'lucide-react';

export function App() {
  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem('ai_resume_builder_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.projects && Array.isArray(parsed.projects)) {
          parsed.projects = parsed.projects.filter(
            (p) => !p.title?.includes('OmniFlow') && !p.title?.includes('DevMetrics')
          );
        }
        return parsed;
      } catch (e) {}
    }
    return initialResumeData;
  });

  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem('gemini_api_key') || import.meta.env.VITE_GEMINI_API_KEY || '';
  });

  const [activeView, setActiveView] = useState('portfolio'); // 'portfolio' | 'builder' | 'landing'
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  // Auto-save resume state to local storage
  useEffect(() => {
    localStorage.setItem('ai_resume_builder_data', JSON.stringify(resumeData));
  }, [resumeData]);

  const handleSaveApiKey = (newKey) => {
    setApiKey(newKey);
    localStorage.setItem('gemini_api_key', newKey);
  };

  const handleDownloadPdf = () => {
    const filename = `${(resumeData.personalInfo.fullName || 'Resume').replace(/\s+/g, '_')}_Resume.pdf`;
    exportToPdf('main-resume-live-preview', filename);
  };

  const handleResetData = () => {
    if (window.confirm("Reset resume back to sample template data?")) {
      setResumeData(initialResumeData);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Top Navbar */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        hasApiKey={Boolean(apiKey)}
        onDownloadPdf={handleDownloadPdf}
        onTogglePreview={() => setIsPreviewModalOpen(true)}
      />

      {/* Main View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {activeView === 'landing' && (
          <LandingPage onGetStarted={() => setActiveView('builder')} />
        )}

        {activeView === 'builder' && (
          <div className="space-y-6">
            
            {/* Subheader bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-slate-800">
              <div>
                <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-400" />
                  Interactive Resume & Portfolio Editor
                </h2>
                <p className="text-xs text-slate-400">Fill out your details below to live-generate your resume and personal website.</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetData}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800 transition-colors"
                  title="Reset to sample data"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Sample</span>
                </button>

                <button
                  onClick={() => setIsPreviewModalOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 transition-all"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Full Screen Preview</span>
                </button>
              </div>
            </div>

            {/* Form Wizard & Live Split Preview */}
            <FormWizard
              resumeData={resumeData}
              setResumeData={setResumeData}
              apiKey={apiKey}
              onTogglePreview={() => setIsPreviewModalOpen(true)}
            />

            {/* Hidden live target element for PDF Export */}
            <div className="hidden">
              <div id="main-resume-live-preview">
                <TemplateSwitcher data={resumeData} />
              </div>
            </div>

          </div>
        )}

        {activeView === 'portfolio' && (
          <PortfolioPage resumeData={resumeData} onEditResume={() => setActiveView('builder')} />
        )}

      </main>

      {/* Modals */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        apiKey={apiKey}
        onSaveApiKey={handleSaveApiKey}
      />

      <PreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        resumeData={resumeData}
        setResumeData={setResumeData}
      />

    </div>
  );
}
export default App;
