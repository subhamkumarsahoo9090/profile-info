import { connectDB } from '@/lib/db';
import { Project } from '@/models/Project';
import { Experience } from '@/models/Experience';
import { Education } from '@/models/Education';
import { Skill } from '@/models/Skill';
import { Certificate } from '@/models/Certificate';
import { BlogPost } from '@/models/BlogPost';
import { Profile } from '@/models/Profile';
import { Resume } from '@/models/Resume';
import {
	createLocal,
	deleteLocal,
	getLocalProfile,
	getLocalResume,
	listLocal,
	resetLocalStore,
	saveLocalProfile,
	saveLocalResume,
	updateLocal,
} from '@/lib/local-store';
import {
	seedProfile,
	seedProjects,
	seedExperiences,
	seedEducation,
	seedSkills,
	seedCertificates,
	seedBlogPosts,
} from '@/lib/seed-data';
import { defaultResume } from '@/lib/resume-defaults';

type Collection = 'projects' | 'experiences' | 'education' | 'skills' | 'certificates' | 'blogs';

const modelMap = {
	projects: Project,
	experiences: Experience,
	education: Education,
	skills: Skill,
	certificates: Certificate,
	blogs: BlogPost,
} as const;

let mongoState: { ok: boolean; checkedAt: number } | null = null;
const MONGO_TTL_MS = 60_000;

async function mongoAvailable() {
	const now = Date.now();
	if (mongoState && now - mongoState.checkedAt < MONGO_TTL_MS) {
		return mongoState.ok;
	}

	try {
		await Promise.race([
			connectDB(),
			new Promise((_, reject) =>
				setTimeout(() => reject(new Error('Mongo timeout')), 4000)
			),
		]);
		mongoState = { ok: true, checkedAt: now };
		return true;
	} catch {
		mongoState = { ok: false, checkedAt: now };
		return false;
	}
}

export async function listItems(collection: Collection) {
	if (await mongoAvailable()) {
		try {
			const ModelRef = modelMap[collection];
			const count = await ModelRef.countDocuments();
			if (count === 0) {
				const seed =
					collection === 'projects'
						? seedProjects
						: collection === 'experiences'
							? seedExperiences
							: collection === 'education'
								? seedEducation
								: collection === 'skills'
									? seedSkills
									: collection === 'certificates'
										? seedCertificates
										: seedBlogPosts;
				await ModelRef.insertMany(seed);
			}
			return await ModelRef.find().sort({ order: 1 }).lean();
		} catch (error) {
			console.error('mongo list failed, using local store', error);
			mongoState = { ok: false, checkedAt: Date.now() };
		}
	}
	return listLocal(collection);
}

export async function createItem(collection: Collection, body: Record<string, unknown>) {
	if (await mongoAvailable()) {
		try {
			const created = await modelMap[collection].create(body);
			return created.toObject();
		} catch (error) {
			console.error('mongo create failed, using local store', error);
			mongoState = { ok: false, checkedAt: Date.now() };
		}
	}
	return createLocal(collection, body);
}

export async function updateItem(
	collection: Collection,
	id: string,
	body: Record<string, unknown>
) {
	if (await mongoAvailable()) {
		try {
			const updated = await modelMap[collection].findByIdAndUpdate(id, body, {
				new: true,
			});
			if (updated) return updated.toObject();
		} catch (error) {
			console.error('mongo update failed, using local store', error);
			mongoState = { ok: false, checkedAt: Date.now() };
		}
	}
	return updateLocal(collection, id, body);
}

export async function deleteItem(collection: Collection, id: string) {
	if (await mongoAvailable()) {
		try {
			const deleted = await modelMap[collection].findByIdAndDelete(id);
			if (deleted) return true;
		} catch (error) {
			console.error('mongo delete failed, using local store', error);
			mongoState = { ok: false, checkedAt: Date.now() };
		}
	}
	return deleteLocal(collection, id);
}

export async function getProfile() {
	if (await mongoAvailable()) {
		try {
			let profile = await Profile.findOne();
			if (!profile) {
				profile = await Profile.create(seedProfile);
			}
			return profile.toObject();
		} catch (error) {
			console.error('mongo profile failed, using local store', error);
			mongoState = { ok: false, checkedAt: Date.now() };
		}
	}
	return getLocalProfile();
}

export async function saveProfile(body: Record<string, unknown>) {
	if (await mongoAvailable()) {
		try {
			let profile = await Profile.findOne();
			if (!profile) {
				profile = await Profile.create(body);
			} else {
				Object.assign(profile, body);
				await profile.save();
			}
			return profile.toObject();
		} catch (error) {
			console.error('mongo profile save failed, using local store', error);
			mongoState = { ok: false, checkedAt: Date.now() };
		}
	}
	return saveLocalProfile(body);
}

export async function getResume() {
	if (await mongoAvailable()) {
		try {
			let resume = await Resume.findOne();
			if (!resume) {
				resume = await Resume.create(defaultResume);
			}
			return resume.toObject();
		} catch (error) {
			console.error('mongo resume failed, using local store', error);
			mongoState = { ok: false, checkedAt: Date.now() };
		}
	}
	return getLocalResume();
}

export async function saveResume(body: Record<string, unknown>) {
	if (await mongoAvailable()) {
		try {
			let resume = await Resume.findOne();
			if (!resume) {
				resume = await Resume.create(body);
			} else {
				Object.assign(resume, body);
				await resume.save();
			}
			return resume.toObject();
		} catch (error) {
			console.error('mongo resume save failed, using local store', error);
			mongoState = { ok: false, checkedAt: Date.now() };
		}
	}
	return saveLocalResume(body);
}

export async function reseedAll() {
	const local = await resetLocalStore();
	if (await mongoAvailable()) {
		try {
			await Promise.all([
				Profile.deleteMany({}),
				Resume.deleteMany({}),
				Project.deleteMany({}),
				Experience.deleteMany({}),
				Education.deleteMany({}),
				Skill.deleteMany({}),
				Certificate.deleteMany({}),
				BlogPost.deleteMany({}),
			]);
			await Profile.create(seedProfile);
			await Resume.create(defaultResume);
			await Promise.all([
				Project.insertMany(seedProjects),
				Experience.insertMany(seedExperiences),
				Education.insertMany(seedEducation),
				Skill.insertMany(seedSkills),
				Certificate.insertMany(seedCertificates),
				BlogPost.insertMany(seedBlogPosts),
			]);
		} catch (error) {
			console.error('mongo reseed failed, local store reset done', error);
			mongoState = { ok: false, checkedAt: Date.now() };
		}
	}
	return local;
}
