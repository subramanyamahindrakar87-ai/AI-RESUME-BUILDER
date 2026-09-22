export const initialResumeData = {
  personalInfo: {
    fullName: "Alex Morgan",
    jobTitle: "Senior Full Stack Engineer & AI Architect",
    email: "alex.morgan@techforge.io",
    phone: "+1 (555) 382-9102",
    location: "San Francisco, CA",
    website: "https://alexmorgan.dev",
    linkedin: "https://linkedin.com/in/alexmorgan-tech",
    github: "https://github.com/alexmorgan-dev",
    twitter: "https://x.com/alexmorgan_dev",
    customLink: "https://drive.google.com/your-portfolio-pdf",
    profilePicture: "/images/portfolio_3d_avatar.jpg",
    languages: "English (Native), Spanish (Professional Working), French (Basic)",
    summary: "High-impact Full Stack Engineer with 6+ years of experience designing scalable web applications, microservices, and AI-driven solutions. Proven track record of reducing latency by 45% and leading cross-functional teams to deliver enterprise products."
  },
  experience: [
    {
      id: "exp-1",
      role: "Senior Full Stack Engineer",
      company: "Nexus AI Solutions",
      location: "San Francisco, CA",
      startDate: "Jan 2022",
      endDate: "Present",
      current: true,
      description: [
        "Architected real-time streaming analytics platform serving 2.5M+ active daily users using React, Node.js, and WebSockets.",
        "Integrated generative AI APIs for automated workflow summarization, improving end-user productivity by 35%.",
        "Mentored a team of 6 junior and mid-level engineers, enforcing CI/CD best practices and 92% code coverage."
      ]
    },
    {
      id: "exp-2",
      role: "Software Engineer",
      company: "Apex Cloud Innovations",
      location: "Austin, TX",
      startDate: "Jun 2019",
      endDate: "Dec 2021",
      current: false,
      description: [
        "Engineered scalable microservices architecture on Google Cloud Platform, optimizing database queries to reduce p99 response time from 420ms to 90ms.",
        "Developed custom design system components used across 14 internal and client-facing web applications.",
        "Collaborated with product managers to deliver 18 core features ahead of quarterly sprint schedules."
      ]
    }
  ],
  education: [
    {
      id: "edu-1",
      degree: "B.S. in Computer Science",
      institution: "University of California, Berkeley",
      location: "Berkeley, CA",
      startDate: "Sep 2015",
      endDate: "May 2019",
      gpa: "3.85 / 4.0",
      honors: "Magna Cum Laude, Dean's Honors List"
    }
  ],
  skills: [
    { category: "Languages & Core", items: ["TypeScript", "JavaScript", "Python", "SQL", "HTML5/CSS3", "GraphQL"] },
    { category: "Frontend Frameworks", items: ["React", "Next.js", "Tailwind CSS", "Redux Toolkit", "Vue.js", "Vite"] },
    { category: "Backend & Cloud", items: ["Node.js", "Express", "PostgreSQL", "MongoDB", "GCP", "Docker", "Redis"] },
    { category: "AI & Data Tools", items: ["Gemini API", "OpenAI SDK", "LangChain", "Vector DBs", "PyTorch Basics"] }
  ],
  projects: [
    {
      id: "proj-1",
      title: "OmniFlow AI - Smart Workflow Automation",
      description: "An AI-powered task orchestrator that converts natural language commands into automated multi-step browser and API workflows.",
      techStack: ["React", "TypeScript", "Node.js", "Gemini API", "Tailwind CSS"],
      github: "https://github.com/alexmorgan-dev/omniflow-ai",
      liveDemo: "https://omniflow-demo.app"
    },
    {
      id: "proj-2",
      title: "DevMetrics - Engineering Team Dashboard",
      description: "Real-time engineering telemetry dashboard analyzing PR cycle time, deployment frequency, and system reliability metrics.",
      techStack: ["Next.js", "PostgreSQL", "Recharts", "Docker", "Tailwind CSS"],
      github: "https://github.com/alexmorgan-dev/devmetrics",
      liveDemo: "https://devmetrics-live.io"
    }
  ],
  certifications: [
    {
      id: "cert-1",
      title: "Google Cloud Certified Professional Cloud Architect",
      issuer: "Google Cloud",
      date: "2023",
      credentialUrl: "https://cloud.google.com/certification"
    },
    {
      id: "cert-2",
      title: "AWS Certified Solutions Architect – Associate",
      issuer: "Amazon Web Services",
      date: "2021",
      credentialUrl: "https://aws.amazon.com/certification"
    }
  ],
  coverLetter: {
    recipientCompany: "Acme Tech Solutions",
    targetRole: "Senior Full Stack Engineer",
    hiringManager: "Hiring Team",
    content: "Dear Hiring Team,\n\nI am writing to express my enthusiastic interest in the Senior Full Stack Engineer role at Acme Tech Solutions. With over 6 years of experience building high-throughput web applications, microservices, and AI-driven platforms, I am eager to bring my technical expertise to your team.\n\nThroughout my career, I have specialized in React, Node.js, TypeScript, and Cloud Architecture—reducing system latency by 45% and leading cross-functional teams to ship enterprise-grade products. I am particularly drawn to Acme Tech Solutions' vision for innovative software products.\n\nThank you for your time and consideration. I look forward to discussing how my background aligns with your engineering goals.\n\nSincerely,\nAlex Morgan"
  },
  customSections: [
    {
      id: "custom-1",
      title: "Languages Spoken",
      items: ["English (Native)", "Spanish (Professional Working)", "French (Elementary)"]
    },
    {
      id: "custom-2",
      title: "Speaking & Workshops",
      items: ["Speaker at SF Tech Summit 2023: 'Scaling React Microfrontends'", "Panelist at AI Developer Conf 2022"]
    }
  ],
  customization: {
    template: "modern", // 'modern' | 'executive' | 'minimalist' | 'creative' | 'compact'
    accentColor: "#6366f1", // HEX color
    fontFamily: "sans", // 'sans' | 'serif' | 'mono'
    spacing: "normal", // 'compact' | 'normal' | 'spacious'
    portfolioTheme: "dark-glass", // 'dark-glass' | 'cyberpunk' | 'minimal-light' | 'emerald'
    showQrCode: true,
    qrCodeTarget: "https://alexmorgan.dev",
    showProfilePhoto: true
  }
};
