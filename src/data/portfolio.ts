export const personal = {
  name: 'Jon Masropian',
  title: 'Full Stack Developer',
  tagline: '[SYSTEM_CORRUPTION_DETECTED]',
  location: 'Lawton, OK',
  email: 'jon.masropian@gmail.com',
  phone: '580-699-4002',
  clearance: 'Active Secret Clearance',
  summary: `Disciplined IT and Full Stack Web Development professional with 22 years of U.S. Army service as a Signal/Communications Technician. Combines deep technical expertise in secure network operations, systems support, and cybersecurity compliance with modern web development skills. CompTIA Security+ certified. Mission-first reliability, clear communication, and the ability to thrive under pressure in high-stakes environments.`,
  rotatingTitles: [
    'Full Stack Developer',
    'IT & Network Professional',
    'Cybersecurity Practitioner',
    'U.S. Army Veteran',
    'Signal Corps Technician',
    'UI/UX Designer',
  ],
  metrics: [
    { label: 'Years Army Service', value: '22', suffix: 'YRS' },
    { label: 'Trainees Mentored', value: '2000', suffix: '+' },
    { label: 'Dev Bootcamp Hours', value: '350', suffix: 'HRS' },
    { label: 'Security Clearance', value: 'SECRET', suffix: '' },
  ],
  social: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
  },
};

export const skills: { category: string; items: string[] }[] = [
  {
    category: 'Frontend',
    items: ['HTML5', 'CSS3', 'JavaScript ES6+', 'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Figma'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'RESTful APIs', 'MySQL', 'Git', 'GitHub', 'Agile/Scrum'],
  },
  {
    category: 'Cybersecurity',
    items: ['CompTIA Security+', 'DoD STIG Compliance', 'Risk Assessment', 'Secure Network Practices', 'IAM'],
  },
  {
    category: 'IT & Network',
    items: ['TCP/IP', 'VLANs', 'Subnetting', 'Cisco Devices', 'Active Directory', 'Windows Workstation', 'Tier I/II Help Desk'],
  },
  {
    category: 'Tools',
    items: ['Figma', 'Git', 'GitHub', 'VS Code', 'PowerShell', 'Bash', 'Wireshark'],
  },
];

export const experience = [
  {
    id: 1,
    role: 'IT & Network Support Supervisor / Senior Communications Technician',
    company: 'U.S. Army — 25H Signal Corps',
    period: '2004 – 2026',
    highlights: [
      'Installed, configured, and maintained secure tactical and garrison network systems including routers, switches, and endpoints',
      'Troubleshot network connectivity, hardware failures, and user access issues — minimizing downtime in mission-critical environments',
      'Provided Tier I/II help desk support resolving technical issues across multiple departments and units',
      'Enforced DoD cybersecurity policies, STIG compliance, and secure network procedures',
      'Managed IT equipment accountability, licensing, and lifecycle tracking',
      'Supported field exercises requiring rapid deployment of reliable communications infrastructure',
      'Trained and supervised junior personnel on network operations, troubleshooting, and security best practices',
    ],
  },
  {
    id: 2,
    role: 'Technical Training Lead — Drill Sergeant',
    company: 'U.S. Army',
    period: '2016 – 2019',
    highlights: [
      'Delivered structured training programs and performance evaluations for Army recruits',
      'Trained and mentored over 2,000 trainees — largest-scale leadership role of career',
      'Enforced standards, procedures, and strict accountability across all training phases',
    ],
  },
];

export const projects = [
  {
    id: 1,
    title: 'Warriors Blood Coffee',
    subtitle: 'E-Commerce Platform',
    description: 'Fully custom e-commerce site for a veteran-owned coffee brand, built from the ground up without Shopify or similar platforms. Complete UI/UX design in Figma with brand-consistent visual identity.',
    highlights: [
      'Designed product pages, checkout flow, and landing page in Figma',
      'Integrated Square payment backend with guest checkout for streamlined UX',
      'Managed and exported product image assets using Python/Pillow for grid-based layouts',
      'Collaborated across design and front-end implementation with a multi-person team',
    ],
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Figma', 'Square API', 'Node.js', 'Python'],
    status: 'In Progress',
    year: '2024–Present',
    type: 'Client Project',
    github: null,
    demo: null,
  },
  {
    id: 2,
    title: 'Developer Portfolio',
    subtitle: 'This Website',
    description: 'Cyberpunk-themed personal portfolio built with Next.js, Three.js, and Framer Motion. Features a 3D animated hero, interactive terminal, boot sequence, and cinematic section reveals.',
    highlights: [
      'Three.js animated 3D background with mouse parallax',
      'Interactive terminal emulator in the Cyber Lab section',
      'Framer Motion scroll-triggered section animations',
      'Fully responsive cyberpunk UI with glitch effects',
    ],
    stack: ['Next.js', 'TypeScript', 'Three.js', 'Framer Motion', 'Tailwind CSS', 'GSAP'],
    status: 'Live',
    year: '2025',
    type: 'Personal Project',
    github: null,
    demo: null,
  },
];

