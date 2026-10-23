const unsplash = (id, w) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const rl = path => `https://robinsonsland.com/${path}`;

/* Main navigation, mirroring the robinsonsland.com menu. Each entry opens a mega menu panel:
   intro + overview link, grouped link columns, and an optional feature card. */
export const MENU = [
  {
    id: 'about', label: 'About',
    intro: '46 years of malls, homes, offices, hotels and logistics hubs across the Philippines.',
    overview: ['About Robinsons Land', '#about'],
    groups: [
      { title: 'Company', links: [['Company Profile', '#/about/company-profile'], ['Principles, Mission and Vision', '#/about/principles'], ['Board of Directors & Officers', '#/about/board'], ['Corporate Structure', rl('corporate-structure')], ['Organizational Chart', rl('organizationalchart')]] },
      { title: 'Articles and awards', links: [['Articles of Incorporation', rl('articles-of-incorporation')], ['Awards', rl('awards')]] },
      { title: 'Blog', links: [['Our Stories', '#/stories']] },
    ],
    feature: { type: 'story' },
  },
  {
    id: 'units', label: 'Business Units',
    intro: 'Seven divisions shaping how Filipinos live, work and play.',
    overview: ['See all business units', '#units'],
    groups: [
      { title: 'Business units', wide: true, links: [['Commercial Centers Division', rl('commercial-centers-division')], ['Hotels and Resorts Division', rl('hotels-and-resorts-division')], ['Office Buildings Division', rl('office-buildings-division')], ['Residential Buildings Division', rl('residential-buildings-division')], ['Robinsons Destination Estates', rl('robinsons-destination-estates')], ['Robinsons Logistix and Industrials Inc.', rl('RLX')], ['Robinsons Sports and Leisure', rl('RSL')]] },
    ],
  },
  {
    id: 'investors', label: 'Investor Relations',
    intro: 'Reports, share information and the events calendar for RLC shareholders.',
    overview: ['Investor Relations overview', '#investors'],
    groups: [
      { title: 'About', links: [['Investor Relations Program', rl('investor-relations')], ['Share Information', rl('share-information')], ['Shareholding Structure', rl('shareholding-structure')]] },
      { title: 'Reports', links: [['Annual Reports', rl('annual-reports')], ['Financials', rl('financials')], ['Presentations', rl('ir-presentations')]] },
      { title: 'Events', links: [['Schedules', rl('schedules')]] },
    ],
    feature: { kicker: 'Annual Report 2024', title: 'Built on transparent growth.', cta: 'Read the report', href: rl('sites/default/files/2025-05/%5BRLC%202024%20ASR%5D%20Compressed.pdf') },
  },
  {
    id: 'sustainability', label: 'Sustainability',
    intro: 'Our commitments to climate action, communities and shared prosperity.',
    overview: ['Our sustainability approach', '#sustainability'],
    groups: [
      { title: 'Sustainability', links: [['About Sustainability', rl('sustainability')]] },
      { title: 'Programs', links: [['RLove', rl('rlfi-redirect')], ['The Gift of Change', rl('gift-of-change')]] },
    ],
    feature: { kicker: 'Robinsons Land Foundation', title: 'Disaster response, education and community care through RLove.', cta: 'Visit the foundation', href: rl('rlfi-redirect') },
  },
  {
    id: 'governance', label: 'Governance',
    intro: 'The policies, committees and controls that guide how we operate.',
    overview: ['Corporate governance', rl('governance-manual')],
    groups: [
      { title: 'Governance', wide: true, links: [['Corporate Governance Manual', rl('governance-manual')], ['Company Policies', rl('company-policies')], ['Code of Business Conduct', rl('business-conduct-and-ethics')], ['Compliance', rl('compliance')], ['Integrated Annual Corporate Governance Reports', rl('governance-reports')], ['Board Committees', rl('board-committees')], ['Enterprise Risk Management', rl('enterprise-risk-management')], ['Capital and Debt Structure Management', rl('capital-debt-structure-management')]] },
    ],
  },
  {
    id: 'disclosures', label: 'Disclosures',
    intro: 'SEC and PSE filings, stockholder meetings and other company disclosures.',
    overview: ['All disclosures', rl('other-disclosures')],
    groups: [
      { title: 'SEC and PSE filings', links: [['SEC 17-A Reports (Annual Report)', rl('sec-17-a-reports')], ['SEC 17-Q Reports (Quarterly Report)', rl('sec-17-q-reports')], ['SEC 17-C Reports (Current Report)', rl('sec-17-c-reports')], ['Form 20 IS (Information Sheet)', rl('form-20-is')], ['Form 23 A/B (Statement of Beneficial Ownership)', rl('form-23-ab')], ['General Information Sheet (GIS)', rl('general-information-sheet')]] },
      { title: 'Meetings', links: [['Notice of Stockholders Meeting', rl('notice-of-stockholders-meeting')], ['Minutes of Stockholders Meeting', rl('minutes-of-stockholders-meeting')]] },
      { title: 'Others', links: [['Disclosures', rl('other-disclosures')]] },
    ],
  },
];

