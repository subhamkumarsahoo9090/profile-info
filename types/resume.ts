export type ResumeTemplateId = 'classic' | 'modern' | 'executive';

export type ResumeSkillGroup = {
	category: string;
	items: string;
};

export type ResumeExperience = {
	title: string;
	company: string;
	startDate: string;
	endDate: string;
	bullets: string[];
};

export type ResumeProject = {
	name: string;
	description: string;
};

export type ResumeEducation = {
	degree: string;
	institution: string;
	startDate: string;
	endDate: string;
	score: string;
};

export type ResumeData = {
	_id?: string;
	template: ResumeTemplateId;
	name: string;
	headline: string;
	location: string;
	phone: string;
	email: string;
	website: string;
	summary: string;
	skillGroups: ResumeSkillGroup[];
	experiences: ResumeExperience[];
	projects: ResumeProject[];
	education: ResumeEducation[];
	achievements: string[];
};
