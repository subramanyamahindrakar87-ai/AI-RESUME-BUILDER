import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

export const CreativeTemplate = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications, customization } = data;
  const accent = customization?.accentColor || '#ec4899';
  const showQr = customization?.showQrCode;
  const qrTarget = customization?.qrCodeTarget || personalInfo.website || 'https://alexmorgan.dev';

  return (
    <div className="w-full bg-slate-50 text-slate-900 p-8 shadow-2xl rounded-sm font-sans leading-relaxed text-xs sm:text-sm min-h-[1050px] space-y-6">
      
      {/* Top Banner Accent Card */}
      <div 
        className="p-6 rounded-2xl text-white shadow-lg flex flex-col sm:flex-row justify-between items-center gap-4"
        style={{ backgroundColor: accent }}
      >
        <div className="flex items-center gap-4">
          {personalInfo.profilePicture && (
            <img 
              src={personalInfo.profilePicture} 
              alt={personalInfo.fullName} 
              className="w-20 h-20 rounded-2xl object-cover border-2 border-white/40 shadow-md shrink-0"
            />
          )}

          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight">{personalInfo.fullName || "Your Name"}</h1>
            <p className="text-sm font-semibold opacity-90">{personalInfo.jobTitle || "Creative Specialist"}</p>
            
            <div className="flex flex-wrap gap-4 text-xs pt-1 opacity-95">
              {personalInfo.email && <span>✉ {personalInfo.email}</span>}
              {personalInfo.phone && <span>📞 {personalInfo.phone}</span>}
              {personalInfo.location && <span>📍 {personalInfo.location}</span>}
              {personalInfo.website && <span>🌐 {personalInfo.website}</span>}
            </div>
          </div>
        </div>

        {showQr && (
          <div className="bg-white p-2 rounded-xl text-center shrink-0 shadow-md">
            <QRCodeSVG value={qrTarget} size={60} fgColor="#0f172a" />
            <span className="text-[8px] font-bold text-slate-700 block mt-0.5 uppercase">Scan QR</span>
          </div>
        )}
      </div>

      {/* Summary Box */}
      {personalInfo.summary && (
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-slate-700">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-1">About Me</h3>
          <p className="text-xs sm:text-sm leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Main Column */}
        <div className="md:col-span-2 space-y-6">
          {experience && experience.length > 0 && (
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b pb-2">Experience</h2>
              {experience.map((exp, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <span>{exp.role}</span>
                    <span className="text-xs text-slate-400 font-normal">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-600">{exp.company} • {exp.location}</p>
                  {exp.description && (
                    <ul className="list-disc list-outside ml-4 text-xs text-slate-600 space-y-1">
                      {exp.description.map((b, bIdx) => (
                        <li key={bIdx}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {projects && projects.length > 0 && (
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b pb-2">Featured Projects</h2>
              {projects.map((proj, idx) => (
                <div key={idx} className="space-y-1">
                  <h3 className="font-bold text-slate-900">{proj.title}</h3>
                  <p className="text-xs text-slate-600">{proj.description}</p>
                  {proj.techStack && (
                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {proj.techStack.map((tech, tIdx) => (
                        <span key={tIdx} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono">
                          #{tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {skills && skills.length > 0 && (
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b pb-2">Skill Arsenal</h2>
              {skills.map((cat, cIdx) => (
                <div key={cIdx} className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-700 block">{cat.category}</span>
                  <div className="flex flex-wrap gap-1">
                    {cat.items.map((skill, sIdx) => (
                      <span key={sIdx} className="px-2 py-0.5 rounded text-[11px] font-medium text-white shadow-sm" style={{ backgroundColor: accent }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {education && education.length > 0 && (
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b pb-2">Education</h2>
              {education.map((edu, idx) => (
                <div key={idx} className="text-xs text-slate-800">
                  <p className="font-bold">{edu.degree}</p>
                  <p className="text-slate-500">{edu.institution} ({edu.startDate} - {edu.endDate})</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
