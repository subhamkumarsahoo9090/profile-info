export const seedProfile = {
	name: 'Subham Kumar Sahoo',
	headline: 'Senior Full-Stack Developer',
	tagline:
		'MERN | React Native | Next.js | TypeScript — building scalable web & mobile products.',
	summary:
		'Full-Stack Developer with 3 years of experience building scalable web and mobile applications. Strong in React.js, React Native, Next.js, TypeScript, Node.js, Express.js, PostgreSQL and MongoDB. Experienced in enterprise applications, HRMS, fintech onboarding, geospatial systems, PWA, API integrations and analytics.',
	about:
		'I am a Senior Full-Stack Developer based in Angul, Odisha, specializing in MERN, React Native, Next.js and TypeScript. I build production-ready web and mobile applications across fintech, HRMS, geospatial and enterprise domains.',
	journey:
		'Over the last 3 years I have shipped high-precision geospatial mapping, secure fintech onboarding with Digio/Aadhaar eKYC, company HRMS for web and mobile, PWA upgrades, Google Analytics integrations, and IPO Master end-to-end workflows.',
	location: 'Angul, Odisha',
	email: 'subhamkumarsahoo109@gmail.com',
	phone: '+91 9777370637',
	website: 'https://subham.us.cc',
	image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg',
	links: {
		github: 'https://github.com/',
		linkedin: 'https://linkedin.com/in/',
		twitter: 'https://twitter.com/',
		facebook: 'https://facebook.com/',
		instagram: 'https://instagram.com/',
		whatsapp: 'https://wa.me/919777370637',
	},
	achievements: [
		'Reduced onboarding time by 30%',
		'RBI/PMLA compliance delivery',
		'Runner-Up, Chess Championship (2017)',
	],
};

export const seedExperiences = [
	{
		title: 'Senior Full-Stack Developer',
		company: 'TechCulture Solution Pvt. Ltd.',
		location: 'India',
		startDate: 'Jan 2024',
		endDate: 'Present',
		description: [
			'Built high-precision Leaflet.js geospatial mapping for asset tracking and field operations.',
			'Integrated DGPS and GPR data with GeoJSON for real-time field analysis and visualization.',
			'Developed secure fintech onboarding using Digio APIs, identity verification and Penny Drop validation.',
			'Developed company HRMS solution for both web and mobile applications.',
			'Added PWA support for improved mobile web usability and installability.',
			'Integrated Open with Google and Google Analytics API for access and usage analytics.',
			'Created IPO Master with IPO-focused workflows and end-to-end API integration.',
		],
		technologies: [
			'React.js',
			'Next.js',
			'TypeScript',
			'Node.js',
			'MongoDB',
			'PostgreSQL',
			'Leaflet.js',
			'React Native',
		],
		order: 1,
	},
	{
		title: 'React Native / Full-Stack Developer',
		company: 'Technowell',
		location: 'India',
		startDate: 'Jul 2023',
		endDate: 'Sep 2023',
		description: [
			'Built Dam Safety web/mobile modules using React Native, React.js and Node.js, including offline entry and Leaflet maps.',
			'Delivered RUWAS offline mobile forms with remote data collection and server synchronization.',
			'Developed Road Work, Flood Work, Public Complaint and Police Tracking apps with photo evidence, geo-tagging, maps and APIs.',
		],
		technologies: ['React Native', 'React.js', 'Node.js', 'Leaflet.js', 'SQLite'],
		order: 2,
	},
];

export const seedEducation = [
	{
		degree: 'MCA',
		field: 'Computer Applications',
		institution: 'BPUT',
		location: 'Odisha, India',
		startDate: '2021',
		endDate: '2023',
		gpa: '7.1 CGPA',
		achievements: ['Completed postgraduate coursework in computer applications'],
		order: 1,
	},
	{
		degree: 'B.Sc',
		field: 'Science',
		institution: 'Utkal University',
		location: 'Odisha, India',
		startDate: '2014',
		endDate: '2017',
		gpa: '65%',
		achievements: ['Runner-Up, Chess Championship (2017)'],
		order: 2,
	},
];

export const seedSkills = [
	{ name: 'React.js', level: 9, category: 'technical' as const, order: 1 },
	{ name: 'Next.js', level: 9, category: 'technical' as const, order: 2 },
	{ name: 'TypeScript', level: 8, category: 'technical' as const, order: 3 },
	{ name: 'React Native', level: 8, category: 'technical' as const, order: 4 },
	{ name: 'Node.js / Express', level: 8, category: 'technical' as const, order: 5 },
	{ name: 'REST / GraphQL APIs', level: 8, category: 'technical' as const, order: 6 },
	{ name: 'PWA', level: 7, category: 'technical' as const, order: 7 },
	{ name: 'Leaflet.js / GIS', level: 8, category: 'technical' as const, order: 8 },
	{ name: 'MongoDB', level: 8, category: 'software' as const, order: 1 },
	{ name: 'PostgreSQL', level: 7, category: 'software' as const, order: 2 },
	{ name: 'Redis / SQLite', level: 6, category: 'software' as const, order: 3 },
	{ name: 'Tailwind CSS', level: 8, category: 'software' as const, order: 4 },
	{ name: 'Redux', level: 7, category: 'software' as const, order: 5 },
	{ name: 'Docker / Git', level: 7, category: 'software' as const, order: 6 },
	{ name: 'Problem Solving', level: 9, category: 'soft' as const, order: 1 },
	{ name: 'Team Collaboration', level: 8, category: 'soft' as const, order: 2 },
	{ name: 'Agile Delivery', level: 8, category: 'soft' as const, order: 3 },
	{ name: 'API Integration', level: 9, category: 'soft' as const, order: 4 },
	{ name: 'English', level: 9, category: 'language' as const, order: 1 },
	{ name: 'Hindi', level: 9, category: 'language' as const, order: 2 },
	{ name: 'Odia', level: 10, category: 'language' as const, order: 3 },
];

