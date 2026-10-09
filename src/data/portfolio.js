/**
 * Single source of truth for all portfolio content.
 * Every section reads from here, so updating a link or project
 * only needs to happen in one place.
 */
import { FaGithub, FaLinkedin, FaEnvelope, FaCode, FaPalette, FaEye, FaShieldAlt, FaGraduationCap, FaSchool } from "react-icons/fa";

export const profile = {
  name: "Abishek V",
  firstName: "Abishek",
  initials: "AV",
  tagline: "Software Developer · AI · Computer Vision",
  roles: ["Software Developer", "Full Stack Developer", "AI & Computer Vision"],
  intro:
    "Computer Science undergraduate building full-stack platforms across frontend, backend, and databases, with a growing focus on computer vision and applied AI.",
  footerBlurb:
    "Software developer building full-stack platforms, with a focus on computer vision and applied AI.",
  email: "abishekvenkatachalam2007@gmail.com",
};

export const socials = [
  { label: "GitHub", handle: "@abishek-vk", href: "https://github.com/abishek-vk", icon: FaGithub },
  { label: "LinkedIn", handle: "@vabishek13", href: "https://www.linkedin.com/in/vabishek13/", icon: FaLinkedin },
  { label: "Email", handle: profile.email, href: `mailto:${profile.email}`, icon: FaEnvelope },
];

export const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export const about = {
  paragraphs: [
    "I'm a Computer Science undergraduate with hands-on experience building full-stack platforms. I work across frontend, backend, and databases, with a growing focus on computer vision and applied AI.",
    "My work spans role-based platforms serving hundreds of concurrent users, real-time emotion detection wired to hardware, and automated machine-learning pipelines. I'm driven by solving complex problems through clean code and continuous learning.",
  ],
  stats: [
    { value: 6, suffix: "+", label: "Projects Completed" },
    { value: 3, suffix: "+", label: "Years Learning" },
    { value: 15, suffix: "+", label: "Tech Skills" },
  ],
  features: [
    { icon: FaCode, title: "Full Stack Development", desc: "Building scalable applications across frontend, backend, and database layers, from REST APIs to normalized schemas." },
    { icon: FaEye, title: "Computer Vision & AI", desc: "Real-time vision with OpenCV and TensorFlow, plus ML automation like custom AutoML pipelines." },
    { icon: FaShieldAlt, title: "Secure Platform Design", desc: "Role-based access control, JWT authentication, and type-safe API contracts for multi-role platforms." },
    { icon: FaPalette, title: "UI/UX Design", desc: "Creating visually stunning, intuitive interfaces with attention to user experience and accessibility." },
  ],
};

/**
 * Skills grouped so the Skills section can filter / highlight by category.
 * `learning: true` marks skills in progress (styled differently).
 */
export const skillGroups = [
  { id: "languages", label: "Languages", skills: ["Python", "Java", "C", "TypeScript"] },
  { id: "tools", label: "Frameworks & Tools", skills: ["React", "Docker", "Git", "REST APIs", "VS Code", "Supabase"] },
  { id: "data", label: "Databases", skills: ["PostgreSQL", "MongoDB"] },
  { id: "practices", label: "Practices", skills: ["Role-Based Access Control", "Testing & Debugging"] },
  { id: "learning", label: "Currently Learning", learning: true, skills: ["OpenCV", "YOLO", "RT-DETR", "Machine Learning"] },
];

/**
 * Projects, shown as case studies.
 *  subtitle  one-line category under the title
 *  metric    optional headline number for the case study
 *  stack     only technologies confirmed by the resume / repo
 *  liveUrl   null hides the Live Demo button
 *  hue       two colors for the generated cover art
 */
