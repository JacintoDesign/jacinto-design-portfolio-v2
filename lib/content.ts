// All copy lives here, transcribed from CONTENT.md (plus the hero/section
// copy approved in the static-build plan). Components stay structural.

export interface Project {
  index: string;
  title: string;
  tags: string[];
  description: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  screenshot: string;
  alt: string;
}

// Hero, contact, skills-band and footer copy below is carried over from the
// v1 portfolio (motion-graphic-portfolio.vercel.app) at the user's request.
export const hero = {
  eyebrow:
    "Senior Developer at CBC · Instructor at Zero to Mastery · Toronto, Canada",
  name: { first: "Jacinto", second: "Design" },
  subhead:
    "Crafting exceptional digital experiences through innovative design and cutting-edge technology.",
  scrollHint: "Scroll",
};

export const about = {
  eyebrow: "About me",
  heading: "A self-taught developer making quality education accessible.",
  stats: [
    { value: "8+", label: "Years as senior developer" },
    { value: "5+", label: "Years teaching developers" },
    { value: "100+", label: "Projects created" },
  ],
  storyBeats: [
    {
      index: "01",
      title: "The spark",
      body: "I'm a Senior Developer at the Canadian Broadcasting Corporation with a passion for technology that started at age 12 when I built my first computer.",
    },
    {
      index: "02",
      title: "The leap",
      body: "As a self-taught developer who landed a Senior Developer role after just 4 months of online learning, I understand the challenges of breaking into tech.",
    },
    {
      index: "03",
      title: "The craft",
      body: "At the CBC, I work on election night television programming and design and build HTML graphics for the Olympics — front-end work that runs live on national broadcasts.",
    },
    {
      index: "04",
      title: "Teaching",
      body: "With 5 years of teaching experience in Canada and South Korea, I now combine my technical skills and educational background as an instructor for Zero to Mastery Academy.",
    },
    {
      index: "05",
      title: "The mission",
      body: "I'm dedicated to creating high-quality, affordable courses that help students build real portfolio projects and confidently transition into web development careers — quality education accessible to everyone, regardless of background or budget.",
    },
  ],
  latestCourse: {
    label: "Latest course",
    // Rendered as two lines, broken after the colon.
    titleLines: ["The Vibe Coding Bootcamp:", "Become an AI-Augmented Developer"],
    blurb:
      "An AI-first path into tech — master tools like Cursor, Copilot, Claude and Gemini, direct your vision, build real projects, and create a job-ready portfolio. Live on Zero to Mastery.",
    url: "https://zerotomastery.io/courses/learn-vibe-coding/",
    linkLabel: "View the course",
  },
  nowPanel: {
    label: "Currently building",
    title: "Agentic Engineering course",
    blurb:
      "Go from vibe-coding to Agentic Engineering — plan, direct, and ship products that survive contact with reality, with Claude Code, Cursor, Codex and Antigravity. In progress at Zero to Mastery.",
  },
};

export const projectsSection = {
  eyebrow: "Selected work",
  heading: "Things I've Built",
};

