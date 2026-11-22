import type { ResumeData } from '@/types/resume';

function SectionLabel({ children }: { children: React.ReactNode }) {
	return (
		<h2 className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#b45309] mb-1.5 mt-3.5 first:mt-0">
			{children}
		</h2>
	);
}

export function ExecutiveTemplate({ data }: { data: ResumeData }) {
	return (
		<div
			className="bg-white text-neutral-900 min-h-[1122px]"
			style={{ fontFamily: '"Palatino Linotype", Palatino, Georgia, serif', fontSize: '10.5px' }}
		>
			<header className="bg-[#0c1222] text-white px-6 py-5">
				<h1 className="text-[24px] font-bold tracking-wide leading-none">{data.name}</h1>
				<p className="text-[11px] text-amber-200 mt-2 tracking-wide">{data.headline}</p>
				<div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-[10px] text-slate-300">
					{data.location && <span>{data.location}</span>}
					{data.phone && <span>{data.phone}</span>}
					{data.email && <span>{data.email}</span>}
					{data.website && <span>{data.website}</span>}
				</div>
			</header>

			<div className="h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600" />

			<div className="px-6 py-4">
				<SectionLabel>Professional Summary</SectionLabel>
				<p className="text-justify leading-[1.4] text-neutral-700 border-l-2 border-amber-500 pl-3">
					{data.summary}
				</p>

				<SectionLabel>Core Competencies</SectionLabel>
				<div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
					{data.skillGroups.map((group) => (
						<div key={group.category} className="border border-neutral-200 rounded px-2 py-1.5">
							<p className="text-[9.5px] font-bold uppercase tracking-wider text-[#0c1222]">
								{group.category}
							</p>
							<p className="text-[9.5px] text-neutral-600 leading-snug mt-0.5">{group.items}</p>
						</div>
					))}
				</div>

				<SectionLabel>Professional Experience</SectionLabel>
				<div className="space-y-3">
					{data.experiences.map((exp, i) => (
						<div key={`${exp.company}-${i}`} className="relative pl-3 border-l-2 border-neutral-200">
							<div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-amber-500" />
							<div className="flex justify-between gap-2 items-baseline">
								<div>
									<p className="font-bold text-[12px] text-[#0c1222]">{exp.title}</p>
									<p className="text-[10.5px] text-amber-800 font-medium">{exp.company}</p>
								</div>
								<p className="text-[9.5px] italic text-neutral-500 whitespace-nowrap">
									{exp.startDate} – {exp.endDate}
								</p>
							</div>
							<ul className="mt-1 space-y-0.5">
								{exp.bullets.map((bullet, bi) => (
									<li key={bi} className="text-justify leading-snug text-neutral-700 flex gap-1.5">
										<span className="text-amber-600 shrink-0">▸</span>
										<span>{bullet}</span>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className="grid grid-cols-2 gap-5 mt-1">
					<div>
						<SectionLabel>Selected Projects</SectionLabel>
						<div className="space-y-1.5">
							{data.projects.map((project) => (
								<div key={project.name}>
									<p className="font-semibold text-[#0c1222]">{project.name}</p>
									<p className="text-[9.5px] text-neutral-600 leading-snug">
										{project.description}
									</p>
								</div>
							))}
						</div>
					</div>
					<div>
						<SectionLabel>Education</SectionLabel>
						<div className="space-y-2">
							{data.education.map((edu) => (
								<div key={edu.degree}>
									<p className="font-semibold text-[#0c1222]">
										{edu.degree} · {edu.institution}
									</p>
									<p className="text-[9.5px] text-neutral-500">
										{edu.startDate}–{edu.endDate} · {edu.score}
									</p>
								</div>
							))}
						</div>

						{data.achievements.length > 0 && (
							<>
								<SectionLabel>Achievements</SectionLabel>
								<ul className="space-y-1">
									{data.achievements.map((a) => (
										<li key={a} className="flex gap-1.5 text-neutral-700">
											<span className="text-amber-600">★</span>
											<span>{a}</span>
										</li>
									))}
								</ul>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