export const ABOUT = {
  eyebrow: 'About Robinsons Land Corporation',
  title: ['Building better', 'for 46 years.'],
  lead: ', the real estate arm of JG Summit, is one of the leading real estate developers in the Philippines with 46 years of proven track record.',
  paras: [
    'The RLC portfolio includes malls, prime office buildings, flexible workspaces, multi-branded hotels and resorts, industrial and logistics facilities, residential condominiums and subdivisions.',
    'Furthermore, it has 20 mixed-use developments, including three landmark Destination Estates that espouse the Live-Work-Play-Inspire lifestyle.',
    "Each project of RLC has led to the rise of thriving, harmonious communities, in line with JG Summit's vision to make life better for the Filipino nation.",
  ],
  link: 'https://robinsonsland.com/company-profile',
};

export const UNITS = [
  {
    cursor: 'Malls', pill: 'Commercial Centres', name: 'Robinsons Malls',
    logo: 'assets/logo-malls.png', logoAlt: 'Robinsons Malls logo',
    img: unsplash('photo-1555529669-e69e7aa0ba9a', 1200), imgAlt: 'Bright shopping mall interior',
    text: "We develop, lease and manage lifestyle centres across the Philippines. One of the country's largest mall chains, built on accessibility, comfort, safety and fun.",
  },
  {
    cursor: 'Estates', pill: 'Mixed-use', name: 'Destination Estates',
    logo: 'assets/logo-estates.png', logoAlt: 'Robinsons Destination Estates logo',
    img: unsplash('photo-1449824913935-59a10b8d2000', 1200), imgAlt: 'Aerial view of a planned city district',
    text: 'Master-planned communities that bring homes, offices, malls, logistics and institutional spaces into one live-work-play-inspire setting.',
  },
  {
    cursor: 'Homes', pill: 'Residential', name: 'Robinsons Residences',
    logo: 'assets/logo-residences.png', logoAlt: 'RLC Residences logo',
    img: unsplash('photo-1460317442991-0ec209397118', 1200), imgAlt: 'Residential condominium towers',
    text: 'Residential, leisure and retirement projects for the middle and upscale market, in central districts and destination estates.',
  },
  {
    cursor: 'Offices', pill: 'Office Buildings', name: 'Robinsons Offices',
    logo: 'assets/logo-offices.png', logoAlt: 'Robinsons Offices logo',
    img: unsplash('photo-1497366216548-37526070297c', 1200), imgAlt: 'Open-plan office with natural light',
    text: "The country's largest office landlord. Prime locations, large floor plates and high-speed connectivity, plus work.able flexible workspaces.",
  },
  {
    cursor: 'Hotels', pill: 'Hospitality', name: 'Robinsons Hotels and Resorts',
    logo: 'assets/logo-hotels.png', logoAlt: 'Robinsons Hotels and Resorts logo',
    img: unsplash('photo-1566073771259-6a8506099945', 1200), imgAlt: 'Resort pool at a hotel',
    text: "Crowne Plaza and Holiday Inn Galleria, Dusit Thani Mactan Cebu, Summit, Go Hotels and FILI. Our aim: the country's biggest hotel group.",
  },
  {
    cursor: 'Logistix', pill: 'Industrial', name: 'Robinsons Logistix and Industrials',
    logo: 'assets/logo-rlx.png', logoAlt: 'RLX Robinsons Logistix and Industrials logo',
    img: unsplash('photo-1586528116311-ad8dd3c8310d', 1200), imgAlt: 'Modern warehouse interior with racks',
    text: 'Distribution and fulfilment centres, cold storage, multi-storey warehouses and data centres for multinationals, manufacturers and e-commerce.',
  },
];

export const ESTATES = [
  { name: 'Bridgetowne', loc: 'Quezon City and Pasig City', region: '30.6 hectares', img: unsplash('photo-1545324418-cc1a3fa10c00', 700) },
  { name: 'Sierra Valley', loc: 'Taytay and Cainta, Rizal', region: '18 hectares', img: unsplash('photo-1600585154340-be6161a56a0c', 700) },
];

