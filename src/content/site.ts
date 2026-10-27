// Single source for the facts the page prints. Keep claims here in sync with PRODUCT.md.

export const contact = {
  phoneDisplay: '+94 70 303 7037',
  phoneHref: 'tel:+94703037037',
  email: 'zeuspower@iial.lk',
  emailHref: 'mailto:zeuspower@iial.lk',
  address: ['655/1, Gunathilaka Gardens', 'Elvitigala Mawatha', 'Colombo 05, Sri Lanka'],
  mapsHref:
    'https://www.google.com/maps/search/?api=1&query=655%2F1+Gunathilaka+Gardens+Elvitigala+Mawatha+Colombo+05+Sri+Lanka',
  officeHours: 'Mon – Sat, 08:00 – 18:00',
  emergencyHours: '24 hours, 7 days',
  avgResponse: '30 min',
};

export const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
];

export const facts = [
  { value: '500+', label: 'Projects completed' },
  { value: '15+', label: 'Years of experience' },
  { value: '50+', label: 'Technicians' },
  { value: '30 min', label: 'Average emergency response' },
  { value: 'ISO 9001', label: 'Quality system, parent company (2004)' },
  { value: 'EM 4', label: 'CIDA grading, parent company' },
];

export const industries = [
  'Apparel manufacturing',
  'Confectionery manufacturing',
  'FMCG industries',
  'Pharmaceutical manufacturing',
  'Food and beverages',
  'Commercial buildings',
];

export type Service = {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  short: string;
  description: string;
  details: { term?: string; text: string }[];
};

export const services: Service[] = [
  {
    id: 'service-electrical',
    code: 'B.1',
    title: 'Electrical systems',
    subtitle: 'Power & infrastructure',
    short: 'Breakdowns, thermography, analysis',
    description:
      'Comprehensive electrical infrastructure support and emergency response services to minimize manufacturing downtime and ensure continuous operations.',
    details: [
      { term: 'Emergency breakdown services', text: 'Provide technical support to minimize down-time in production and minimize blackout time.' },
      { term: 'Infrared thermography', text: 'With the use of specialized thermal imaging equipment, electrical systems can be inspected while under load and energized.' },
      { term: 'Electrical preventive maintenance', text: 'Regular inspection and service of equipment to detect potential problems.' },
      { term: 'Electrical system analysis', text: 'Inspect and gather data of the electrical system with correct analyzing equipment.' },
    ],
  },
  {
    id: 'service-fire',
    code: 'B.2',
    title: 'Fire protection',
    subtitle: 'Safety & detection',
    short: 'Inspection and maintenance',
    description:
      'Professional fire protection and detection system maintenance to ensure optimal functionality and comprehensive safety coverage.',
    details: [
      { text: 'Regular maintenance and inspection of fire protection systems' },
      { text: 'System cleaning, adjustment and lubrication' },
      { text: 'Wear parts replacement and defect elimination' },
      { text: 'System evaluation and risk assessment' },
      { text: 'Professional recommendations for system improvements' },
    ],
  },
  {
    id: 'service-ac',
    code: 'B.3',
    title: 'Air conditioning',
    subtitle: 'Climate control',
    short: 'Breakdown and annual programs',
    description:
      'Comprehensive air conditioning services including breakdown support, preventive maintenance, and optimization for maximum efficiency.',
    details: [
      { text: 'Emergency breakdown services for thermal comfort environment' },
      { text: 'Preventive maintenance services' },
      { text: 'Annual maintenance programs' },
      { text: 'System optimization and efficiency improvements' },
      { text: 'Professional technical support and advice' },
    ],
  },
  {
    id: 'service-solar',
    code: 'B.4',
    title: 'Solar services',
    subtitle: 'Renewable energy',
    short: 'Installation and servicing',
    description:
      'Reliable, sustainable, and efficient solar energy solutions. Zeus Power International has successfully commenced its Solar Services Division, committed to supporting clients in embracing clean energy.',
    details: [
      { text: 'Solar panel installation and commissioning' },
      { text: 'Solar system maintenance and servicing' },
      { text: 'Energy efficiency assessments and optimization' },
      { text: 'Grid-tied and off-grid solar solutions' },
      { text: 'Professional consultation for residential and commercial solar projects' },
    ],
  },
];

export type Photo = { src: string; alt: string; category: string; width: number; height: number };