export const projects = [
  {
    title: "CodingLabPlatform",
    subtitle: "Full-Stack Coding, Tracking & Assessment Platform",
    githubUrl: "https://github.com/jebarson-caleb/CodingLabPlatform",
    liveUrl: "https://codelab.612151820.xyz/",
    desc: "Full-stack institutional coding and assessment platform with role-based access for students, teachers, coordinators, and admins.",
    metric: { value: "450", label: "concurrent users supported" },
    highlights: [
      "Role-based access control (RBAC) with JWT authentication across four user roles",
      "Zero unauthorized cross-role access incidents in testing",
      "Coding labs, quizzes, and automated assessment management",
      "Real-time notifications and comprehensive analytics",
    ],
    stack: ["JWT"],
    hue: ["#00d9ff", "#3b82f6"],
  },
  {
    title: "Bloodflowhub",
    subtitle: "Blood Bank & Donor Management Platform",
    githubUrl: "https://github.com/geeve-b/Bloodflow-Hub",
    liveUrl: "https://bloodflow-hub.onrender.com/",
    desc: "Comprehensive blood bank and donor management platform for streamlined operations.",
    highlights: [
      "Modular backend services managing donor and inventory records",
      "Normalized MongoDB schema for clean, consistent data",
      "Real-time notification and alert system for emergency blood requests",
      "Efficient donor-patient matching algorithm",
    ],
    stack: ["MongoDB"],
    hue: ["#f43f5e", "#ec4899"],
  },
  {
    title: "AutoML",
    subtitle: "Automated Machine Learning Platform",
    githubUrl: "https://github.com/ReginSamRobinson/AutoML",
    liveUrl: null,
    desc: "A custom AutoML pipeline that automates model selection and evaluation under user-defined hardware resource limits.",
    metric: { value: "90%", label: "less manual model-selection time" },
    highlights: [
      "Automated model selection and evaluation, measured across 2 test datasets",
      "Resource-aware tuning under user-defined hardware limits",
      "Interactive dashboards with leaderboard generation",
      "Automated report generation and insights",
    ],
    stack: ["Python"],
    hue: ["#a855f7", "#6366f1"],
  },
  {
    title: "Mood-Driven Ambient Control",
    subtitle: "Real-Time Emotion-Responsive IoT System",
    githubUrl: "https://github.com/abishek-vk/Mood-Driven-Ambient-Control-System",
    liveUrl: null,
    platform: "webcam → arduino",
    desc: "Reads facial expressions from a webcam and shifts ambient lighting to match the detected mood, in real time.",
    metric: { value: "7", label: "emotions detected in real time" },
    highlights: [
      "OpenCV face detection feeding a TensorFlow emotion classifier",
      "Python-to-Arduino serial communication for live LED control",
      "Maps each detected emotion to a matching ambient lighting state",
    ],
    stack: ["Python", "OpenCV", "TensorFlow", "Arduino"],
    hue: ["#facc15", "#f97316"],
  },
  {
    title: "Nitron Browser",
    subtitle: "Custom Desktop Web Browser",
    githubUrl: "https://github.com/abishek-vk/nitronbrowser",
    liveUrl: null,
    platform: "desktop app",
    desc: "A fully functional multi-tab desktop web browser with a clean, modern interface.",
    highlights: [
      "Multi-tab browsing with smooth back, forward, reload, and home controls",
      "Integrated search straight from the address bar",
      "Bookmarking to save and revisit pages",
      "Dark and light theme support",
    ],
    stack: ["Java", "JavaFX", "MongoDB"],
    hue: ["#10b981", "#14b8a6"],
  },
  {
    title: "Smart Citizen Portal",
    subtitle: "Full-Stack Civic Services Platform",
    githubUrl: "https://github.com/abishek-vk/Smart-Citizen-Portal",
    liveUrl: "https://smart-citizen-portal-citizen-portal.vercel.app/",
    desc: "One platform for civic services: complaints, taxes, certificates, parking, transport, and libraries.",
    highlights: [
      "Six civic service modules in a single platform",
      "Role-based authentication",
      "Type-safe API contracts end to end",
      "Integrated AI assistant for citizen support",
    ],
    stack: ["TypeScript", "PostgreSQL"],
    hue: ["#84cc16", "#22d3ee"],
  },
];

export const timeline = [
  {
    icon: FaSchool,
    title: "High School",
    org: "EKHN Higher Secondary School",
    period: ["2010", "2024"],
    desc: "Developed analytical thinking, communication skills, teamwork, and problem-solving abilities through academics and extracurricular activities.",
  },
  {
    icon: FaGraduationCap,
    title: "B.Tech, Computer Science and Engineering",
    org: "Karunya University",
    period: ["2024", "2028"],
    note: "Expected",
    desc: "Pursuing a degree in Computer Science and Engineering with focus on software development, web technologies, and innovative project development.",
  },
];

export const certifications = [
  { title: "Functions in Python: Introduction", issuer: "Infosys" },
  { title: "Artificial Intelligence Fundamentals", issuer: "IBM" },
];
