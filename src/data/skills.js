export const SKILLS = [
  // LANGUAGES
  { name: 'C++',            icon: '◆', cat: 'lang',     level: 90 },
  { name: 'C',              icon: '◇', cat: 'lang',     level: 80 },
  { name: 'JavaScript',     icon: 'JS', cat: 'lang',    level: 88 },
  { name: 'TypeScript',     icon: 'TS', cat: 'lang',    level: 75 },
  { name: 'Python',         icon: 'Py', cat: 'lang',    level: 72 },
  { name: 'Java',           icon: '☕', cat: 'lang',     level: 65 },
  // FRONTEND
  { name: 'React.js',       icon: '⚛', cat: 'frontend', level: 85 },
  { name: 'Next.js',        icon: '▲',  cat: 'frontend', level: 70 },
  { name: 'HTML5',          icon: '◈', cat: 'frontend', level: 92 },
  { name: 'CSS3',           icon: '◉', cat: 'frontend', level: 88 },
  { name: 'Tailwind',       icon: '◎', cat: 'frontend', level: 84 },
  // BACKEND
  { name: 'Node.js',        icon: '▣', cat: 'backend',  level: 83 },
  { name: 'Express.js',     icon: '→', cat: 'backend',  level: 82 },
  { name: 'REST APIs',      icon: '⇋', cat: 'backend',  level: 85 },
  { name: 'Auth/JWT',       icon: '⊘', cat: 'backend',  level: 78 },
  // DATABASES
  { name: 'MongoDB',        icon: '◐', cat: 'db',       level: 80 },
  { name: 'MySQL',          icon: '⊞', cat: 'db',       level: 75 },
  { name: 'PostgreSQL',     icon: '⊟', cat: 'db',       level: 72 },
  { name: 'Redis',          icon: '◉', cat: 'db',       level: 65 },
  // TOOLS
  { name: 'Git',            icon: '⑂', cat: 'tools',    level: 88 },
  { name: 'GitHub',         icon: '⊚', cat: 'tools',    level: 87 },
  { name: 'Docker',         icon: '⊡', cat: 'tools',    level: 60 },
  { name: 'Postman',        icon: '⊿', cat: 'tools',    level: 82 },
  { name: 'VS Code',        icon: '⋄', cat: 'tools',    level: 90 },
  // DSA
  { name: 'Arrays/Strings', icon: '▧', cat: 'dsa',      level: 92 },
  { name: 'DP',             icon: '◫', cat: 'dsa',      level: 82 },
  { name: 'Trees/Graphs',   icon: '⊛', cat: 'dsa',      level: 85 },
  { name: 'Recursion',      icon: '∞', cat: 'dsa',      level: 88 },
  { name: 'Sliding Window', icon: '⊞', cat: 'dsa',      level: 85 },
  { name: 'BullMQ/Queue',   icon: '⇶', cat: 'dsa',      level: 68 },
];

export const RADAR_DATA = {
  labels: ['DSA', 'Frontend', 'Backend', 'Databases', 'Tools', 'Languages'],
  data:   [90,    87,         83,        77,          85,      83],
};

export const EXPLORING = [
  'Next.js (advanced)',
  'System Design',
  'Redis advanced',
  'AWS basics',
  'TypeScript deep-dive',
];

export const SKILL_CATEGORIES = [
  { key: 'all',      label: 'All' },
  { key: 'lang',     label: 'Languages' },
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend',  label: 'Backend' },
  { key: 'db',       label: 'Databases' },
  { key: 'tools',    label: 'Tools' },
  { key: 'dsa',      label: 'DSA' },
];
