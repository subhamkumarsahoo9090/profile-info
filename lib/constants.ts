import {
	seedProfile,
	seedProjects,
	seedExperiences,
	seedEducation,
	seedSkills,
	seedCertificates,
	seedBlogPosts,
} from '@/lib/seed-data';

export const siteConfig = {
	name: 'subham.dev',
	description: seedProfile.summary,
	mainNav: [
		{ title: 'Home', href: '/' },
		{ title: 'About', href: '/about' },
		{ title: 'Education', href: '/education' },
		{ title: 'Skills', href: '/skills' },
		{ title: 'Experience', href: '/experience' },
		{ title: 'Projects', href: '/projects' },
		{ title: 'Certificates', href: '/certificates' },
		{ title: 'Blog', href: '/blog' },
		{ title: 'Contact', href: '/contact' },
	],
	links: {
		github: seedProfile.links.github || '#',
		linkedin: seedProfile.links.linkedin || '#',
		twitter: seedProfile.links.twitter || '#',
		facebook: seedProfile.links.facebook || '#',
		instagram: seedProfile.links.instagram || '#',
		whatsapp: seedProfile.links.whatsapp || '#',
		email: `mailto:${seedProfile.email}`,
		phone: `tel:${seedProfile.phone.replace(/\s/g, '')}`,
	},
};

export type Experience = {
	_id?: string;
	title: string;
	company: string;
	location: string;
	startDate: string;
	endDate: string;
	description: string[];
	technologies: string[];
	order?: number;
};

export const experiences: Experience[] = seedExperiences;

export type Project = {
	_id?: string;
	title: string;
	description: string;
	image: string;
	tags: string[];
	link?: string;
	repo?: string;
	featured?: boolean;
	order?: number;
};

export const projects: Project[] = seedProjects;

export type Education = {
	_id?: string;
	degree: string;
	field: string;
	institution: string;
	location: string;
	startDate: string;
	endDate: string;
	gpa?: string;
	achievements: string[];
	order?: number;
};

export const education: Education[] = seedEducation;

export type Certificate = {
	_id?: string;
	title: string;
	issuer: string;
	date: string;
	id?: string;
	url?: string;
	pdf?: string;
	order?: number;
};

export const certificates: Certificate[] = seedCertificates;

export type Skill = {
	_id?: string;
	name: string;
	level: number;
	category: 'technical' | 'software' | 'soft' | 'language';
	order?: number;
};

export const skills: Skill[] = seedSkills;

export type BlogPost = {
	_id?: string;
	title: string;
	excerpt: string;
	date: string;
	author: string;
	image: string;
	slug: string;
	order?: number;
};

export const blogPosts: BlogPost[] = seedBlogPosts;

export type Profile = typeof seedProfile & { _id?: string };

export const profile: Profile = seedProfile;
