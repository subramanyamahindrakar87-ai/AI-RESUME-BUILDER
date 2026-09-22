import React, { useState } from 'react';
import { 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  ExternalLink, 
  Sparkles, 
  Briefcase, 
  FolderGit2, 
  GraduationCap, 
  Cpu, 
  Award,
  Download,
  Copy,
  Check,
  Code
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const PortfolioPage = ({ resumeData }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = resumeData;
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  const handleCopyEmail = () => {
    if (personalInfo.email) {
      navigator.clipboard.writeText(personalInfo.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const handleExportHtml = () => {
    confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
    
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${personalInfo.fullName || "Portfolio"} - ${personalInfo.jobTitle || "Portfolio"}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>body { font-family: 'Plus Jakarta Sans', sans-serif; }</style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen antialiased">
  <div class="max-w-5xl mx-auto px-6 py-12 space-y-16">
    <header class="text-center space-y-4">
      <h1 class="text-4xl sm:text-5xl font-extrabold text-white">${personalInfo.fullName || "Alex Morgan"}</h1>
      <p class="text-xl text-indigo-400 font-semibold">${personalInfo.jobTitle || "Professional Title"}</p>
      <p class="text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed">${personalInfo.summary || ""}</p>
      <div class="flex justify-center gap-4 pt-2 text-sm">
        ${personalInfo.email ? `<a href="mailto:${personalInfo.email}" class="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold">Contact Me</a>` : ''}
        ${personalInfo.github ? `<a href="${personalInfo.github}" target="_blank" class="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 border border-slate-700">GitHub</a>` : ''}
      </div>
    </header>

    <section class="space-y-6">
      <h2 class="text-2xl font-bold text-white border-b border-slate-800 pb-2">Featured Projects</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${(projects || []).map(p => `
          <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
            <h3 class="text-lg font-bold text-white">${p.title}</h3>
            <p class="text-slate-400 text-sm">${p.description}</p>
            <div class="flex flex-wrap gap-1.5 pt-1">
              ${(p.techStack || []).map(t => `<span class="px-2.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 text-xs font-semibold">${t}</span>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(personalInfo.fullName || 'portfolio').toLowerCase().replace(/\s+/g, '-')}-portfolio.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const categories = ['All', ...(skills || []).map(s => s.category)];
  const filteredSkills = activeCategory === 'All' 
    ? (skills || []).flatMap(s => s.items) 
    : (skills || []).find(s => s.category === activeCategory)?.items || [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20 animate-fadeIn">
      
      {/* Portfolio Floating Toolbar */}
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Live Personal Portfolio Preview</span>
        </div>

        <button
          onClick={handleExportHtml}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 shadow-md transition-all"
        >
          <Code className="w-3.5 h-3.5 text-indigo-400" />
          <span>Export Single-File Portfolio HTML</span>
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 px-4">
        <div className="absolute inset-0 glow-gradient pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Available for New Opportunities</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
            Hi, I'm <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">{personalInfo.fullName || "Alex Morgan"}</span>
          </h1>

          <p className="text-xl sm:text-2xl font-bold text-slate-300">
            {personalInfo.jobTitle || "Senior Software Engineer"}
          </p>

          {personalInfo.summary && (
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
              {personalInfo.summary}
            </p>
          )}

          {/* Location & Quick Contact */}
          <div className="flex flex-wrap justify-center items-center gap-4 text-xs font-medium text-slate-400 pt-2">
            {personalInfo.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" /> {personalInfo.location}
              </span>
            )}
            {personalInfo.email && (
              <button onClick={handleCopyEmail} className="flex items-center gap-1 hover:text-indigo-300 transition-colors">
                <Mail className="w-3.5 h-3.5 text-indigo-400" /> {personalInfo.email}
                {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-500" />}
              </button>
            )}
          </div>

          {/* Social Links Buttons */}
          <div className="flex justify-center items-center gap-3 pt-4">
            {personalInfo.github && (
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-indigo-500/50 transition-all">
                <Github className="w-5 h-5" />
              </a>
            )}
            {personalInfo.linkedin && (
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-indigo-500/50 transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {personalInfo.website && (
              <a href={personalInfo.website} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-indigo-500/50 transition-all">
                <Globe className="w-5 h-5" />
              </a>
            )}
          </div>

        </div>
      </section>

      {/* Projects Showcase */}
      {projects && projects.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 py-12 space-y-8 border-t border-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
                <FolderGit2 className="w-6 h-6 text-indigo-400" /> Featured Projects
              </h2>
              <p className="text-xs text-slate-400">Applications & open-source solutions engineered by me</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((proj, pIdx) => (
              <div key={pIdx} className="glass-panel rounded-2xl p-6 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-4 group">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">{proj.title}</h3>
                  <div className="flex items-center gap-2">
                    {proj.github && (
                      <a href={proj.github} target="_blank" rel="noreferrer" className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {proj.liveDemo && (
                      <a href={proj.liveDemo} target="_blank" rel="noreferrer" className="p-1.5 rounded-lg text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{proj.description}</p>

                {proj.techStack && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.techStack.map((tech, tIdx) => (
                      <span key={tIdx} className="px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills Matrix Section */}
      {skills && skills.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 py-12 space-y-6 border-t border-slate-900">
          <div>
            <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
              <Cpu className="w-6 h-6 text-indigo-400" /> Skills & Technical Stack
            </h2>
            <p className="text-xs text-slate-400">Core technologies, frameworks, and methodologies</p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Skill Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {filteredSkills.map((skill, sIdx) => (
              <div key={sIdx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/30 flex items-center justify-between text-xs font-semibold text-slate-200 transition-all">
                <span>{skill}</span>
                <Sparkles className="w-3.5 h-3.5 text-indigo-400 opacity-60" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Work Experience Timeline */}
      {experience && experience.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 py-12 space-y-8 border-t border-slate-900">
          <div>
            <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-indigo-400" /> Career Experience
            </h2>
            <p className="text-xs text-slate-400">Professional growth and roles held</p>
          </div>

          <div className="space-y-6 relative border-l-2 border-slate-800 ml-3 pl-6">
            {experience.map((exp, idx) => (
              <div key={idx} className="relative space-y-2 group">
                <span className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-indigo-500 border-4 border-slate-950 group-hover:scale-125 transition-transform" />
                
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-base font-bold text-white">{exp.role}</h3>
                  <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>

                <p className="text-xs font-semibold text-slate-400">{exp.company} • {exp.location}</p>

                {exp.description && (
                  <ul className="list-disc list-outside ml-4 text-xs text-slate-300 space-y-1 pt-1">
                    {exp.description.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education & Certifications */}
      <section className="max-w-5xl mx-auto px-4 py-12 border-t border-slate-900 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {education && education.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-indigo-400" /> Education
            </h2>
            <div className="space-y-3">
              {education.map((edu, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <h3 className="text-sm font-bold text-white">{edu.degree}</h3>
                  <p className="text-xs text-indigo-300">{edu.institution}</p>
                  <p className="text-xs text-slate-400">{edu.startDate} – {edu.endDate} {edu.gpa ? `• GPA: ${edu.gpa}` : ''}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {certifications && certifications.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-400" /> Certifications
            </h2>
            <div className="space-y-3">
              {certifications.map((cert, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <h3 className="text-sm font-bold text-white">{cert.title}</h3>
                  <p className="text-xs text-slate-400">{cert.issuer} • Issued {cert.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </section>

      {/* Footer Contact Banner */}
      <footer className="max-w-4xl mx-auto px-4 pt-12 text-center border-t border-slate-900 space-y-4">
        <h3 className="text-2xl font-bold text-white">Let's Connect & Work Together</h3>
        <p className="text-xs text-slate-400">Feel free to reach out via email or LinkedIn</p>

        {personalInfo.email && (
          <div className="pt-2">
            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 hover:scale-105 transition-transform"
            >
              <Mail className="w-4 h-4" /> Send Email
            </a>
          </div>
        )}
      </footer>

    </div>
  );
};
