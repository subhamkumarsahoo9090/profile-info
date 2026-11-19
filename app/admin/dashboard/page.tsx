'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogOut, Plus, Pencil, Trash2, RefreshCw, Save } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

type AnyItem = Record<string, any> & { _id?: string };

const SECTIONS = [
	{ key: 'projects', label: 'Projects', endpoint: '/api/projects' },
	{ key: 'experiences', label: 'Experience', endpoint: '/api/experiences' },
	{ key: 'education', label: 'Education', endpoint: '/api/education' },
	{ key: 'skills', label: 'Skills', endpoint: '/api/skills' },
	{ key: 'certificates', label: 'Certificates', endpoint: '/api/certificates' },
	{ key: 'blogs', label: 'Blog', endpoint: '/api/blogs' },
] as const;

const emptyForms: Record<string, AnyItem> = {
	projects: {
		title: '',
		description: '',
		image: '',
		tags: '',
		link: '',
		repo: '',
		featured: false,
		order: 0,
	},
	experiences: {
		title: '',
		company: '',
		location: '',
		startDate: '',
		endDate: '',
		description: '',
		technologies: '',
		order: 0,
	},
	education: {
		degree: '',
		field: '',
		institution: '',
		location: '',
		startDate: '',
		endDate: '',
		gpa: '',
		achievements: '',
		order: 0,
	},
	skills: { name: '', level: 7, category: 'technical', order: 0 },
	certificates: { title: '', issuer: '', date: '', id: '', url: '', order: 0 },
	blogs: {
		title: '',
		excerpt: '',
		date: '',
		author: 'Subham Kumar Sahoo',
		image: '',
		slug: '',
		order: 0,
	},
};

function toPayload(section: string, form: AnyItem) {
	const payload = { ...form };
	delete payload._id;

	if (section === 'projects') {
		payload.tags = String(form.tags || '')
			.split(',')
			.map((t: string) => t.trim())
			.filter(Boolean);
		payload.featured = Boolean(form.featured);
		payload.order = Number(form.order || 0);
	}
	if (section === 'experiences') {
		payload.description = String(form.description || '')
			.split('\n')
			.map((t: string) => t.trim())
			.filter(Boolean);
		payload.technologies = String(form.technologies || '')
			.split(',')
			.map((t: string) => t.trim())
			.filter(Boolean);
		payload.order = Number(form.order || 0);
	}
	if (section === 'education') {
		payload.achievements = String(form.achievements || '')
			.split('\n')
			.map((t: string) => t.trim())
			.filter(Boolean);
		payload.order = Number(form.order || 0);
	}
	if (section === 'skills') {
		payload.level = Number(form.level || 1);
		payload.order = Number(form.order || 0);
	}
	if (section === 'certificates' || section === 'blogs') {
		payload.order = Number(form.order || 0);
	}
	return payload;
}

function fromItem(section: string, item: AnyItem): AnyItem {
	if (section === 'projects') {
		return { ...item, tags: (item.tags || []).join(', ') };
	}
	if (section === 'experiences') {
		return {
			...item,
			description: (item.description || []).join('\n'),
			technologies: (item.technologies || []).join(', '),
		};
	}
	if (section === 'education') {
		return { ...item, achievements: (item.achievements || []).join('\n') };
	}
	return { ...item };
}

