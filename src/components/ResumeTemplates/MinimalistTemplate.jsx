import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

export const MinimalistTemplate = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications, customization } = data;
  const accent = customization?.accentColor || '#10b981';
  const showQr = customization?.showQrCode;
  const qrTarget = customization?.qrCodeTarget || personalInfo.website || 'https://alexmorgan.dev';

  return (
    <div className="w-full bg-white text-slate-900 p-8 shadow-2xl rounded-sm font-sans leading-relaxed text-xs sm:text-sm min-h-[1050px] space-y-6">
      
      {/* Clean Minimal Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start border-b pb-6 border-slate-200 gap-4">
        <div className="flex items-center gap-4">
          {personalInfo.profilePicture && (
            <img 
              src={personalInfo.profilePicture} 
              alt={personalInfo.fullName} 
              className="w-16 h-16 rounded-full object-cover border border-slate-300 shrink-0"
            />
          )}

          <div>
            <h1 className="text-2xl sm:text-3xl font-light text-slate-900 tracking-tight">
              {personalInfo.fullName || "Your Name"}
            </h1>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-widest mt-0.5">
              {personalInfo.jobTitle || "Professional Title"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-left sm:text-right text-xs text-slate-500 space-y-0.5">
            {personalInfo.email && <p>{personalInfo.email}</p>}
            {personalInfo.phone && <p>{personalInfo.phone}</p>}
            {personalInfo.location && <p>{personalInfo.location}</p>}
            {personalInfo.website && <p className="font-mono text-[11px]">{personalInfo.website}</p>}
          </div>

          {showQr && (
            <div className="shrink-0 p-1 border border-slate-200 rounded">
              <QRCodeSVG value={qrTarget} size={50} fgColor="#0f172a" />
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <p className="text-slate-600 leading-relaxed font-light text-xs sm:text-sm border-l-2 pl-4 py-1" style={{ borderColor: accent }}>
          {personalInfo.summary}
        </p>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Experience</h2>
          {experience.map((exp, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between font-medium text-slate-900">
                <span>{exp.role} — <span className="text-slate-600 font-normal">{exp.company}</span></span>
                <span className="text-xs text-slate-400">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
              </div>
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

      {/* Skills Grid */}
      {skills && skills.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Skills & Expertise</h2>
          <div className="flex flex-wrap gap-2">
            {skills.flatMap(c => c.items).map((skill, sIdx) => (
              <span key={sIdx} className="text-xs text-slate-800 bg-slate-100 px-2.5 py-1 rounded font-mono">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Notable Projects</h2>
          {projects.map((proj, idx) => (
            <div key={idx} className="text-xs space-y-0.5">
              <span className="font-bold text-slate-900">{proj.title}</span>
              <span className="text-slate-500 font-mono text-[11px]"> ({proj.techStack?.join(', ')})</span>
              <p className="text-slate-600">{proj.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Education</h2>
          {education.map((edu, idx) => (
            <div key={idx} className="flex justify-between text-xs text-slate-800">
              <span className="font-semibold">{edu.degree}, {edu.institution}</span>
              <span className="text-slate-400">{edu.startDate} – {edu.endDate}</span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