export const photos: Photo[] = [
  { src: '/images/service7.webp', alt: 'Hose reel maintenance', category: 'Fire protection', width: 2048, height: 1463 },
  { src: '/images/service4.webp', alt: 'Thermal scan of a control panel', category: 'Electrical', width: 2048, height: 1463 },
  { src: '/images/service5.webp', alt: 'Fire pump room inspection', category: 'Fire protection', width: 2048, height: 1463 },
  { src: '/images/service9.webp', alt: 'Field testing at a cable pit', category: 'Electrical', width: 2048, height: 1365 },
  { src: '/images/service6.webp', alt: 'Fire hydrant cabinet check', category: 'Fire protection', width: 2048, height: 1463 },
  { src: '/images/service8.webp', alt: 'Extinguisher and hose reel inspection', category: 'Fire protection', width: 2048, height: 1463 },
  { src: '/images/service1.webp', alt: 'Thermal imaging of an LV switchboard', category: 'Electrical', width: 2048, height: 1463 },
  { src: '/images/service2.webp', alt: 'Breaker maintenance on a switchboard', category: 'Electrical', width: 2048, height: 1463 },
  { src: '/images/service3.webp', alt: 'Switchboard inspection', category: 'Electrical', width: 2048, height: 1463 },
  { src: '/images/service10.webp', alt: 'Crew briefing at a switchboard', category: 'Electrical', width: 2048, height: 1463 },
  { src: '/images/service11.webp', alt: 'Overhead work in a commercial building', category: 'Site work', width: 1463, height: 2048 },
];

export const timeline = [
  {
    year: '1992',
    entity: 'IIAL',
    title: 'Company foundation',
    text: 'Illukkumbura Industrial Automation (Pvt) Ltd is incorporated to design and execute projects in electrical engineering, fire engineering and related services.',
  },
  {
    year: '2004',
    entity: 'IIAL',
    title: 'Quality certification',
    text: 'IIAL is certified to ISO 9001:2000 and achieves an EM 4 grade in the CIDA ranking.',
  },
  {
    year: '2010',
    entity: 'IIAL',
    title: 'Service expansion',
    text: 'IIAL management recognises the need for a dedicated team for emergency breakdown and preventive maintenance services.',
  },
  {
    year: '2012',
    entity: 'IIAL',
    title: 'International service',
    text: 'First overseas preventive maintenance service, for a customer based in Bangladesh.',
  },
  {
    year: '2015',
    entity: 'S.W.A.T.',
    title: 'Dedicated team formed',
    text: 'S.W.A.T. (Special Works And Technology) is formed within IIAL to attend to emergency breakdowns and preventive maintenance.',
  },
  {
    year: '2019',
    entity: 'ZPI',
    title: 'Zeus Power International established',
    text: 'Zeus Power International (Pvt) Ltd is formed to provide dedicated emergency breakdown and preventive maintenance services.',
  },
];

export const leaders = [
  { name: 'Udara Illukkumbura', honorific: 'Mr.', role: 'Director', image: '/images/leader-1.webp' },
  { name: 'Lahiru Perera', honorific: 'Mr.', role: 'Director', image: '/images/leader-2.webp' },
  { name: 'Upul Eranga', honorific: 'Mr.', role: 'Project Engineer', image: '/images/leader-3.webp' },
  { name: 'Uresha Dissanayaka', honorific: 'Mrs.', role: 'Engineer, Electrical Projects & Services', image: '/images/leader-4.webp' },
];

export const companies = [
  {
    name: 'Illukkumbura Industrial Automation (Pvt) Ltd',
    relationship: 'Parent company',
    logo: '/images/placeholder-illukkumbura.webp',
    logoWidth: 512,
    logoHeight: 89,
    description: 'Specializing in industrial automation and control systems.',
    services: ['Industrial automation', 'Control systems', 'Process optimization'],
  },
  {
    name: 'Bianco Electrical (Pvt) Ltd',
    relationship: 'Group company',
    logo: '/images/placeholder-bianco.webp',
    logoWidth: 600,
    logoHeight: 329,
    description: 'Leading provider of electrical solutions and maintenance.',
    services: ['Electrical solutions', 'Maintenance services', 'Power systems'],
  },
  {
    name: 'Ceylektra Power Solutions',
    relationship: 'Group company',
    logo: '/images/ceylektra-logo.webp',
    logoWidth: 1200,
    logoHeight: 238,
    description: 'Innovative power solutions and energy management.',
    services: ['Power solutions', 'Energy management', 'Grid systems'],
  },
];
