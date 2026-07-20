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

export const hero = {
  eyebrow: "Jacinto Wong · Senior Developer",
  headline: "Interfaces that feel built, not bought.",
  subhead:
    "Senior developer with 8+ years shipping production front-ends — and 5+ years teaching other developers to do the same.",
  ctas: [
    { label: "See the work", href: "#work" },
    { label: "Get in touch", href: "#contact" },
  ],
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
      title: "Teaching",
      body: "With 5 years of teaching experience in Canada and South Korea, I now combine my technical skills and educational background as an instructor for Zero to Mastery Academy.",
    },
    {
      index: "03",
      title: "The leap",
      body: "As a self-taught developer who landed a Senior Developer role after just 4 months of online learning, I understand the challenges of breaking into tech.",
    },
    {
      index: "04",
      title: "The mission",
      body: "I'm dedicated to creating high-quality, affordable courses that help students build real portfolio projects and confidently transition into web development careers.",
    },
    {
      index: "05",
      title: "The goal",
      body: "My goal is to make quality education accessible to everyone, regardless of their background or budget.",
    },
  ],
  nowPanel: {
    label: "Currently building",
    title: "Agentic Engineering course",
    blurb:
      "A new course on building production-grade AI agents — in progress at Zero to Mastery.",
  },
};

export const projectsSection = {
  eyebrow: "Selected work",
  heading: "Four projects, real and deployed.",
};

export const projects: Project[] = [
  {
    index: "01",
    title: "VibeMail Glass",
    tags: ["Full-Stack", "App", "2026"],
    description:
      "A full-stack email client in a frosted-glass, fully monospaced interface — virtualised threads, instant search, Supabase backend.",
    tech: ["TypeScript", "Next.js", "Supabase", "PostgreSQL"],
    liveUrl: "https://vibemail-fullstack.vercel.app/demo",
    githubUrl: "https://github.com/JacintoDesign/vibemail-fullstack",
    screenshot: "/vibemail.jpg",
    alt: "VibeMail Glass — frosted-glass, monospaced email client interface",
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
    title: "Music Player 2.0",
    tags: ["Audio", "Web App", "2026"],
    description:
      "A rebuilt streaming player — queue, library, search and playback against a live music API, lifted to portfolio grade.",
    tech: ["TypeScript", "React", "Next.js"],
    liveUrl: "https://ztm-music.vercel.app",
    githubUrl: "https://github.com/JacintoDesign/ztm-music-player-v2",
    screenshot: "/music.jpg",
    alt: "Music Player 2.0 — streaming player with queue, library and search",
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
  heading: "Get in touch.",
  supporting: "Or email me directly at",
  email: "contact@jacinto.design",
};

export const site = {
  name: "Jacinto Wong",
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
