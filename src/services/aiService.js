import { GoogleGenerativeAI } from "@google/generative-ai";

// Local Smart Fallback Enhancement Rules when no API Key is provided
const actionVerbs = [
  "Architected", "Engineered", "Optimized", "Spearheaded", "Streamlined",
  "Implemented", "Pioneered", "Orchestrated", "Accelerated", "Delivered"
];

const impactModifiers = [
  "resulting in a 40% reduction in processing overhead",
  "boosting user engagement metrics by 28%",
  "improving system response times from 350ms to under 80ms",
  "enhancing overall codebase reliability and reducing production errors by 45%",
  "delivering key milestones 2 weeks ahead of target schedule"
];

export const enhanceBulletPoint = async (bulletText, apiKey = "") => {
  if (!bulletText || !bulletText.trim()) return bulletText;

  if (apiKey && apiKey.trim()) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey.trim());
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const prompt = `Rewrite the following resume bullet point to make it more professional, impactful, action-oriented, and concise. Use strong action verbs and include realistic quantitative achievements if appropriate. Return ONLY the rewritten bullet point text without extra quotes or conversational intro.\n\nOriginal: "${bulletText}"`;
      const result = await model.generateContent(prompt);
      const text = result.response.text().trim();
      return text.replace(/^["']|["']$/g, '');
    } catch (err) {
      console.warn("Gemini API call failed, falling back to smart engine:", err);
    }
  }

  // Smart Offline Fallback Engine
  const words = bulletText.trim().split(" ");
  let firstWord = words[0];
  const hasVerb = actionVerbs.some(v => v.toLowerCase() === firstWord.toLowerCase());
  
  if (!hasVerb) {
    const randomVerb = actionVerbs[Math.floor(Math.random() * actionVerbs.length)];
    firstWord = `${randomVerb} ${firstWord.toLowerCase()}`;
  }

  let enhanced = [firstWord, ...words.slice(1)].join(" ");
  
  if (!enhanced.endsWith(".")) {
    enhanced += ".";
  }

  // If short, add an impact metric modifier
  if (enhanced.split(" ").length < 9) {
    const randomModifier = impactModifiers[Math.floor(Math.random() * impactModifiers.length)];
    enhanced = `${enhanced.replace(/\.$/, "")}, ${randomModifier}.`;
  }

  return enhanced;
};

export const generateProfessionalSummary = async (jobTitle, experienceList = [], apiKey = "") => {
  const role = jobTitle || "Software Professional";
  
  if (apiKey && apiKey.trim()) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey.trim());
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const prompt = `Write a compelling 3-sentence professional summary for a resume for a ${role}. Focus on expertise, leadership, technical impact, and driving business results. Return ONLY the summary text.`;
      const result = await model.generateContent(prompt);
      return result.response.text().trim();
    } catch (err) {
      console.warn("Gemini API call failed, falling back to smart engine:", err);
    }
  }

  // Fallback Summary Generator
  return `Results-driven ${role} with extensive experience building scalable software solutions and high-throughput systems. Adept at transforming complex business requirements into elegant technical architectures while collaborating across cross-functional teams. Passionate about leveraging cutting-edge tools to accelerate product delivery and optimize performance.`;
};

export const analyzeJobDescription = async (jobDesc, userResume, apiKey = "") => {
  if (!jobDesc || !jobDesc.trim()) return null;

  if (apiKey && apiKey.trim()) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey.trim());
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const prompt = `Analyze this target Job Description against the User's Resume profile.\n\nJOB DESCRIPTION:\n${jobDesc}\n\nUSER RESUME SUMMARY:\nTitle: ${userResume.personalInfo.jobTitle}\nSkills: ${JSON.stringify(userResume.skills)}\nSummary: ${userResume.personalInfo.summary}\n\nProvide JSON output with the following format:\n{\n  "matchScore": 85,\n  "missingKeywords": ["GraphQL", "CI/CD", "Kubernetes"],\n  "strengthPoints": ["Strong full stack experience", "React mastery"],\n  "tailoredAdvice": "Emphasize cloud deployment and containerization experience in your work bullets."\n}`;
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (err) {
      console.warn("Gemini API job analysis error:", err);
    }
  }

  // Fallback Job Description Matcher Logic
  const descLower = jobDesc.toLowerCase();
  const allUserSkills = userResume.skills.flatMap(s => s.items.map(i => i.toLowerCase()));
  const commonTech = ["react", "typescript", "node.js", "python", "sql", "aws", "gcp", "docker", "graphql", "tailwind", "rest api", "ci/cd", "microservices"];
  
  const requiredTechInDesc = commonTech.filter(tech => descLower.includes(tech));
  const matchedTech = requiredTechInDesc.filter(tech => allUserSkills.some(s => s.includes(tech)));
  const missingTech = requiredTechInDesc.filter(tech => !allUserSkills.some(s => s.includes(tech)));

  const matchRatio = requiredTechInDesc.length > 0 ? Math.round((matchedTech.length / requiredTechInDesc.length) * 100) : 80;
  const matchScore = Math.min(95, Math.max(60, matchRatio > 0 ? matchRatio : 78));

  return {
    matchScore,
    missingKeywords: missingTech.length > 0 ? missingTech.map(t => t.toUpperCase()) : ["Docker", "Kubernetes", "GraphQL"],
    strengthPoints: matchedTech.length > 0 ? matchedTech.map(t => `Solid experience with ${t.toUpperCase()}`) : ["Strong engineering background", "Good frontend/backend coverage"],
    tailoredAdvice: `Add relevant projects or bullet points showcasing skills in ${missingTech.join(", ") || "Cloud Architecture"}.`
  };
};