export const certifications = [
  {
    id: 1,
    name: 'CompTIA Security+',
    issuer: 'CompTIA',
    code: 'SY0-701',
    status: 'Active',
    year: '2024',
    description: 'Industry-standard cybersecurity certification covering threat detection, risk management, and secure infrastructure.',
  },
  {
    id: 2,
    name: 'Full Stack Software Development',
    issuer: 'Era Academy',
    code: 'Oklahoma City, OK',
    status: 'Completed',
    year: '2024',
    description: '350+ hour immersive bootcamp covering HTML5, CSS3, JavaScript ES6+, React, MySQL, RESTful APIs, and Agile/Scrum.',
  },
  {
    id: 3,
    name: 'JavaScript Professional Developer',
    issuer: 'COITB',
    code: 'In Progress',
    status: 'In Progress',
    year: '2025',
    description: 'Professional JavaScript developer certification covering advanced ES6+, async patterns, and modern tooling.',
  },
  {
    id: 4,
    name: "Bachelor's — IT / Cybersecurity",
    issuer: 'Central Texas College',
    code: 'In Progress',
    status: 'In Progress',
    year: '2025',
    description: 'Coursework toward a Bachelor\'s degree in Information Technology with a Cybersecurity concentration.',
  },
];

export const militaryTimeline = [
  { year: '2004', event: 'Enlisted — U.S. Army Signal Corps (25H)', detail: 'Began 22-year career in military IT and communications' },
  { year: '2004', event: 'Advanced Individual Training (AIT)', detail: '25H Information Technology Specialist — hands-on network operations and secure comms' },
  { year: '2016', event: 'Selected as Drill Sergeant', detail: 'Achieved one of the most demanding leadership roles in the Army' },
  { year: '2016–2019', event: 'Trained 2,000+ Recruits', detail: 'Technical Training Lead responsible for evaluation, mentorship, and standards enforcement' },
  { year: '2024', event: 'Era Academy — Full Stack Dev Bootcamp', detail: '350+ hours of project-based web development training while still serving' },
  { year: '2024', event: 'Warriors Blood Coffee — Client Launch', detail: 'First professional web development client project' },
  { year: '2026', event: 'Honorably Retired — 22 Years', detail: 'Transitioned full-time into web development and IT industry' },
];

export const terminalCommands: Record<string, string> = {
  help: `Available commands:
  whoami       — identity summary
  skills       — technical skill set
  clearance    — security status
  mission      — current objectives
  contact      — get in touch
  clear        — clear terminal`,
  whoami: `> Jon Masropian
> Role: Full Stack Developer | IT Professional | Army Veteran
> Clearance: Active Secret
> Location: Lawton, OK
> Status: [AVAILABLE FOR HIRE]`,
  skills: `> Frontend:  React, Next.js, TypeScript, Tailwind, Figma
> Backend:   Node.js, MySQL, RESTful APIs
> Security:  CompTIA Security+, DoD STIG, IAM
> Network:   TCP/IP, VLANs, Cisco, Active Directory
> Tools:     Git, GitHub, VS Code, PowerShell`,
  clearance: `> CLEARANCE LEVEL: SECRET
> STATUS: ACTIVE
> ISSUING AUTHORITY: U.S. Department of Defense
> VERIFICATION: On file`,
  mission: `> [CURRENT OBJECTIVES]
> ✓ CompTIA Security+ — COMPLETE
> ✓ Full Stack Dev Bootcamp — COMPLETE
> ⟳ COITB JS Developer Cert — IN PROGRESS
> ⟳ Bachelor's IT/Cybersecurity — IN PROGRESS
> ⟳ Land first dev/IT role — ACTIVE`,
  contact: `> Email:    jon.masropian@gmail.com
> Phone:    580-699-4002
> LinkedIn: /in/jon-masropian
> GitHub:   github.com/jonmasropian`,
};

export const threatFeed = [
  { time: '00:01', type: 'INFO', message: 'System initialized. All nodes online.' },
  { time: '00:03', type: 'WARN', message: 'Anomalous traffic detected on port 443' },
  { time: '00:05', type: 'INFO', message: 'Firewall rules updated. 247 IPs blocked.' },
  { time: '00:08', type: 'ALERT', message: 'Brute-force attempt detected — IP: 185.220.101.x' },
  { time: '00:09', type: 'INFO', message: 'Threat neutralized. Countermeasures deployed.' },
  { time: '00:12', type: 'INFO', message: 'SSL certificates verified. Encryption active.' },
  { time: '00:15', type: 'WARN', message: 'Suspicious login from unknown geolocation' },
  { time: '00:16', type: 'ALERT', message: 'MFA challenge triggered. User verified.' },
  { time: '00:20', type: 'INFO', message: 'Network scan complete. No vulnerabilities found.' },
  { time: '00:23', type: 'WARN', message: 'STIG compliance check initiated...' },
  { time: '00:25', type: 'INFO', message: 'All systems nominal. Defense posture: ACTIVE.' },
];
