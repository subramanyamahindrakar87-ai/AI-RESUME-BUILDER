import React from 'react';
import { X, Download, Printer, Palette, Eye } from 'lucide-react';
import { TemplateSwitcher } from './ResumeTemplates/TemplateSwitcher';
import { exportToPdf } from '../utils/pdfExporter';

export const PreviewModal = ({ isOpen, onClose, resumeData, setResumeData }) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    const filename = `${(resumeData.personalInfo.fullName || 'Resume').replace(/\s+/g, '_')}_Resume.pdf`;
    exportToPdf('resume-preview-document', filename);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleTemplateSelect = (tmplId) => {
    setResumeData({
      ...resumeData,
      customization: {
        ...resumeData.customization,
        template: tmplId
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header Controls */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/80 flex flex-wrap items-center justify-between gap-4 no-print shrink-0">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-indigo-400" />
            <div>
              <h3 className="text-sm font-bold text-white">Full-Screen Resume Preview</h3>
              <p className="text-[11px] text-slate-400">Live rendered document ready for PDF export</p>
            </div>
          </div>

          {/* Quick Template Switcher Pills */}
          <div className="hidden md:flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
            {[
              { id: 'modern', label: 'Modern' },
              { id: 'executive', label: 'Executive' },
              { id: 'minimalist', label: 'Minimalist' },
              { id: 'creative', label: 'Creative' },
              { id: 'compact', label: 'Compact' },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => handleTemplateSelect(t.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  resumeData.customization.template === t.id
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-md shadow-indigo-600/30 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Render Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-950 flex justify-center">
          <div id="resume-preview-document" className="w-full max-w-[800px] print-area">
            <TemplateSwitcher data={resumeData} />
          </div>
        </div>

      </div>
    </div>
  );
};
