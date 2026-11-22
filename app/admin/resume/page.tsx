'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
	ArrowLeft,
	Download,
	Plus,
	RefreshCw,
	Save,
	Trash2,
} from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResumePreview } from '@/components/resume/resume-preview';
import { defaultResume, TEMPLATE_OPTIONS } from '@/lib/resume-defaults';
import { downloadResumePdf } from '@/lib/download-resume-pdf';
import type {
	ResumeData,
	ResumeEducation,
	ResumeExperience,
	ResumeProject,
	ResumeTemplateId,
} from '@/types/resume';

export default function AdminResumePage() {
	const router = useRouter();
	const previewRef = useRef<HTMLDivElement>(null);
	const [ready, setReady] = useState(false);
	const [saving, setSaving] = useState(false);
	const [downloading, setDownloading] = useState(false);
	const [data, setData] = useState<ResumeData>(defaultResume);

	useEffect(() => {
		fetch('/api/auth/me')
			.then((res) => res.json())
			.then(async (auth) => {
				if (!auth.authenticated) {
					router.replace('/admin');
					return;
				}
				try {
					const res = await fetch('/api/resume', { cache: 'no-store' });
					const resume = await res.json();
					if (resume && resume.name) {
						setData({ ...defaultResume, ...resume });
					}
				} catch {
					toast.error('Could not load resume, using defaults');
				}
				setReady(true);
			});
	}, [router]);

	function update<K extends keyof ResumeData>(key: K, value: ResumeData[K]) {
		setData((prev) => ({ ...prev, [key]: value }));
	}

	function setTemplate(template: ResumeTemplateId) {
		update('template', template);
	}

	async function saveResume() {
		setSaving(true);
		try {
			const res = await fetch('/api/resume', {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			});
			if (!res.ok) throw new Error('Save failed');
			const saved = await res.json();
			setData({ ...defaultResume, ...saved });
			toast.success('Resume saved');
		} catch {
			toast.error('Failed to save resume');
		} finally {
			setSaving(false);
		}
	}

	async function handleDownload() {
		if (!previewRef.current) return;
		setDownloading(true);
		try {
			const safeName = (data.name || 'resume').replace(/\s+/g, '-').toLowerCase();
			const result = await downloadResumePdf(
				previewRef.current,
				`${safeName}-${data.template}.pdf`
			);
			const sizeMb = (result.bytes / (1024 * 1024)).toFixed(2);
			toast.success(`1-page PDF downloaded (${sizeMb} MB / max 2 MB)`);
		} catch (err) {
			toast.error(
				err instanceof Error ? err.message : 'PDF download failed (must be under 2 MB)'
			);
		} finally {
			setDownloading(false);
		}
	}

	function resetToDefault() {
		if (!confirm('Reset form to default resume content from your PDF?')) return;
		setData({ ...defaultResume, template: data.template });
		toast.message('Reset to default content');
	}

	if (!ready) {
		return (
			<div className="min-h-screen grid place-items-center bg-[#0b1020] text-white">
				Loading resume builder...
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-[#0b1020] text-white">
			<header className="border-b border-white/10 sticky top-0 z-20 bg-[#0b1020]/95 backdrop-blur">
				<div className="container mx-auto px-4 h-16 flex items-center justify-between gap-3 flex-wrap py-2">
					<div className="flex items-center gap-3">
						<Button variant="outline" size="sm" asChild>
							<Link href="/admin/dashboard">
								<ArrowLeft className="h-4 w-4 mr-1" />
								Dashboard
							</Link>
						</Button>
						<div>
							<p className="text-xs uppercase tracking-[0.2em] text-sky-300">
								Resume Builder
							</p>
							<h1 className="text-lg font-semibold">Create & Download PDF</h1>
						</div>
					</div>
					<div className="flex items-center gap-2 flex-wrap">
						<Button variant="outline" size="sm" onClick={resetToDefault}>
							<RefreshCw className="h-4 w-4 mr-2" />
							Reset Content
						</Button>
						<Button variant="outline" size="sm" onClick={saveResume} disabled={saving}>
							<Save className="h-4 w-4 mr-2" />
							{saving ? 'Saving...' : 'Save'}
						</Button>
						<Button size="sm" onClick={handleDownload} disabled={downloading}>
							<Download className="h-4 w-4 mr-2" />
							{downloading ? 'Preparing PDF...' : 'Download PDF'}
						</Button>
					</div>
				</div>
			</header>

			<main className="container mx-auto px-4 py-6 grid xl:grid-cols-[420px_1fr] gap-6 items-start">
				<div className="space-y-4 xl:sticky xl:top-20 xl:max-h-[calc(100vh-6rem)] xl:overflow-y-auto pr-1">
					<Card className="bg-white/5 border-white/10 text-white">
						<CardHeader className="pb-3">
							<CardTitle className="text-base">Choose Template (3 styles)</CardTitle>
						</CardHeader>
						<CardContent className="grid gap-2">
							{TEMPLATE_OPTIONS.map((opt) => (
								<button
									key={opt.id}
									type="button"
									onClick={() => setTemplate(opt.id)}
									className={`text-left rounded-lg border p-3 transition ${
										data.template === opt.id
											? 'border-sky-400 bg-sky-500/15'
											: 'border-white/10 bg-black/20 hover:border-white/25'
									}`}
								>
									<p className="font-semibold text-sm">{opt.label}</p>
									<p className="text-xs text-slate-300 mt-0.5">{opt.description}</p>
								</button>
							))}
						</CardContent>
					</Card>

					<EditorCard title="Header / Contact">
						<Field
							label="Full Name"
							value={data.name}
							onChange={(v) => update('name', v)}
						/>
						<Field
							label="Headline"
							value={data.headline}
							onChange={(v) => update('headline', v)}
						/>
						<Field
							label="Location"
							value={data.location}
							onChange={(v) => update('location', v)}
						/>
						<Field
							label="Phone"
							value={data.phone}
							onChange={(v) => update('phone', v)}
						/>
						<Field
							label="Email"
							value={data.email}
							onChange={(v) => update('email', v)}
						/>
						<Field
							label="Website"
							value={data.website}
							onChange={(v) => update('website', v)}
						/>
					</EditorCard>

					<EditorCard title="Professional Summary">
						<Field
							label="Summary"
							textarea
							value={data.summary}
							onChange={(v) => update('summary', v)}
						/>
					</EditorCard>

					<EditorCard
						title="Core Skills"
						action={
							<Button
								size="sm"
								variant="outline"
								onClick={() =>
									update('skillGroups', [
										...data.skillGroups,
										{ category: 'New Category', items: '' },
									])
								}
							>
								<Plus className="h-3.5 w-3.5 mr-1" />
								Add
							</Button>
						}
					>
						{data.skillGroups.map((group, index) => (
							<div
								key={index}
								className="rounded-lg border border-white/10 p-3 space-y-2 relative"
							>
								<Button
									size="icon"
									variant="ghost"
									className="absolute right-1 top-1 h-7 w-7 text-red-300"
									onClick={() =>
										update(
											'skillGroups',
											data.skillGroups.filter((_, i) => i !== index)
										)
									}
								>
									<Trash2 className="h-3.5 w-3.5" />
								</Button>
								<Field
									label="Category"
									value={group.category}
									onChange={(v) => {
										const next = [...data.skillGroups];
										next[index] = { ...group, category: v };
										update('skillGroups', next);
									}}
								/>
								<Field
									label="Items"
									value={group.items}
									onChange={(v) => {
										const next = [...data.skillGroups];
										next[index] = { ...group, items: v };
										update('skillGroups', next);
									}}
								/>
							</div>
						))}
					</EditorCard>

					<EditorCard
						title="Experience"
						action={
							<Button
								size="sm"
								variant="outline"
								onClick={() =>
									update('experiences', [
										...data.experiences,
										{
											title: '',
											company: '',
											startDate: '',
											endDate: '',
											bullets: [''],
										},
									])
								}
							>
								<Plus className="h-3.5 w-3.5 mr-1" />
								Add
							</Button>
						}
					>
						{data.experiences.map((exp, index) => (
							<ExperienceEditor
								key={index}
								exp={exp}
								onChange={(next) => {
									const list = [...data.experiences];
									list[index] = next;
									update('experiences', list);
								}}
								onRemove={() =>
									update(
										'experiences',
										data.experiences.filter((_, i) => i !== index)
									)
								}
							/>
						))}
					</EditorCard>

					<EditorCard
						title="Projects"
						action={
							<Button
								size="sm"
								variant="outline"
								onClick={() =>
									update('projects', [
										...data.projects,
										{ name: '', description: '' },
									])
								}
							>
								<Plus className="h-3.5 w-3.5 mr-1" />
								Add
							</Button>
						}
					>
						{data.projects.map((project, index) => (
							<div
								key={index}
								className="rounded-lg border border-white/10 p-3 space-y-2 relative"
							>
								<Button
									size="icon"
									variant="ghost"
									className="absolute right-1 top-1 h-7 w-7 text-red-300"
									onClick={() =>
										update(
											'projects',
											data.projects.filter((_, i) => i !== index)
										)
									}
								>
									<Trash2 className="h-3.5 w-3.5" />
								</Button>
								<Field
									label="Name"
									value={project.name}
									onChange={(v) => {
										const next = [...data.projects] as ResumeProject[];
										next[index] = { ...project, name: v };
										update('projects', next);
									}}
								/>
								<Field
									label="Description"
									value={project.description}
									onChange={(v) => {
										const next = [...data.projects] as ResumeProject[];
										next[index] = { ...project, description: v };
										update('projects', next);
									}}
								/>
							</div>
						))}
					</EditorCard>

					<EditorCard
						title="Education"
						action={
							<Button
								size="sm"
								variant="outline"
								onClick={() =>
									update('education', [
										...data.education,
										{
											degree: '',
											institution: '',
											startDate: '',
											endDate: '',
											score: '',
										},
									])
								}
							>
								<Plus className="h-3.5 w-3.5 mr-1" />
								Add
							</Button>
						}
					>
						{data.education.map((edu, index) => (
							<div
								key={index}
								className="rounded-lg border border-white/10 p-3 space-y-2 relative"
							>
								<Button
									size="icon"
									variant="ghost"
									className="absolute right-1 top-1 h-7 w-7 text-red-300"
									onClick={() =>
										update(
											'education',
											data.education.filter((_, i) => i !== index)
										)
									}
								>
									<Trash2 className="h-3.5 w-3.5" />
								</Button>
								{(
									[
										['degree', 'Degree'],
										['institution', 'Institution'],
										['startDate', 'Start'],
										['endDate', 'End'],
										['score', 'Score / GPA'],
									] as const
								).map(([key, label]) => (
									<Field
										key={key}
										label={label}
										value={edu[key]}
										onChange={(v) => {
											const next = [...data.education] as ResumeEducation[];
											next[index] = { ...edu, [key]: v };
											update('education', next);
										}}
									/>
								))}
							</div>
						))}
					</EditorCard>

					<EditorCard title="Achievements">
						<Field
							label="One per line"
							textarea
							value={data.achievements.join('\n')}
							onChange={(v) =>
								update(
									'achievements',
									v
										.split('\n')
										.map((x) => x.trim())
										.filter(Boolean)
								)
							}
						/>
					</EditorCard>
				</div>

				<div className="overflow-x-auto pb-8">
					<p className="text-sm text-slate-300 mb-3">
						Live preview — template:{' '}
						<span className="text-sky-300 font-medium capitalize">{data.template}</span>
					</p>
					<div className="origin-top-left scale-[0.55] sm:scale-[0.7] lg:scale-[0.85] xl:scale-100 w-fit pointer-events-none">
						<ResumePreview data={data} />
					</div>
				</div>
			</main>

			{/* Full-size off-screen sheet used for PDF capture (avoids CSS scale distortion) */}
			<div
				aria-hidden
				className="fixed left-[-10000px] top-0 pointer-events-none"
			>
				<ResumePreview data={data} previewRef={previewRef} />
			</div>
		</div>
	);
}

function EditorCard({
	title,
	children,
	action,
}: {
	title: string;
	children: React.ReactNode;
	action?: React.ReactNode;
}) {
	return (
		<Card className="bg-white/5 border-white/10 text-white">
			<CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
				<CardTitle className="text-base">{title}</CardTitle>
				{action}
			</CardHeader>
			<CardContent className="space-y-3">{children}</CardContent>
		</Card>
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
		<div className="space-y-1.5">
			<Label className="text-slate-300">{label}</Label>
			{textarea ? (
				<Textarea
					value={value || ''}
					onChange={(e) => onChange(e.target.value)}
					className="bg-black/30 border-white/10 min-h-[90px]"
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

function ExperienceEditor({
	exp,
	onChange,
	onRemove,
}: {
	exp: ResumeExperience;
	onChange: (exp: ResumeExperience) => void;
	onRemove: () => void;
}) {
	return (
		<div className="rounded-lg border border-white/10 p-3 space-y-2 relative">
			<Button
				size="icon"
				variant="ghost"
				className="absolute right-1 top-1 h-7 w-7 text-red-300"
				onClick={onRemove}
			>
				<Trash2 className="h-3.5 w-3.5" />
			</Button>
			<Field
				label="Title"
				value={exp.title}
				onChange={(v) => onChange({ ...exp, title: v })}
			/>
			<Field
				label="Company"
				value={exp.company}
				onChange={(v) => onChange({ ...exp, company: v })}
			/>
			<div className="grid grid-cols-2 gap-2">
				<Field
					label="Start"
					value={exp.startDate}
					onChange={(v) => onChange({ ...exp, startDate: v })}
				/>
				<Field
					label="End"
					value={exp.endDate}
					onChange={(v) => onChange({ ...exp, endDate: v })}
				/>
			</div>
			<Field
				label="Bullets (one per line)"
				textarea
				value={exp.bullets.join('\n')}
				onChange={(v) =>
					onChange({
						...exp,
						bullets: v.split('\n').map((x) => x.trim()).filter(Boolean),
					})
				}
			/>
		</div>
	);
}
