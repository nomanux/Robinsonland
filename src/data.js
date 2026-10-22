const unsplash = (id, w) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#units', label: 'Business Units' },
  { href: '#sustainability', label: 'Sustainability' },
  { href: '#investors', label: 'Investors' },
  { href: '#news', label: 'Stories' },
];

export const MOBILE_LINKS = [
  ...NAV_LINKS.filter(l => l.href !== '#news'),
  { href: '#contact', label: 'Contact' },
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

export const STORIES = [
  {
    date: '16 Oct 2026',
    title: 'Robinsons Place Iligan recognized as a Mother-Baby Friendly Workplace in Northern Mindanao',
    img: 'assets/news-iligan-workplace.png',
    alt: 'Robinsons Place Iligan team receiving the Breastfeeding-Friendly Workplace Recognition at the 2026 CHD-NM Regional Health awards',
  },
  {
    date: '16 Oct 2026',
    title: 'Building Bacolod with Bayanihan: Robinsons Land looks beyond its developments',
    img: 'assets/news-bacolod-bayanihan.png',
    alt: 'Robinsons Land team, community partners and MassKara performers gathered for a group photo at a Bacolod event',
  },
  {
    date: '14 Oct 2026',
    title: 'Robinsons Land brings everyday life closer',
    img: 'assets/news-everyday-life.png',
    alt: 'Aerial view of a giant silver statue with a raised fist in front of Bridgetowne office towers',
  },
];

export const REPORT = {
  revenue: 48.52, assets: 275, netIncome: 13.47,
  summary: "RLC is one of the Philippines' leading real estate developers in terms of revenues, projects, and total project size. It is engaged in the construction and operation of commercial lifestyle centers, offices, hotels, and industrial facilities; and the development of mixed-use properties, residential buildings, and land and residential housing developments, including socialized housing projects located in key cities and other urban areas nationwide.",
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

export const FOOTER_GROUPS = [
  { title: 'About', links: [['#about', 'Company Profile'], ['#about', 'Mission and Vision'], ['#about', 'Board and Officers'], ['#about', 'Awards']] },
  { title: 'Business Units', links: [['#units', 'Commercial Centres'], ['#units', 'Residences'], ['#units', 'Offices'], ['#units', 'Hotels and Resorts'], ['#units', 'Logistix']] },
  { title: 'Explore', links: [['#investors', 'Investor Relations'], ['#sustainability', 'Sustainability'], ['#contact', 'Land Offers'], ['#contact', 'Careers'], ['#news', 'Stories']] },
];

export const SOCIALS = [
  { href: 'https://facebook.com/OfficialRobinsonsLand', label: 'Facebook', short: 'Fb' },
  { href: 'https://instagram.com/officialrobinsonsland', label: 'Instagram', short: 'Ig' },
  { href: 'https://linkedin.com/company/robinsonsland', label: 'LinkedIn', short: 'In' },
];