export default function AdminDashboardPage() {
	const router = useRouter();
	const [ready, setReady] = useState(false);
	const [active, setActive] = useState<string>('projects');
	const [items, setItems] = useState<Record<string, AnyItem[]>>({});
	const [profile, setProfile] = useState<AnyItem>({});
	const [open, setOpen] = useState(false);
	const [editing, setEditing] = useState<AnyItem | null>(null);
	const [form, setForm] = useState<AnyItem>(emptyForms.projects);
	const [saving, setSaving] = useState(false);

	const endpoint = useMemo(
		() => SECTIONS.find((s) => s.key === active)?.endpoint || '/api/projects',
		[active]
	);

	useEffect(() => {
		fetch('/api/auth/me')
			.then((res) => res.json())
			.then((data) => {
				if (!data.authenticated) {
					router.replace('/admin');
					return;
				}
				setReady(true);
				loadAll();
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router]);

	async function loadAll() {
		try {
			const results = await Promise.all(
				SECTIONS.map(async (section) => {
					const res = await fetch(section.endpoint, { cache: 'no-store' });
					const data = await res.json();
					return [section.key, Array.isArray(data) ? data : []] as const;
				})
			);
			setItems(Object.fromEntries(results));

			const profileRes = await fetch('/api/profile', { cache: 'no-store' });
			const profileData = await profileRes.json();
			setProfile(profileData || {});
		} catch {
			toast.error('Failed to load admin data');
		}
	}

	function openCreate(sectionKey = active) {
		setActive(sectionKey);
		setEditing(null);
		setForm({ ...emptyForms[sectionKey] });
		setOpen(true);
	}

	function openEdit(sectionKey: string, item: AnyItem) {
		setActive(sectionKey);
		setEditing(item);
		setForm(fromItem(sectionKey, item));
		setOpen(true);
	}

	async function saveItem() {
		setSaving(true);
		try {
			const payload = toPayload(active, form);
			const url = editing?._id ? `${endpoint}/${editing._id}` : endpoint;
			const method = editing?._id ? 'PUT' : 'POST';
			const res = await fetch(url, {
				method,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			});
			if (!res.ok) {
				const err = await res.json();
				throw new Error(err.error || 'Save failed');
			}
			toast.success(editing ? 'Updated' : 'Created');
			setOpen(false);
			await loadAll();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : 'Save failed');
		} finally {
			setSaving(false);
		}
	}

	async function removeItem(sectionKey: string, id: string) {
		if (!confirm('Delete this item?')) return;
		const sectionEndpoint =
			SECTIONS.find((s) => s.key === sectionKey)?.endpoint || endpoint;
		const res = await fetch(`${sectionEndpoint}/${id}`, { method: 'DELETE' });
		if (!res.ok) {
			toast.error('Delete failed');
			return;
		}
		toast.success('Deleted');
		await loadAll();
	}

	async function saveProfile() {
		setSaving(true);
		try {
			const res = await fetch('/api/profile', {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					...profile,
					achievements: Array.isArray(profile.achievements)
						? profile.achievements
						: String(profile.achievements || '')
								.split('\n')
								.map((x: string) => x.trim())
								.filter(Boolean),
					links: profile.links || {},
				}),
			});
			if (!res.ok) throw new Error('Profile save failed');
			toast.success('Profile updated');
			await loadAll();
		} catch {
			toast.error('Profile save failed');
		} finally {
			setSaving(false);
		}
	}

	async function logout() {
		await fetch('/api/auth/logout', { method: 'POST' });
		router.replace('/admin');
	}

	async function reseed() {
		if (!confirm('Reset database to resume seed data?')) return;
		const res = await fetch('/api/seed?force=true', { method: 'POST' });
		if (!res.ok) {
			toast.error('Reseed failed');
			return;
		}
		toast.success('Database re-seeded');
		await loadAll();
	}

	if (!ready) {
		return (
			<div className="min-h-screen grid place-items-center bg-[#0b1020] text-white">
				Loading admin...
			</div>
		);
	}

	const list = items[active] || [];

	return (
		<div className="min-h-screen bg-[#0b1020] text-white">
			<header className="border-b border-white/10 sticky top-0 z-20 bg-[#0b1020]/90 backdrop-blur">
				<div className="container mx-auto px-4 h-16 flex items-center justify-between">
					<div>
						<p className="text-xs uppercase tracking-[0.2em] text-sky-300">subham.dev</p>
						<h1 className="text-lg font-semibold">Admin Dashboard</h1>
					</div>
					<div className="flex items-center gap-2">
						<Button variant="outline" size="sm" onClick={loadAll}>
							<RefreshCw className="h-4 w-4 mr-2" />
							Refresh
						</Button>
						<Button variant="outline" size="sm" onClick={reseed}>
							Reset Seed
						</Button>
						<Button variant="outline" size="sm" asChild>
							<Link href="/">View Site</Link>
						</Button>
						<Button variant="destructive" size="sm" onClick={logout}>
							<LogOut className="h-4 w-4 mr-2" />
							Logout
						</Button>
					</div>
				</div>
			</header>

			<main className="container mx-auto px-4 py-8">
				<Tabs value={active} onValueChange={setActive}>
					<TabsList className="flex flex-wrap h-auto gap-1 bg-white/5 p-1">
						<TabsTrigger value="profile">Profile</TabsTrigger>
						{SECTIONS.map((section) => (
							<TabsTrigger key={section.key} value={section.key}>
								{section.label}
							</TabsTrigger>
						))}
					</TabsList>

					<TabsContent value="profile" className="mt-6">
						<Card className="bg-white/5 border-white/10 text-white">
							<CardHeader>
								<CardTitle>Profile / Hero Content</CardTitle>
							</CardHeader>
							<CardContent className="grid gap-4 md:grid-cols-2">
								{[
									['name', 'Name'],
									['headline', 'Headline'],
									['tagline', 'Tagline'],
									['location', 'Location'],
									['email', 'Email'],
									['phone', 'Phone'],
									['website', 'Website'],
									['image', 'Image URL'],
								].map(([key, label]) => (
									<div key={key} className="space-y-2">
										<Label>{label}</Label>
										<Input
											value={profile[key] || ''}
											onChange={(e) =>
												setProfile((p) => ({ ...p, [key]: e.target.value }))
											}
											className="bg-black/30 border-white/10"
										/>
									</div>
								))}
								<div className="space-y-2 md:col-span-2">
									<Label>Summary</Label>
									<Textarea
										value={profile.summary || ''}
										onChange={(e) =>
											setProfile((p) => ({ ...p, summary: e.target.value }))
										}
										className="bg-black/30 border-white/10 min-h-[100px]"
									/>
								</div>
								<div className="space-y-2 md:col-span-2">
									<Label>About</Label>
									<Textarea
										value={profile.about || ''}
										onChange={(e) => setProfile((p) => ({ ...p, about: e.target.value }))}
										className="bg-black/30 border-white/10 min-h-[100px]"
									/>
								</div>
								<div className="space-y-2 md:col-span-2">
									<Label>Journey</Label>
									<Textarea
										value={profile.journey || ''}
										onChange={(e) =>
											setProfile((p) => ({ ...p, journey: e.target.value }))
										}
										className="bg-black/30 border-white/10 min-h-[100px]"
									/>
								</div>
								<div className="space-y-2 md:col-span-2">
									<Label>Achievements (one per line)</Label>
									<Textarea
										value={
											Array.isArray(profile.achievements)
												? profile.achievements.join('\n')
												: profile.achievements || ''
										}
										onChange={(e) =>
											setProfile((p) => ({ ...p, achievements: e.target.value }))
										}
										className="bg-black/30 border-white/10 min-h-[100px]"
									/>
								</div>
								<div className="md:col-span-2">
									<Button onClick={saveProfile} disabled={saving}>
										<Save className="h-4 w-4 mr-2" />
										Save Profile
									</Button>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					{SECTIONS.map((section) => (
						<TabsContent key={section.key} value={section.key} className="mt-6">
							<div className="flex items-center justify-between mb-4">
								<h2 className="text-xl font-semibold">{section.label}</h2>
								<Button onClick={() => openCreate(section.key)}>
									<Plus className="h-4 w-4 mr-2" />
									Add New
								</Button>
							</div>

							<div className="grid gap-4">
								{(items[section.key] || []).map((item) => (
									<Card
										key={item._id}
										className="bg-white/5 border-white/10 text-white"
									>
										<CardContent className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
											<div>
												<p className="font-semibold text-lg">
													{item.title || item.name || item.degree}
												</p>
												<p className="text-sm text-slate-300 line-clamp-2">
													{item.description ||
														item.excerpt ||
														item.company ||
														item.institution ||
														item.category ||
														item.issuer}
												</p>
											</div>
											<div className="flex gap-2">
												<Button
													size="sm"
													variant="outline"
													onClick={() => openEdit(section.key, item)}
												>
													<Pencil className="h-4 w-4 mr-1" />
													Edit
												</Button>
												<Button
													size="sm"
													variant="destructive"
													onClick={() => item._id && removeItem(section.key, item._id)}
												>
													<Trash2 className="h-4 w-4 mr-1" />
													Delete
												</Button>
											</div>
										</CardContent>
									</Card>
								))}
								{list.length === 0 && active === section.key && (
									<p className="text-slate-400">No items yet. Add your first one.</p>
								)}
							</div>
						</TabsContent>
					))}
				</Tabs>
			</main>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="max-h-[90vh] overflow-y-auto bg-[#111827] text-white border-white/10">
					<DialogHeader>
						<DialogTitle>
							{editing ? 'Edit' : 'Add'} {active}
						</DialogTitle>
					</DialogHeader>

					<div className="grid gap-3 py-2">
						{active === 'projects' && (
							<>
								<Field label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
								<Field label="Description" textarea value={form.description} onChange={(v) => setForm({ ...form, description: v })} />
								<Field label="Image URL" value={form.image} onChange={(v) => setForm({ ...form, image: v })} />
								<Field label="Tags (comma separated)" value={form.tags} onChange={(v) => setForm({ ...form, tags: v })} />
								<Field label="Live Link" value={form.link} onChange={(v) => setForm({ ...form, link: v })} />
								<Field label="Repo Link" value={form.repo} onChange={(v) => setForm({ ...form, repo: v })} />
								<Field label="Order" value={String(form.order ?? 0)} onChange={(v) => setForm({ ...form, order: v })} />
								<label className="flex items-center gap-2 text-sm">
									<input
										type="checkbox"
										checked={Boolean(form.featured)}
										onChange={(e) => setForm({ ...form, featured: e.target.checked })}
									/>
									Featured
								</label>
							</>
						)}

						{active === 'experiences' && (
							<>
								<Field label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
								<Field label="Company" value={form.company} onChange={(v) => setForm({ ...form, company: v })} />
								<Field label="Location" value={form.location} onChange={(v) => setForm({ ...form, location: v })} />
								<Field label="Start Date" value={form.startDate} onChange={(v) => setForm({ ...form, startDate: v })} />
								<Field label="End Date" value={form.endDate} onChange={(v) => setForm({ ...form, endDate: v })} />
								<Field label="Description (one per line)" textarea value={form.description} onChange={(v) => setForm({ ...form, description: v })} />
								<Field label="Technologies (comma separated)" value={form.technologies} onChange={(v) => setForm({ ...form, technologies: v })} />
								<Field label="Order" value={String(form.order ?? 0)} onChange={(v) => setForm({ ...form, order: v })} />
							</>
						)}

						{active === 'education' && (
							<>
								<Field label="Degree" value={form.degree} onChange={(v) => setForm({ ...form, degree: v })} />
								<Field label="Field" value={form.field} onChange={(v) => setForm({ ...form, field: v })} />
								<Field label="Institution" value={form.institution} onChange={(v) => setForm({ ...form, institution: v })} />
								<Field label="Location" value={form.location} onChange={(v) => setForm({ ...form, location: v })} />
								<Field label="Start Date" value={form.startDate} onChange={(v) => setForm({ ...form, startDate: v })} />
								<Field label="End Date" value={form.endDate} onChange={(v) => setForm({ ...form, endDate: v })} />
								<Field label="GPA" value={form.gpa} onChange={(v) => setForm({ ...form, gpa: v })} />
								<Field label="Achievements (one per line)" textarea value={form.achievements} onChange={(v) => setForm({ ...form, achievements: v })} />
							</>
						)}

						{active === 'skills' && (
							<>
								<Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
								<Field label="Level (1-10)" value={String(form.level ?? 7)} onChange={(v) => setForm({ ...form, level: v })} />
								<div className="space-y-2">
									<Label>Category</Label>
									<Select
										value={form.category}
										onValueChange={(v) => setForm({ ...form, category: v })}
									>
										<SelectTrigger className="bg-black/30 border-white/10">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="technical">technical</SelectItem>
											<SelectItem value="software">software</SelectItem>
											<SelectItem value="soft">soft</SelectItem>
											<SelectItem value="language">language</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</>
						)}

						{active === 'certificates' && (
							<>
								<Field label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
								<Field label="Issuer" value={form.issuer} onChange={(v) => setForm({ ...form, issuer: v })} />
								<Field label="Date" value={form.date} onChange={(v) => setForm({ ...form, date: v })} />
								<Field label="ID" value={form.id} onChange={(v) => setForm({ ...form, id: v })} />
								<Field label="URL" value={form.url} onChange={(v) => setForm({ ...form, url: v })} />
							</>
						)}

						{active === 'blogs' && (
							<>
								<Field label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
								<Field label="Excerpt" textarea value={form.excerpt} onChange={(v) => setForm({ ...form, excerpt: v })} />
								<Field label="Date" value={form.date} onChange={(v) => setForm({ ...form, date: v })} />
								<Field label="Author" value={form.author} onChange={(v) => setForm({ ...form, author: v })} />
								<Field label="Image URL" value={form.image} onChange={(v) => setForm({ ...form, image: v })} />
								<Field label="Slug" value={form.slug} onChange={(v) => setForm({ ...form, slug: v })} />
							</>
						)}
					</div>

					<DialogFooter>
						<Button variant="outline" onClick={() => setOpen(false)}>
							Cancel
						</Button>
						<Button onClick={saveItem} disabled={saving}>
							{saving ? 'Saving...' : 'Save'}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}

function Field({
	label,
	value,
	onChange,
	textarea,
}: {
	label: string;
	value: string;
	onChange: (v: string) => void;
	textarea?: boolean;
}) {
	return (
		<div className="space-y-2">
			<Label>{label}</Label>
			{textarea ? (
				<Textarea
					value={value || ''}
					onChange={(e) => onChange(e.target.value)}
					className="bg-black/30 border-white/10 min-h-[100px]"
				/>
			) : (
				<Input
					value={value || ''}
					onChange={(e) => onChange(e.target.value)}
					className="bg-black/30 border-white/10"
				/>
			)}
		</div>
	);
}