export const projects: Project[] = [
  {
    index: "01",
    title: "VibeMail",
    tags: ["Full-Stack", "App", "2026"],
    description:
      "A full-stack email client in a frosted-glass, fully monospaced interface — virtualised threads, instant search, Supabase backend.",
    tech: ["TypeScript", "Next.js", "Supabase", "PostgreSQL"],
    liveUrl: "https://vibemail-fullstack.vercel.app/demo",
    githubUrl: "https://github.com/JacintoDesign/vibemail-fullstack",
    screenshot: "/vibemail.jpg",
    alt: "VibeMail — frosted-glass, monospaced email client interface",
  },
  {
    index: "02",
    title: "Waypoint",
    tags: ["Geospatial", "Web App", "2026"],
    description:
      "Editorial, photo-forward travel guides — authors pin places on an interactive map, attach photos, and publish curated guides to a public link.",
    tech: ["TypeScript", "Next.js", "Supabase", "PostGIS", "MapLibre"],
    liveUrl: "https://ztm-waypoint.vercel.app",
    githubUrl: "https://github.com/JacintoDesign/waypoint",
    screenshot: "/waypoint.jpg",
    alt: "Waypoint — photo-forward travel guide with an interactive map",
  },
  {
    index: "03",
    title: "ZTM Music",
    tags: ["Audio", "Web App", "2026"],
    description:
      "A rebuilt streaming player — queue, library, search and playback against a live music API, lifted to portfolio grade.",
    tech: ["TypeScript", "React", "Next.js"],
    liveUrl: "https://ztm-music.vercel.app",
    githubUrl: "https://github.com/JacintoDesign/ztm-music-player-v2",
    screenshot: "/music.jpg",
    alt: "ZTM Music — streaming player with queue, library and search",
  },
  {
    index: "04",
    title: "Scoundrel",
    tags: ["Game", "PWA", "2025"],
    description:
      "A strategic single-player dungeon card game. Installable, fully offline, built to feel native on any device.",
    tech: ["JavaScript", "PWA", "Service Worker"],
    liveUrl: "https://ztm-scoundrel-game.vercel.app",
    githubUrl: "https://github.com/JacintoDesign/scoundrel-game-pwa",
    screenshot: "/scoundrel.jpg",
    alt: "Scoundrel — single-player dungeon card game interface",
  },
];

export const contact = {
  eyebrow: "Contact",
  heading: "Let's build something.",
  supporting:
    "Have a project, a course idea, or just want to say hello? My inbox is always open.",
  email: "contact@jacinto.design",
  location: "Toronto, Canada",
  form: {
    name: { label: "Name", placeholder: "Your name" },
    email: { label: "Email", placeholder: "your.email@example.com" },
    message: {
      label: "Message",
      placeholder: "Tell me about your project or just say hello...",
    },
    submit: "Send message",
    // Functional microcopy pending CONTENT.md review — flagged 2026-07-24.
    errors: {
      name: "Please enter your name.",
      email: "Please enter a valid email address.",
      message: "Please enter a message.",
      messageLength: "Please keep your message under 5,000 characters.",
    },
    status: {
      sending: "Sending…",
      sent: "Message sent — I'll get back to you soon.",
      failed: "Something went wrong. Please try again or email me directly.",
    },
  },
};

export interface ElsewhereLink {
  label: string;
  handle: string;
  href: string;
}

export const elsewhere: ElsewhereLink[] = [
  { label: "Website", handle: "jacinto.design", href: "https://jacinto.design" },
  {
    label: "LinkedIn",
    handle: "in/jacintowong",
    href: "https://www.linkedin.com/in/jacintowong/",
  },
  {
    label: "GitHub",
    handle: "JacintoDesign",
    href: "https://github.com/JacintoDesign",
  },
  {
    label: "Medium",
    handle: "@jacintowong",
    href: "https://jacintowong.medium.com",
  },
  {
    label: "CodePen",
    handle: "jacintodesign",
    href: "https://codepen.io/jacintodesign",
  },
];

export const skillsBand = [
  "Motion Design",
  "WebGL",
  "Three.js",
  "GSAP",
  "React",
  "Next.js",
  "TypeScript",
  "Creative Development",
];

export const footer = {
  locationEyebrow: "Based in Toronto, Canada",
  wordmark: { first: "Jacinto", second: "Design" },
  elsewhereLabel: "Elsewhere",
  backToTop: "Back to top",
  copyright: "© 2026 Jacinto Design Inc. All rights reserved.",
  builtWith: "Built with Next.js, Three.js & WebGL.",
};

export const site = {
  name: "Jacinto Wong",
  logo: "JD",
  title: "Jacinto Wong — Senior Front-End Developer",
  description:
    "Senior developer and educator building production-grade web interfaces. Selected work, real and deployed.",
  githubUrl: "https://github.com/JacintoDesign",
  navLinks: [
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Contact", href: "#contact" },
  ],
};