export const auditResumeHealth = (resumeData) => {
  let score = 0;
  const suggestions = [];

  // Personal Info Audit (20 pts)
  if (resumeData.personalInfo.fullName) score += 5;
  if (resumeData.personalInfo.email && resumeData.personalInfo.phone) score += 5;
  if (resumeData.personalInfo.location) score += 5;
  if (resumeData.personalInfo.summary && resumeData.personalInfo.summary.length > 40) {
    score += 5;
  } else {
    suggestions.push({ type: "warning", message: "Expand your professional summary to highlight core achievements." });
  }

  // Experience Audit (30 pts)
  if (resumeData.experience.length >= 1) {
    score += 15;
    const hasBullets = resumeData.experience.some(e => e.description && e.description.length > 0);
    if (hasBullets) score += 15;
    else suggestions.push({ type: "error", message: "Add 2-3 bullet points for each work experience entry." });
  } else {
    suggestions.push({ type: "error", message: "Add at least 1 work experience entry." });
  }

  // Education Audit (15 pts)
  if (resumeData.education.length >= 1) score += 15;
  else suggestions.push({ type: "warning", message: "Include your degree or educational background." });

  // Skills Audit (20 pts)
  const totalSkills = resumeData.skills.reduce((acc, cat) => acc + cat.items.length, 0);
  if (totalSkills >= 6) {
    score += 20;
  } else {
    score += Math.min(15, totalSkills * 2);
    suggestions.push({ type: "info", message: "List at least 6-8 core technical & soft skills." });
  }

  // Projects & Certifications Audit (15 pts)
  if (resumeData.projects.length >= 1) score += 10;
  if (resumeData.certifications.length >= 1) score += 5;

  if (score >= 90) {
    suggestions.unshift({ type: "success", message: "Your resume is ATS-ready and highly competitive!" });
  }

  return { score, suggestions };
};

export const generateCoverLetter = async (targetCompany, targetRole, hiringManager, userResume, apiKey = "") => {
  const name = userResume.personalInfo.fullName || "Candidate";
  const userTitle = userResume.personalInfo.jobTitle || "Professional";
  const company = targetCompany || "the company";
  const role = targetRole || userTitle;
  const manager = hiringManager || "Hiring Team";

  if (apiKey && apiKey.trim()) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey.trim());
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const prompt = `Write a highly professional 4-paragraph Cover Letter from ${name} (${userTitle}) applying for the ${role} position at ${company}.\nAddressed to ${manager}.\nHighlight key achievements: ${userResume.personalInfo.summary}\nReturn ONLY the cover letter text.`;
      const result = await model.generateContent(prompt);
      return result.response.text().trim();
    } catch (err) {
      console.warn("Gemini API cover letter generation failed, using smart engine:", err);
    }
  }

  // Fallback Smart Cover Letter Generator
  return `Dear ${manager},\n\nI am writing to express my strong enthusiasm for the ${role} position at ${company}. As a ${userTitle} with proven expertise in building scalable, reliable, and high-impact software solutions, I am confident in my ability to make immediate contributions to your engineering team.\n\nMy background includes hands-on leadership in full-stack application development, cloud architecture, and cross-functional team collaboration. In my recent roles, I have consistently focused on delivering robust features, optimizing performance, and translating product requirements into high-quality code.\n\nWhat excites me about ${company} is your commitment to engineering excellence and innovation. I am eager to leverage my technical skill set and problem-solving mindset to help achieve your upcoming product milestones.\n\nThank you for your time and consideration. I would welcome the opportunity to discuss how my experience and passion align with the needs of ${company}.\n\nSincerely,\n${name}`;
};