export const seedProjects = [
	{
		title: 'EZ Wealth',
		description:
			'Fintech wealth platform with secure onboarding, investment workflows and production-ready web experience.',
		image: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg',
		tags: ['Fintech', 'Next.js', 'TypeScript', 'API Integration'],
		link: 'https://www.ezwealth.in/',
		featured: true,
		order: 1,
	},
	{
		title: 'EZ Wealth Landing',
		description:
			'Marketing landing experience for EZ Wealth with multilingual support and conversion-focused UI.',
		image: 'https://images.pexels.com/photos/7821485/pexels-photo-7821485.jpeg',
		tags: ['Landing Page', 'Next.js', 'i18n', 'UI/UX'],
		link: 'https://landing.ezwealth.in/en',
		featured: true,
		order: 2,
	},
	{
		title: 'EZ Wealth Login',
		description:
			'Secure authentication portal for EZ Wealth users with production login flows.',
		image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg',
		tags: ['Auth', 'Fintech', 'Security', 'React'],
		link: 'https://login.ezwealth.in/',
		featured: true,
		order: 3,
	},
	{
		title: 'EZ Wealth Bot',
		description:
			'Conversational bot experience for EZ Wealth to assist users with product queries and workflows.',
		image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
		tags: ['Chatbot', 'AI', 'Fintech', 'Web'],
		link: 'https://bot.ezwealth.in/',
		featured: true,
		order: 4,
	},
	{
		title: 'TechCulture Portal',
		description:
			'Company portal login and product access experience for TechCulture Solution platforms.',
		image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
		tags: ['Enterprise', 'Auth', 'React', 'Node.js'],
		link: 'https://techculture.co.in/login',
		featured: true,
		order: 5,
	},
	{
		title: 'TechCulture AI',
		description:
			'AI-focused product surface for TechCulture showcasing intelligent tooling and modern web UX.',
		image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg',
		tags: ['AI', 'Next.js', 'Product', 'TypeScript'],
		link: 'https://techculture.ai/',
		featured: true,
		order: 6,
	},
	{
		title: 'IPO Master',
		description:
			'IPO-focused application with user-facing workflows, about/product pages and end-to-end API integration.',
		image: 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg',
		tags: ['IPO', 'Fintech', 'API', 'Full-Stack'],
		link: 'https://ipomaster.in/about',
		featured: true,
		order: 7,
	},
	{
		title: 'HRMS - Web & Mobile',
		description:
			'Company HRMS platform developed for web and mobile workflows covering employee and admin operations.',
		image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg',
		tags: ['HRMS', 'React', 'React Native', 'Node.js'],
		link: 'https://techculture.co.in/login',
		featured: false,
		order: 8,
	},
	{
		title: 'Geospatial Mapping',
		description:
			'Leaflet.js mapping with DGPS/GPR data and GeoJSON visualization for asset tracking and field operations.',
		image: 'https://images.pexels.com/photos/269790/pexels-photo-269790.jpeg',
		tags: ['Leaflet.js', 'GIS', 'GeoJSON', 'DGPS'],
		featured: false,
		order: 9,
	},
	{
		title: 'Fintech Onboarding',
		description:
			'Secure onboarding with Digio, Aadhaar eKYC, PAN, Liveness Detection and Penny Drop validation.',
		image: 'https://images.pexels.com/photos/4968630/pexels-photo-4968630.jpeg',
		tags: ['Digio', 'eKYC', 'Compliance', 'Fintech'],
		featured: false,
		order: 10,
	},
];

export const seedCertificates = [
	{
		title: 'RBI / PMLA Compliance Delivery',
		issuer: 'TechCulture Solution Pvt. Ltd.',
		date: '2024',
		id: 'ACH-001',
		order: 1,
	},
	{
		title: 'Onboarding Optimization (30% faster)',
		issuer: 'TechCulture Solution Pvt. Ltd.',
		date: '2024',
		id: 'ACH-002',
		order: 2,
	},
	{
		title: 'Chess Championship Runner-Up',
		issuer: 'Tournament 2017',
		date: '2017',
		id: 'ACH-003',
		order: 3,
	},
];

export const seedBlogPosts = [
	{
		title: 'Building Fintech Onboarding with Digio & eKYC',
		excerpt:
			'Lessons from integrating Digio, Aadhaar eKYC, PAN verification and Penny Drop in production.',
		date: 'Oct 12, 2025',
		author: 'Subham Kumar Sahoo',
		image: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg',
		slug: 'fintech-onboarding-digio-ekyc',
		order: 1,
	},
	{
		title: 'Geospatial Apps with Leaflet, DGPS & GPR',
		excerpt:
			'How we combine Leaflet.js, GeoJSON and field survey data for real-time asset tracking.',
		date: 'Aug 20, 2025',
		author: 'Subham Kumar Sahoo',
		image: 'https://images.pexels.com/photos/269790/pexels-photo-269790.jpeg',
		slug: 'geospatial-leaflet-dgps-gpr',
		order: 2,
	},
	{
		title: 'Shipping PWAs for Enterprise Web Apps',
		excerpt:
			'Practical steps to add installability, offline resilience and better mobile UX to existing apps.',
		date: 'Jun 5, 2025',
		author: 'Subham Kumar Sahoo',
		image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
		slug: 'shipping-pwas-enterprise',
		order: 3,
	},
];
