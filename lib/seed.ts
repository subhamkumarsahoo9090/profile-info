import { connectDB } from '@/lib/db';
import { Profile } from '@/models/Profile';
import { Project } from '@/models/Project';
import { Experience } from '@/models/Experience';
import { Education } from '@/models/Education';
import { Skill } from '@/models/Skill';
import { Certificate } from '@/models/Certificate';
import { BlogPost } from '@/models/BlogPost';
import {
	seedProfile,
	seedProjects,
	seedExperiences,
	seedEducation,
	seedSkills,
	seedCertificates,
	seedBlogPosts,
} from '@/lib/seed-data';

export async function ensureSeeded() {
	await connectDB();

	const [profileCount, projectCount] = await Promise.all([
		Profile.countDocuments(),
		Project.countDocuments(),
	]);

	if (profileCount === 0) {
		await Profile.create(seedProfile);
	}

	if (projectCount === 0) {
		await Promise.all([
			Project.insertMany(seedProjects),
			Experience.insertMany(seedExperiences),
			Education.insertMany(seedEducation),
			Skill.insertMany(seedSkills),
			Certificate.insertMany(seedCertificates),
			BlogPost.insertMany(seedBlogPosts),
		]);
	}
}
