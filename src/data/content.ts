export const siteConfig = {
  name: 'TalentSync',
  description: 'Connecting Top Talent with Innovative Companies',
  tagline: 'Your partner in building exceptional tech teams',
  url: 'https://talentsync.eu',
  calendlyUrl: 'https://calendly.com/talentsync-meeting/30min',
  email: 'hello@talentsync.eu',
}

export const navigation = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'Team', href: '#team' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Careers', href: '#careers' },
  { label: 'Contact', href: '#contact' },
]

export const services = [
  {
    icon: 'HiOutlineUserGroup',
    title: 'Talent Acquisition',
    description: 'End-to-end recruitment solutions for tech and AI roles. We find the perfect match for your team.',
  },
  {
    icon: 'HiOutlineLightBulb',
    title: 'AI & Tech Specialists',
    description: 'Access top-tier AI engineers, data scientists, and software developers from our curated network.',
  },
  {
    icon: 'HiOutlineCog',
    title: 'Technical Screening',
    description: 'Rigorous technical assessments ensure candidates meet your exact requirements.',
  },
  {
    icon: 'HiOutlineChartBar',
    title: 'Market Insights',
    description: 'Data-driven salary benchmarks and hiring trends to help you stay competitive.',
  },
  {
    icon: 'HiOutlineGlobe',
    title: 'Global Reach',
    description: 'Tap into international talent pools while we handle compliance and onboarding.',
  },
  {
    icon: 'HiOutlineShieldCheck',
    title: 'Retention Support',
    description: 'Post-placement support and check-ins to ensure long-term success.',
  },
]

export const process = [
  {
    step: 1,
    title: 'Discovery',
    description: 'We learn about your company culture, technical requirements, and growth goals.',
  },
  {
    step: 2,
    title: 'Matching',
    description: 'Our AI-powered system identifies candidates that fit your unique needs.',
  },
  {
    step: 3,
    title: 'Interview',
    description: 'We coordinate technical interviews and provide detailed candidate assessments.',
  },
  {
    step: 4,
    title: 'Placement',
    description: 'Seamless onboarding support and 90-day guarantee on all placements.',
  },
]

export const caseStudies = [
  {
    company: 'FinTech Startup',
    industry: 'Financial Technology',
    image: '/images/case-fintech.jpg',
    results: ['15 engineers hired in 3 months', '95% retention after 1 year', '40% faster than in-house recruiting'],
  },
  {
    company: 'AI Research Lab',
    industry: 'Artificial Intelligence',
    image: '/images/case-ai.jpg',
    results: ['Built 8-person ML team from scratch', 'Senior talent from top tech companies', 'First hire within 2 weeks'],
  },
  {
    company: 'Scale-up SaaS',
    industry: 'Enterprise Software',
    image: '/images/case-saas.jpg',
    results: ['Expanded engineering 3x in 6 months', 'Hired across 4 countries', 'Zero failed probations'],
  },
  {
    company: 'HealthTech Pioneer',
    industry: 'Healthcare Technology',
    image: '/images/case-health.jpg',
    results: ['Specialized compliance-aware hiring', 'HIPAA-trained engineers', 'Ongoing talent pipeline'],
  },
]

export const team = [
  {
    name: 'Alex Morgan',
    role: 'Founder & CEO',
    image: '/images/team-alex.jpg',
  },
  {
    name: 'Sarah Chen',
    role: 'Head of Recruitment',
    image: '/images/team-sarah.jpg',
  },
  {
    name: 'Marcus Johnson',
    role: 'Technical Lead',
    image: '/images/team-marcus.jpg',
  },
  {
    name: 'Elena Kowalski',
    role: 'Client Success Manager',
    image: '/images/team-elena.jpg',
  },
]

export const testimonials = [
  {
    quote: 'TalentSync transformed our hiring process. We went from struggling to find qualified candidates to having a pipeline of exceptional talent.',
    author: 'James Wilson',
    title: 'CTO, TechVentures',
    avatar: '/images/testimonial-james.jpg',
  },
  {
    quote: 'The quality of candidates and speed of delivery exceeded our expectations. They truly understand the tech landscape.',
    author: 'Maria Santos',
    title: 'VP Engineering, DataFlow',
    avatar: '/images/testimonial-maria.jpg',
  },
  {
    quote: 'Working with TalentSync felt like having an extension of our own team. They got our culture from day one.',
    author: 'David Park',
    title: 'Founder, AIStart',
    avatar: '/images/testimonial-david.jpg',
  },
]

export const pricing = [
  {
    tier: 'Starter',
    price: '18%',
    unit: 'of annual salary',
    description: 'Perfect for occasional hiring needs',
    features: [
      'Access to candidate network',
      'Basic technical screening',
      'Standard support',
      '60-day replacement guarantee',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    tier: 'Growth',
    price: '22%',
    unit: 'of annual salary',
    description: 'Best for scaling teams',
    features: [
      'Everything in Starter',
      'Priority candidate access',
      'Advanced technical assessments',
      'Dedicated account manager',
      '90-day replacement guarantee',
    ],
    cta: 'Get Started',
    highlighted: true,
  },
  {
    tier: 'Enterprise',
    price: 'Custom',
    unit: 'pricing',
    description: 'For large-scale hiring initiatives',
    features: [
      'Everything in Growth',
      'Volume discounts',
      'Embedded recruitment support',
      'Custom SLAs',
      'Quarterly business reviews',
      '120-day replacement guarantee',
    ],
    cta: 'Contact Us',
    highlighted: false,
  },
]

export const faq = [
  {
    question: 'How does your recruitment process work?',
    answer: 'We start with a discovery call to understand your needs, then leverage our AI-powered matching system to identify candidates. We handle technical screening, coordinate interviews, and support you through to successful placement.',
  },
  {
    question: 'What industries do you specialize in?',
    answer: 'We specialize in technology companies across fintech, AI/ML, SaaS, healthtech, and enterprise software. Our network includes engineers, data scientists, product managers, and technical leaders.',
  },
  {
    question: 'What is your success rate?',
    answer: 'We maintain a 95% placement success rate with over 90% of candidates staying beyond their first year. Our rigorous screening process ensures quality matches.',
  },
  {
    question: 'How quickly can you fill a position?',
    answer: 'Most positions are filled within 3-4 weeks. For urgent needs, we offer expedited search services that can deliver qualified candidates within 1-2 weeks.',
  },
  {
    question: 'Do you offer replacement guarantees?',
    answer: 'Yes, all placements come with a replacement guarantee ranging from 60-120 days depending on your plan. If a hire doesn\'t work out, we\'ll find a replacement at no additional cost.',
  },
  {
    question: 'Can you help with remote and international hiring?',
    answer: 'Absolutely. We have experience placing talent across multiple countries and can advise on compliance, contracts, and onboarding for distributed teams.',
  },
]

export const careers = [
  {
    title: 'Senior Technical Recruiter',
    location: 'Remote',
    type: 'Full-time',
    description: 'Join our team to help connect exceptional talent with innovative companies.',
  },
  {
    title: 'Business Development Manager',
    location: 'London / Remote',
    type: 'Full-time',
    description: 'Drive growth by building relationships with tech companies across Europe.',
  },
]