export const SUSTAIN = {
  pillars: ['Responsible growth', 'Reaching underserved markets', 'Reshaping communities'],
  focus: ['Disaster response', 'Community development', 'Health', 'Nutrition', 'Child welfare', 'Education'],
  gift: ['The Gift of Sight', 'The Gift of HeART', 'Bike for Change', 'Relief operations', 'Pailaw sa Barangay'],
  reports: [
    ['2023', 'https://robinsonsland.com/sites/default/files/2024-10/RLC_SR_2023-Web%20Version.pdf'],
    ['2022', 'https://robinsonsland.com/sites/default/files/2023-05/2022%20RLC%20SR%20v2.pdf'],
    ['2021', 'https://robinsonsland.com/sites/default/files/2022-08/RLC%2021SR%20FA%200721.pdf'],
    ['2020', 'https://www.robinsonsland.com/sites/default/files/2021-12/2020%20RLC%20Sustainability%20Report_0.pdf'],
    ['2019', 'https://www.robinsonsland.com/sites/default/files/2021-12/Robinsons%20Land%20Corp.SEC_.2019.SR__0.pdf'],
  ],
};

export const IR = {
  lead: "Our Investor Relations Program communicates the Company's business model, performance, long-term strategies and prospects to stakeholders and external parties.",
  principles: [
    ['Primary liaison', 'Between RLC shareholders and the wider investment community: retail and institutional, local and foreign.'],
    ['Timely information', 'Consistently relevant and accurate information about the Company for stakeholders and external parties.'],
    ['Open channel', 'A line of communication between management and stockholders, with transparency to the general public.'],
  ],
  link: 'https://robinsonsland.com/investor-relations',
};

export const REPORT = {
  revenue: 48.52, assets: 275, netIncome: 13.47,
  summary: "One of the Philippines' leading real estate developers, with malls, offices, hotels, industrial facilities and homes in key cities nationwide.",
  pdf: 'https://robinsonsland.com/sites/default/files/2025-05/%5BRLC%202024%20ASR%5D%20Compressed.pdf',
  all: 'https://robinsonsland.com/annual-reports',
  dis: 'https://robinsonsland.com/sites/default/files/2025-04/RLC%20SEC%20FORM%2020-IS%20%28Definitive%20Information%20Statement%29%20Clean%20%28redacted%29..pdf',
  links: [
    ['https://robinsonsland.com/share-information', 'Share information'],
    ['https://robinsonsland.com/quarterly-reports', 'Quarterly reports'],
    ['https://robinsonsland.com/financials', 'Financials'],
    ['https://robinsonsland.com/ir-presentations', 'Presentations'],
    ['https://robinsonsland.com/schedules', 'Calendar of events'],
    ['https://robinsonsland.com/other-disclosures', 'Disclosures'],
  ],
};

export const INTERESTS = ['Malls', 'Residences', 'Offices', 'Hotels', 'Industrial'];

/* Company Profile page (#/about/company-profile). Copy and photos from robinsonsland.com/company-profile */
export const PROFILE = {
  intro: 'From its beginnings, JG Summit Holding’s real estate arm has grown to an industry leader in real-estate land development. Each space has a vision woven into the community’s pursuit for growth and development, and each structure is responsive to the Filipino’s changing needs.',
  facts: [['46', 'years of proven track record'], ['20', 'mixed-use developments'], ['3', 'landmark Destination Estates']],
  heroImg: 'assets/profile-team.jpg',
  heroAlt: 'Hundreds of Robinsons Land employees gathered in a ballroom with the company mascot',
  statement: 'The strength of a company, founded on the vision of its leaders, driven by a team, sharing the same core values, starts with one man’s dream, and an entrepreneurial spirit.',
  better: {
    title: 'RLC is building things better, to make life more meaningful for the Filipino.',
    paras: [
      'We are delighted to have passionate, dedicated, honest, and hardworking team players. At RLC, we are committed to uplifting the quality of life in the Philippines. Whether one lives, works, or is a visitor in the Philippines, we will touch your life in a positive and meaningful way.',
      'We consistently create innovative and outstanding lifestyle products and business solutions that revolutionize people’s lives and work.',
    ],
    highlights: [
      ['Offices', 'The country’s largest office landlord'],
      ['Malls', 'The second-largest chain of lifestyle shopping malls'],
      ['Residences', 'Residential subdivisions nationwide, and condominiums in the top central districts'],
      ['Hotels', 'A significant player in the hotel industry'],
    ],
  },
  courage: {
    title: 'Rapid change, once facing uncertainty, requires great courage.',
    img: 'assets/profile-courage.jpg',
    paras: [
      'Robinsons Land Corporation (RLC) pursues its commitment to making life better for the Filipino people, harnessing its most excellent resource, our people. RLC listens and takes inspiration from customers and grows with business partners and tenants, who share the same vision of progress.',
      'RLC has always engaged in businesses that create value for shareholders and result in a developmental impact on society by providing affordable housing development to community outreach programs and sustaining a livelihood for thousands of Filipino families.',
      'With unwavering faith in the Filipino spirit, RLC invests in lasting commercial spaces that will benefit and upgrade Filipino quality of life. RLC is driven with a passion and determination to share with the Filipino people the same core values of the company.',
      'Robinsons Land Corporation grew through value, creation, and innovation. It continues to expand and pursue other retail formats and concepts. We invest in communities and transform the Filipino way of life, reaching and serving more Filipinos nationwide. Robinsons brings them together around a shared sense of purpose.',
    ],
  },
  values: {
    names: ['Entrepreneurial Mindset', 'Integrity', 'Stewardship'],
    text: 'Robinsons Land is one of the most respected and recognized names in the Real Estate Industry committed to transforming every property into high-quality developments that create superior value to customers and shareholders. Every Robinsons Land project carries the reputation of having the highest standards of quality and service.',
    img: 'assets/profile-award.jpg',
    imgAlt: 'Robinsons Land team on stage receiving a Best Developer award',
  },
};

