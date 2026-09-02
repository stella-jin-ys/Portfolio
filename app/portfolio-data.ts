export const pageContent = {
  meta: {
    title: "Stella Jin | Full-stack & AI Developer",
    description: "Portfolio of Stella Jin, technical and commercially minded professional with experience translating business needs into digital solutions.",
  },
  nav: { home: "Home", about: "About", work: "Work", contact: "Get in touch" },
  hero: {
    eyebrow: "Full-stack & AI developer",
    titleLead: "Building thoughtful",
    titleAccent: "digital products.",
    summary: "",
    primaryAction: "See my work",
    secondaryAction: "Contact",

  },
  heroPanels: {
    intro: ["Technical and commercially minded professional with experience translating business needs into digital solutions."],
    introTitle: "Craft that ships every sprint",
    currentLabel: "",
    currentText: "Full-stack & AI developer with a background in business and marketing.",
    currentAction: "More about me",
  },
  techStack: ["React & Vue", "TypeScript", "AI integration", ".NET full-stack", "UI / UX", "Frontend engineering"],
  about: {
    label: "About",
    titleLead: "A blend of soft skills",
    titleAccent: "technical depth.",
    body: "I independently translate business requirements into technical implementations and collaborate closely with stakeholders. Most recently I built financial features in Vue/Nuxt and shipped an AI agent for natural-language financial insights.",
  },
  work: { label: "Selected work", title: "Personal projects", countLabel: "case studies" },
  contact: {
    title: "Get in touch!",
    infoLabel: "",
    form: {
      nameLabel: "Name",
      namePlaceholder: "Your name",
      emailLabel: "Email",
      emailPlaceholder: "Your email",
      messageLabel: "Message",
      messagePlaceholder: "Your message",
      submitAction: "Send message",
      sendingAction: "Sending…",
      successMessage: "Thank you — your message has been sent.",
      errorMessage: "The message could not be sent. Please email me directly.",
    },
    footerCopyright: "© 2026 Stella Jin",
    footerLocation: "Lund · Sweden",
  },
  showcase: {
    label: "Project showcase",
    fallbackTitle: "Project demo",
    message: "Demo showcase coming soon. This page is ready for the live walkthrough, visuals, and case-study details.",
    backAction: "Back to projects",
  },
} as const;

export const techStack = pageContent.techStack;

export const skills = [
  { label: "Frontend", value: "React, Vue, Nuxt, TypeScript, Tailwind, Material UI" },
  { label: "Backend", value: "Node.js, Express, C#, ASP.NET Core, .NET 9" },
  { label: "AI / ML", value: "LLM integration, Azure OpenAI, OpenRouter, Python" },
  { label: "Data", value: "MongoDB, MySQL, SQL Server, Azure Cosmos DB" },
] as const;

export const experience = [
  { role: "Full-stack Developer Intern", company: "Findex, Göteborg, Sweden", period: "2025 — 2026" },
  { role: "AI Developer Intern", company: "Kodexe, Malmö, Sweden", period: "2025 - 2025" },
  { role: "Frontend Developer Consultant", company: "European Spallation Source, Lund, Sweden", period: "2022 — 2023" },
  { role: "Global Sales & Marketing Coordinator", company: "PolyPeptide Group, Malmö, Sweden", period: "2021 — 2022" },
  { role: "Procurement consultant", company: "GibsonMedical, Lomma, Sweden", period: "2020 - 2021" },
  { role: "Senior Account Executive", company: "WeAreSocial Advertising Agency Shanghai, China", period: "2015 - 2017" },
] as const;

export const projects = [
  {
    title: "Life management app",
    demoHref: "https://stella-jin-ys.github.io/Life-management-app/",
    year: "2026",
    summary: "A focused workspace for organizing everyday plans, routines, and personal priorities.",
    tags: ["React", "TypeScript", "Productivity", "Responsive UI"],
  },
  {
    title: "AI budget travel planner",
    demoHref: "/projects/travel-budget-ai-assistant",
    year: "2026",
    summary: "An AI-assisted travel planning experience that turns trip ideas into practical, budget-aware itineraries.",
    tags: ["React", "TypeScript", "AI", "Responsive UI"],
  },
  {
    title: "Social Sport App- Sportship",
    demoHref: "https://social-sport-app-sportship.vercel.app/",
    year: "2026",
    summary: "A social sports experience for discovering activities, connecting with people, and staying active together.",
    tags: ["React", "TypeScript", "Social", "Responsive UI"],
  },
  {
    title: "Financial Insights Platform",
    demoHref: "https://www.myfindex.com/se/",
    year: "2026",
    summary: "Financial product features, business-logic refinements and an AI agent answering natural-language questions over account data.",
    tags: ["Vue", "Nuxt", "Express", "MongoDB", "OpenRouter"],
  },
  {
    title: "Enterprise AI Chatbot",
    demoHref: "https://github.com/stella-jin-ys/AIchatbot",
    year: "2025",
    summary: "A scalable .NET chatbot with Azure OpenAI and multi-database retrieval across Cosmos DB, Azure SQL, File Storage and Elastic Search.",
    tags: ["C#", "ASP.NET Core", "Azure OpenAI", "Cosmos DB"],
  },
  {
    title: "Operations CRM Dashboard",
    demoHref: "https://stella-jin-ys.github.io/operations-crm-dashboard/",
    year: "2023",
    summary: "Responsive logistics apps and store kiosks for a research facility, plus REST integrations and parameter-driven Cognos reporting.",
    tags: ["React", "Redux", "Material UI", "MySQL"],
  },
  {
    title: "Business Intelligent Workspace",
    demoHref: "https://commercepulse-retail-dashboard.stella-jin123.chatgpt.site/",
    year: "2026",
    summary: "A retail intelligence workspace for turning operational data into clear, actionable decisions.",
    tags: ["React", "TypeScript", "Analytics", "Dashboard"],
  },
] as const;

export const contacts = [
  { label: "Email", text: "stella.jin123@gmail.com", href: "mailto:stella.jin123@gmail.com" },
] as const;
