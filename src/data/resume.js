export const resume = {
  name: 'Rajneesh Sisodia',
  firstName: 'Rajneesh',
  lastName: 'Sisodia',
  role: 'Full Stack Developer',
  focus: 'Full-stack web development',
  location: {
    city: 'Delhi',
    country: 'India',
    display: 'Delhi, India',
  },
  summary:
    'A junior full-stack developer who builds responsive, polished web applications and is comfortable working across the front end and back end.',
  atAGlance: [
    { label: 'Location', value: 'Delhi, India' },
    { label: 'Education', value: 'BCA · IGNOU · pursuing' },
    { label: 'Focus', value: 'Full-stack web development' },
  ],
  skills: {
    Frontend: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Tailwind', 'Bootstrap', 'React', 'Vue.js'],
    Backend: ['PHP', 'Laravel'],
    Database: ['MongoDB', 'SQL'],
  },
  experience: [
    {
      company: 'Danstring Technologies',
      role: 'Web Design Intern',
      period: 'TODO_danstring_dates',
      bullets: [
        'TODO_danstring_bullet_1',
        'TODO_danstring_bullet_2',
      ],
    },
    {
      company: 'Clixcloud Digital',
      role: 'PHP Developer Intern',
      period: 'TODO_clixcloud_dates',
      bullets: [
        'TODO_clixcloud_bullet_1',
        'TODO_clixcloud_bullet_2',
      ],
    },
  ],
  education: [
    {
      title: 'BCA',
      institution: 'IGNOU',
      detail: 'Pursuing',
    },
  ],
  download: {
    path: '/resume.pdf',
    available: false,
  },
  certificates: [
    {
      title: 'PHP & MySQL Certificate',
      institution: 'DICS',
      year: '2026',
    },
  ],
}

export const skillGroups = [
  { label: 'Frontend', skills: resume.skills.Frontend },
  { label: 'Backend', skills: resume.skills.Backend },
  { label: 'Database', skills: resume.skills.Database },
]
