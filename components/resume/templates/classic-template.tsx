import type { ResumeData } from '@/types/resume';

function SectionTitle({ children }: { children: React.ReactNode }) {
	return (
		<div className="mt-3 mb-1.5">
			<h2 className="text-[11px] font-bold uppercase tracking-[0.08em] text-black">
				{children}
			</h2>
			<div className="h-[1.5px] bg-black mt-0.5" />
		</div>
	);
}

export function ClassicTemplate({ data }: { data: ResumeData }) {
	const contact = [data.location, data.phone, data.email, data.website]
		.filter(Boolean)
		.join(' • ');

	return (
		<div
			className="bg-white text-black font-serif leading-snug"
			style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: '10.5px' }}
		>
			<header className="text-center pb-1">
				<h1 className="text-[22px] font-bold tracking-tight leading-tight">{data.name}</h1>
				<p className="text-[11px] mt-0.5 text-neutral-800">{data.headline}</p>
				<p className="text-[10px] mt-1 text-neutral-700">{contact}</p>
			</header>

			<SectionTitle>Professional Summary</SectionTitle>
			<p className="text-justify text-[10.5px] leading-[1.35]">{data.summary}</p>

			<SectionTitle>Core Skills</SectionTitle>
			<div className="space-y-0.5">
				{data.skillGroups.map((group) => (
					<div key={group.category} className="grid grid-cols-[110px_1fr] gap-x-2">
						<span className="font-semibold">{group.category}</span>
						<span>{group.items}</span>
					</div>
				))}
			</div>

			<SectionTitle>Professional Experience</SectionTitle>
			<div className="space-y-2">
				{data.experiences.map((exp, i) => (
					<div key={`${exp.company}-${i}`}>
						<div className="flex justify-between gap-2 items-baseline">
							<p className="font-bold text-[11px]">
								{exp.company} — {exp.title}
							</p>
							<p className="text-[10px] whitespace-nowrap shrink-0">
								{exp.startDate} – {exp.endDate}
							</p>
						</div>
						<ul className="mt-0.5 list-disc pl-4 space-y-0.5">
							{exp.bullets.map((bullet, bi) => (
								<li key={bi} className="text-justify">
									{bullet}
								</li>
							))}
						</ul>
					</div>
				))}
			</div>

			<SectionTitle>Selected Projects</SectionTitle>
			<div className="space-y-0.5">
				{data.projects.map((project) => (
					<p key={project.name}>
						<span className="font-semibold">{project.name}</span>
						{' — '}
						{project.description}
					</p>
				))}
			</div>

			<SectionTitle>Education</SectionTitle>
			<div className="space-y-0.5">
				{data.education.map((edu) => (
					<div key={edu.degree} className="flex justify-between gap-2">
						<p>
							<span className="font-semibold">{edu.degree}</span> {edu.institution}
						</p>
						<p className="whitespace-nowrap">
							{edu.startDate}–{edu.endDate} {edu.score}
						</p>
					</div>
				))}
			</div>

			{data.achievements.length > 0 && (
				<>
					<SectionTitle>Achievements</SectionTitle>
					<p>{data.achievements.map((a) => `• ${a}`).join('  ')}</p>
				</>
			)}
		</div>
	);
}
