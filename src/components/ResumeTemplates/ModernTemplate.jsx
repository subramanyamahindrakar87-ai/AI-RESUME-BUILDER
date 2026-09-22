import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Languages } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export const ModernTemplate = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications, customization } = data;
  const accent = customization?.accentColor || '#6366f1';
  const showQr = customization?.showQrCode;
  const qrTarget = customization?.qrCodeTarget || personalInfo.website || 'https://alexmorgan.dev';

  const fontClass = customization?.fontFamily === 'serif' 
    ? 'font-serif' 
    : customization?.fontFamily === 'mono' 
    ? 'font-mono' 
    : 'font-sans';

  return (
    <div className={`w-full bg-white text-slate-900 p-8 shadow-2xl rounded-sm ${fontClass} leading-relaxed text-sm min-h-[1050px]`}>
      
      {/* Header Banner */}
      <div className="border-b-2 pb-6 mb-6 flex flex-col sm:flex-row justify-between items-start gap-4" style={{ borderColor: accent }}>
        
        <div className="flex items-start gap-4 flex-1">
          {/* Profile Photo */}
          {personalInfo.profilePicture && (
            <img 
              src={personalInfo.profilePicture} 
              alt={personalInfo.fullName} 
              className="w-20 h-20 rounded-2xl object-cover border-2 shadow-md shrink-0"
              style={{ borderColor: accent }}
            />
          )}

          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-1">
              {personalInfo.fullName || "Your Name"}
            </h1>
            <p className="text-lg font-semibold tracking-wide mb-3" style={{ color: accent }}>
              {personalInfo.jobTitle || "Professional Title"}
            </p>

            {/* Contact Info Pills */}
            <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 text-xs text-slate-600">
              {personalInfo.email && (
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" /> {personalInfo.email}
                </span>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400" /> {personalInfo.phone}
                </span>
              )}
              {personalInfo.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> {personalInfo.location}
                </span>
              )}
              {personalInfo.languages && (
                <span className="flex items-center gap-1">
                  <Languages className="w-3.5 h-3.5 text-slate-400" /> {personalInfo.languages}
                </span>
              )}
              {personalInfo.website && (
                <a href={personalInfo.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
                  <Globe className="w-3.5 h-3.5 text-slate-400" /> Portfolio
                </a>
              )}
              {personalInfo.linkedin && (
                <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
                  <Linkedin className="w-3.5 h-3.5 text-slate-400" /> LinkedIn
                </a>
              )}
              {personalInfo.github && (
                <a href={personalInfo.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
                  <Github className="w-3.5 h-3.5 text-slate-400" /> GitHub
                </a>
              )}
            </div>
          </div>
        </div>

        {/* QR Code Container */}
        {showQr && (
          <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50 border border-slate-200 text-center shrink-0">
            <QRCodeSVG value={qrTarget} size={64} fgColor="#0f172a" />
            <span className="text-[9px] font-bold text-slate-500 mt-1 uppercase tracking-tight">Scan Portfolio</span>
          </div>
        )}

      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2 text-slate-500">Professional Profile</h2>
          <p className="text-slate-700 leading-relaxed text-xs sm:text-sm">{personalInfo.summary}</p>
        </div>
      )}

      {/* Two-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left / Main Column: Experience & Projects */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Work Experience */}
          {experience && experience.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider mb-3 text-slate-500 border-b pb-1">
                Work History
              </h2>
              <div className="space-y-4">
                {experience.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm">{item.role}</h3>
                        <p className="text-xs font-semibold text-slate-700">{item.company} <span className="font-normal text-slate-500">| {item.location}</span></p>
                      </div>
                      <span className="text-xs font-medium text-slate-500 whitespace-nowrap">
                        {item.startDate} – {item.current ? 'Present' : item.endDate}
                      </span>
                    </div>

                    {item.description && item.description.length > 0 && (
                      <ul className="list-disc list-outside ml-4 text-xs text-slate-600 space-y-1 pt-1">
                        {item.description.map((bullet, bIdx) => (
                          <li key={bIdx}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Featured Projects */}
          {projects && projects.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider mb-3 text-slate-500 border-b pb-1">
                Key Projects
              </h2>
              <div className="space-y-3">
                {projects.map((proj, pIdx) => (
                  <div key={pIdx} className="space-y-1">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-slate-900 text-xs sm:text-sm">{proj.title}</h3>
                      {proj.techStack && (
                        <span className="text-[11px] text-slate-500 font-mono">
                          {proj.techStack.join(' • ')}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Skills, Education, Certifications */}
        <div className="space-y-6">
          
          {/* Skills */}
          {skills && skills.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider mb-3 text-slate-500 border-b pb-1">
                Core Skills
              </h2>
              <div className="space-y-3">
                {skills.map((cat, cIdx) => (
                  <div key={cIdx}>
                    <span className="block text-[11px] font-bold text-slate-700 uppercase mb-1">{cat.category}</span>
                    <div className="flex flex-wrap gap-1">
                      {cat.items.map((skill, sIdx) => (
                        <span key={sIdx} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider mb-3 text-slate-500 border-b pb-1">
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu, eIdx) => (
                  <div key={eIdx}>
                    <h3 className="font-bold text-slate-900 text-xs">{edu.degree}</h3>
                    <p className="text-[11px] text-slate-700">{edu.institution}</p>
                    <p className="text-[11px] text-slate-500">{edu.startDate} – {edu.endDate} {edu.gpa ? `• GPA: ${edu.gpa}` : ''}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider mb-3 text-slate-500 border-b pb-1">
                Certifications
              </h2>
              <div className="space-y-2">
                {certifications.map((cert, certIdx) => (
                  <div key={certIdx}>
                    <h3 className="font-bold text-slate-900 text-xs">{cert.title}</h3>
                    <p className="text-[11px] text-slate-600">{cert.issuer} ({cert.date})</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
