import type { ResumeData } from '@/types/resume';

export const defaultResume: ResumeData = {
	template: 'classic',
	name: 'Subham Kumar Sahoo',
	headline:
		'Senior Full-Stack Developer | MERN | React Native | Next.js | TypeScript',
	location: 'Angul, Odisha',
	phone: '+91 9777370637',
	email: 'subhamkumarsahoo109@gmail.com',
	website: 'subham.us.cc',
	summary:
		'Full-Stack Developer with 3 years of experience building scalable web and mobile applications. Strong in React.js, React Native, Next.js, TypeScript, Node.js, Express.js, PostgreSQL and MongoDB. Experienced in enterprise applications, HRMS, fintech onboarding, geospatial systems, PWA, API integrations and analytics.',
	skillGroups: [
		{ category: 'Frontend', items: 'React.js, Next.js, TypeScript, Tailwind CSS, Redux, PWA' },
		{ category: 'Mobile', items: 'React Native, Expo, Offline-first applications' },
		{ category: 'Backend', items: 'Node.js, Express.js, REST APIs, GraphQL' },
		{ category: 'Database', items: 'PostgreSQL, MongoDB, Redis, SQLite' },
		{ category: 'Maps / GIS', items: 'Leaflet.js, GeoJSON, Mapbox, DGPS, GPR, GIS' },
		{
			category: 'Integrations',
			items:
				'Google Analytics API, Open with Google, OAuth 2.0, Digio API, Aadhaar eKYC, PAN, Liveness Detection',
		},
		{ category: 'Tools', items: 'Docker, Git, Postman, Agile, Turbopack' },
	],
	experiences: [
		{
			title: 'Senior Full-Stack Developer',
			company: 'TechCulture Solution Pvt. Ltd.',
			startDate: 'Jan 2024',
			endDate: 'Present',
			bullets: [
				'Built high-precision Leaflet.js geospatial mapping for asset tracking and field operations.',
				'Integrated DGPS and GPR data with GeoJSON for real-time field analysis and visualization.',
				'Developed secure fintech onboarding using Digio APIs, identity verification and Penny Drop validation.',
				'Developed company HRMS solution for both web and mobile applications.',
				'Added PWA support to the current application for improved mobile web usability and installability.',
				'Integrated Open with Google and Google Analytics API for application access and usage analytics.',
				'Created IPO Master project with IPO-focused workflows and end-to-end API integration.',
			],
		},
		{
			title: 'React Native / Full-Stack Developer',
			company: 'Technowell',
			startDate: 'Jul 2023',
			endDate: 'Sep 2023',
			bullets: [
				'Built Dam Safety web/mobile modules using React Native, React.js and Node.js, including offline entry and Leaflet maps.',
				'Delivered RUWAS offline mobile forms with remote data collection and server synchronization.',
				'Developed Road Work, Flood Work, Public Complaint and Police Tracking apps with photo evidence, geo-tagging, maps and APIs.',
			],
		},
	],
	projects: [
		{
			name: 'HRMS – Web & Mobile',
			description: 'Company HRMS platform developed for web and mobile workflows.',
		},
		{
			name: 'IPO Master',
			description:
				'IPO-focused application with user-facing workflows and backend/API integration.',
		},
		{
			name: 'Current Application',
			description:
				'PWA support, Open with Google and Google Analytics API integration.',
		},
		{
			name: 'Geospatial Mapping',
			description: 'Leaflet.js mapping with DGPS/GPR data and GeoJSON visualization.',
		},
		{
			name: 'Fintech Onboarding',
			description:
				'Digio, Aadhaar eKYC-related integrations, PAN, Liveness Detection and Penny Drop.',
		},
	],
	education: [
		{
			degree: 'MCA',
			institution: 'BPUT',
			startDate: '2021',
			endDate: '2023',
			score: '7.1 CGPA',
		},
		{
			degree: 'B.Sc',
			institution: 'Utkal University',
			startDate: '2014',
			endDate: '2017',
			score: '65%',
		},
	],
	achievements: [
		'Reduced onboarding time by 30%',
		'RBI/PMLA compliance delivery',
		'Runner-Up, Chess Championship (2017)',
	],
};

export const TEMPLATE_OPTIONS: {
	id: ResumeData['template'];
	label: string;
	description: string;
}[] = [
	{
		id: 'classic',
		label: 'Classic ATS',
		description: 'Clean single-column layout matching your PDF resume.',
	},
	{
		id: 'modern',
		label: 'Modern Sidebar',
		description: 'Two-column layout with a dark sidebar for contact & skills.',
	},
	{
		id: 'executive',
		label: 'Executive',
		description: 'Bold header band with structured sections for senior roles.',
	},
];