/* Vision, mission and core values page (#/about/principles). Copy and images from robinsonsland.com/principles */
export const PRINCIPLES = {
  intro: 'Robinsons Land Corporation grew through value, creation, and innovation. It continues to expand and pursue other retail formats and concepts. We invest in communities and transform the Filipino way of life, reaching and serving more Filipinos nationwide. Robinsons brings them together around a shared sense of purpose.',
  heroImg: 'assets/principles-hero.jpg',
  heroAlt: 'Smiling colleagues gathered around a laptop',
  vision: 'Robinsons Land Corporation will be the leading real estate company, creating value for shareholders, and making a positive difference to customers, employees, and business partners.',
  mission: 'Robinsons Land Corporation is committed to developing vibrant, delightful, and lasting real estate developments that create a catalyst for new opportunities and a better life. Led by motivated, innovative, and entrepreneurial-spirited individuals dedicated to serving our customers’ ever-changing needs and aspirations, creating more significant ideas, and sharing dreams that give birth to new ones.',
  values: [
    { name: 'Entrepreneurial Mindset', motto: 'Dream big.', img: 'assets/value-entrepreneurial.jpg', text: 'We strive for growth with a resilient, passionate and agile mindset with focus on living out our purpose to provide our customers with better choices.' },
    { name: 'Stewardship', motto: 'Own it.', img: 'assets/value-stewardship.jpg', text: 'We are fully responsible for the resources entrusted to us, be they financial, environmental, and people. We make sure that they are managed well and cared for, all with sustainability at the forefront.' },
    { name: 'Integrity', motto: 'Do the right thing.', img: 'assets/value-integrity.jpg', text: 'We will act with honor in all our undertakings and with all our stakeholders, upholding the principle of always doing the right thing because it is the right thing to do, even when no one else is watching.' },
  ],
  dreams: {
    title: 'We are in the business of building people’s dreams.',
    items: [
      ['Who are our people?', 'We are smart, honest, and energetic people who love what they do.', 'assets/dreams-people.jpg'],
      ['What is our goal?', 'We make our customers happy.', 'assets/dreams-goal.jpg'],
      ['What is our purpose?', 'We create value for our customers and shareholders.', 'assets/dreams-purpose.jpg'],
      ['What is our nature?', 'We trust and treat each other well. We win as a team.', 'assets/dreams-nature.jpg'],
    ],
  },
};

/* "More about RLC" links shown at the foot of each About page; the current page is left out */
export const ABOUT_PAGES = [
  ['Company Profile', '#/about/company-profile'],
  ['Vision, Mission and Values', '#/about/principles'],
  ['Board of Directors & Officers', '#/about/board'],
  ['Corporate Structure', rl('corporate-structure')],
  ['Organizational Chart', rl('organizationalchart')],
  ['Awards', rl('awards')],
  ['Our Stories', '#/stories'],
];

export const FOOTER_GROUPS = [
  { title: 'About', links: [['#/about/company-profile', 'Company Profile'],['#/about/principles', 'Mission and Vision'], ['#/about/board', 'Board and Officers'], ['#about', 'Awards']] },
  { title: 'Business Units', links: [['#units', 'Commercial Centres'], ['#units', 'Residences'], ['#units', 'Offices'], ['#units', 'Hotels and Resorts'], ['#units', 'Logistix']] },
  { title: 'Explore', links: [['#investors', 'Investor Relations'], ['#sustainability', 'Sustainability'], ['#contact', 'Land Offers'], ['#contact', 'Careers'], ['#/stories', 'Stories']] },
];

export const SOCIALS = [
  { href: 'https://facebook.com/OfficialRobinsonsLand', label: 'Facebook' },
  { href: 'https://instagram.com/officialrobinsonsland', label: 'Instagram' },
  { href: 'https://linkedin.com/company/robinsonsland', label: 'LinkedIn' },
];
