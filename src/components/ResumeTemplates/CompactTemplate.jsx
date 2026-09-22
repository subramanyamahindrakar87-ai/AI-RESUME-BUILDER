import React from 'react';

export const CompactTemplate = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications, customization } = data;
  const accent = customization?.accentColor || '#3b82f6';

  return (
    <div className="w-full bg-white text-slate-900 p-6 shadow-2xl rounded-sm font-sans leading-tight text-xs min-h-[1050px] space-y-4">
      
      {/* Ultra Compact Header */}
      <div className="border-b pb-3 border-slate-300 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-black text-slate-900 uppercase tracking-tight">{personalInfo.fullName || "Your Name"}</h1>
          <p className="text-xs font-bold text-slate-600">{personalInfo.jobTitle}</p>
        </div>
        <div className="text-right text-[11px] text-slate-600 space-x-2">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <p className="text-slate-700 leading-snug">{personalInfo.summary}</p>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5">Experience</h2>
          {experience.map((exp, idx) => (
            <div key={idx} className="space-y-0.5">
              <div className="flex justify-between font-bold text-slate-900">
                <span>{exp.role} <span className="font-normal text-slate-600">at {exp.company}</span></span>
                <span className="text-[11px] font-normal text-slate-500">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              {exp.description && (
                <ul className="list-disc list-outside ml-3 text-slate-700 space-y-0.5">
                  {exp.description.map((b, bIdx) => (
                    <li key={bIdx}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div className="space-y-1">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5">Skills</h2>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-slate-800">
            {skills.map((cat, idx) => (
              <span key={idx}>
                <strong className="text-slate-900">{cat.category}:</strong> {cat.items.join(', ')}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div className="space-y-1.5">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5">Projects</h2>
          {projects.map((proj, idx) => (
            <div key={idx} className="space-y-0.5">
              <span className="font-bold text-slate-900">{proj.title}</span> – <span className="text-slate-600">{proj.description}</span>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div className="space-y-1">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5">Education</h2>
          {education.map((edu, idx) => (
            <div key={idx} className="flex justify-between text-slate-800">
              <span><strong>{edu.degree}</strong>, {edu.institution}</span>
              <span className="text-slate-500">{edu.startDate} – {edu.endDate}</span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
