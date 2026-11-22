import { promises as fs } from 'fs';
import path from 'path';
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

export type StoreShape = {
	profile: Record<string, unknown>;
	resume: Record<string, unknown>;
	projects: Record<string, unknown>[];
	experiences: Record<string, unknown>[];
	education: Record<string, unknown>[];
	skills: Record<string, unknown>[];
	certificates: Record<string, unknown>[];
	blogs: Record<string, unknown>[];
};

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'portfolio.json');

function withIds<T extends Record<string, unknown>>(items: T[], prefix: string) {
	return items.map((item, index) => ({
		...item,
		_id: item._id || `${prefix}_${index + 1}`,
	}));
}

function defaultStore(): StoreShape {
	return {
		profile: { ...seedProfile, _id: 'profile_1' },
		resume: { ...defaultResume, _id: 'resume_1' },
		projects: withIds(seedProjects as Record<string, unknown>[], 'project'),
		experiences: withIds(seedExperiences as Record<string, unknown>[], 'exp'),
		education: withIds(seedEducation as Record<string, unknown>[], 'edu'),
		skills: withIds(seedSkills as Record<string, unknown>[], 'skill'),
		certificates: withIds(seedCertificates as Record<string, unknown>[], 'cert'),
		blogs: withIds(seedBlogPosts as Record<string, unknown>[], 'blog'),
	};
}

async function ensureFile() {
	await fs.mkdir(DATA_DIR, { recursive: true });
	try {
		await fs.access(DATA_FILE);
	} catch {
		await fs.writeFile(DATA_FILE, JSON.stringify(defaultStore(), null, 2), 'utf8');
	}
}

export async function readStore(): Promise<StoreShape> {
	await ensureFile();
	const raw = await fs.readFile(DATA_FILE, 'utf8');
	const parsed = JSON.parse(raw) as StoreShape;
	if (!parsed.resume) {
		parsed.resume = { ...defaultResume, _id: 'resume_1' };
		await writeStore(parsed);
	}
	return parsed;
}

export async function writeStore(store: StoreShape) {
	await ensureFile();
	await fs.writeFile(DATA_FILE, JSON.stringify(store, null, 2), 'utf8');
}

export async function listLocal(
	collection: keyof Omit<StoreShape, 'profile' | 'resume'>
) {
	const store = await readStore();
	return store[collection] || [];
}

export async function getLocalProfile() {
	const store = await readStore();
	return store.profile;
}

export async function saveLocalProfile(profile: Record<string, unknown>) {
	const store = await readStore();
	store.profile = { ...store.profile, ...profile, _id: store.profile._id || 'profile_1' };
	await writeStore(store);
	return store.profile;
}

export async function getLocalResume() {
	const store = await readStore();
	if (!store.resume) {
		store.resume = { ...defaultResume, _id: 'resume_1' };
		await writeStore(store);
	}
	return store.resume;
}

export async function saveLocalResume(resume: Record<string, unknown>) {
	const store = await readStore();
	store.resume = {
		...defaultResume,
		...store.resume,
		...resume,
		_id: store.resume?._id || 'resume_1',
	};
	await writeStore(store);
	return store.resume;
}

export async function createLocal(
	collection: keyof Omit<StoreShape, 'profile' | 'resume'>,
	item: Record<string, unknown>
) {
	const store = await readStore();
	const created = {
		...item,
		_id: `${collection}_${Date.now()}`,
	};
	store[collection] = [...(store[collection] || []), created];
	await writeStore(store);
	return created;
}

export async function updateLocal(
	collection: keyof Omit<StoreShape, 'profile' | 'resume'>,
	id: string,
	item: Record<string, unknown>
) {
	const store = await readStore();
	const list = store[collection] || [];
	const index = list.findIndex((row) => String(row._id) === String(id));
	if (index === -1) return null;
	list[index] = { ...list[index], ...item, _id: id };
	store[collection] = list;
	await writeStore(store);
	return list[index];
}

export async function deleteLocal(
	collection: keyof Omit<StoreShape, 'profile' | 'resume'>,
	id: string
) {
	const store = await readStore();
	const before = store[collection]?.length || 0;
	store[collection] = (store[collection] || []).filter((row) => String(row._id) !== String(id));
	await writeStore(store);
	return (store[collection]?.length || 0) < before;
}

export async function resetLocalStore() {
	await fs.mkdir(DATA_DIR, { recursive: true });
	const store = defaultStore();
	await fs.writeFile(DATA_FILE, JSON.stringify(store, null, 2), 'utf8');
	return store;
}
