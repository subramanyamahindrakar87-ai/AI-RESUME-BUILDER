import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

export const ExecutiveTemplate = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications, customization } = data;
  const accent = customization?.accentColor || '#4338ca';
  const showQr = customization?.showQrCode;
  const qrTarget = customization?.qrCodeTarget || personalInfo.website || 'https://alexmorgan.dev';

  return (
    <div className="w-full bg-white text-slate-900 p-10 shadow-2xl rounded-sm font-serif leading-relaxed text-sm min-h-[1050px]">
      
      {/* Centered Executive Header */}
      <div className="text-center pb-6 border-b-2 border-slate-900 mb-6 space-y-2 relative">
        
        {personalInfo.profilePicture && (
          <img 
            src={personalInfo.profilePicture} 
            alt={personalInfo.fullName} 
            className="w-20 h-20 rounded-full object-cover mx-auto mb-2 border-2 border-slate-900 shadow-md"
          />
        )}

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 uppercase">
          {personalInfo.fullName || "Your Full Name"}
        </h1>
        <p className="text-sm font-semibold tracking-widest uppercase" style={{ color: accent }}>
          {personalInfo.jobTitle || "Executive Title"}
        </p>

        <div className="flex flex-wrap justify-center items-center gap-x-3 text-xs text-slate-600 font-sans pt-1">
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.email && <span>• {personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.website && <span>• {personalInfo.website}</span>}
        </div>

        {showQr && (
          <div className="absolute right-0 top-0 hidden sm:flex flex-col items-center justify-center p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-center">
            <QRCodeSVG value={qrTarget} size={56} fgColor="#0f172a" />
            <span className="text-[8px] font-bold text-slate-500 mt-0.5 uppercase">Online Profile</span>
          </div>
        )}
      </div>

      {/* Executive Summary */}
      {personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-2 font-sans">
            Executive Summary
          </h2>
          <p className="text-slate-800 text-xs sm:text-sm italic">{personalInfo.summary}</p>
        </div>
      )}

      {/* Core Competencies Matrix */}
      {skills && skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-2 font-sans">
            Areas of Expertise
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-sans">
            {skills.flatMap(cat => cat.items).map((skill, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-slate-800">
                <span style={{ color: accent }}>▪</span>
                <span className="font-semibold">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Professional Experience */}
      {experience && experience.length > 0 && (
        <div className="mb-6 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-3 font-sans">
            Professional Experience
          </h2>
          {experience.map((exp, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between items-baseline font-sans">
                <h3 className="font-bold text-slate-900 text-sm">{exp.role}</h3>
                <span className="text-xs text-slate-600 font-medium">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <p className="text-xs font-semibold text-slate-700 italic font-sans">{exp.company}, {exp.location}</p>

              {exp.description && (
                <ul className="list-disc list-outside ml-4 text-xs text-slate-800 space-y-1 pt-1 font-serif">
                  {exp.description.map((bullet, bIdx) => (
                    <li key={bIdx}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education & Credentials */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-sans">
        {education && education.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Education
            </h2>
            {education.map((edu, idx) => (
              <div key={idx} className="text-xs text-slate-800 space-y-0.5">
                <p className="font-bold">{edu.degree}</p>
                <p>{edu.institution}, {edu.startDate} – {edu.endDate}</p>
              </div>
            ))}
          </div>
        )}

        {certifications && certifications.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Certifications
            </h2>
            {certifications.map((cert, idx) => (
              <div key={idx} className="text-xs text-slate-800 space-y-0.5">
                <p className="font-bold">{cert.title}</p>
                <p>{cert.issuer} ({cert.date})</p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
