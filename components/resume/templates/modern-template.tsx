import type { ResumeData } from '@/types/resume';

export function ModernTemplate({ data }: { data: ResumeData }) {
	return (
		<div
			className="bg-white text-neutral-900 flex min-h-[1122px]"
			style={{ fontFamily: 'Calibri, "Segoe UI", Arial, sans-serif', fontSize: '10.5px' }}
		>
			<aside className="w-[32%] bg-[#1e293b] text-white p-5 flex flex-col gap-5">
				<div>
					<h1 className="text-[18px] font-bold leading-tight tracking-tight">{data.name}</h1>
					<p className="text-[10px] text-sky-200 mt-1.5 leading-snug">{data.headline}</p>
				</div>

				<section>
					<h2 className="text-[10px] font-bold uppercase tracking-[0.14em] text-sky-300 border-b border-white/20 pb-1 mb-2">
						Contact
					</h2>
					<ul className="space-y-1.5 text-[10px] text-slate-200 break-words">
						{data.location && <li>{data.location}</li>}
						{data.phone && <li>{data.phone}</li>}
						{data.email && <li>{data.email}</li>}
						{data.website && <li>{data.website}</li>}
					</ul>
				</section>

				<section>
					<h2 className="text-[10px] font-bold uppercase tracking-[0.14em] text-sky-300 border-b border-white/20 pb-1 mb-2">
						Skills
					</h2>
					<div className="space-y-2.5">
						{data.skillGroups.map((group) => (
							<div key={group.category}>
								<p className="font-semibold text-[10px] text-white">{group.category}</p>
								<p className="text-[9.5px] text-slate-300 leading-snug mt-0.5">
									{group.items}
								</p>
							</div>
						))}
					</div>
				</section>

				<section>
					<h2 className="text-[10px] font-bold uppercase tracking-[0.14em] text-sky-300 border-b border-white/20 pb-1 mb-2">
						Education
					</h2>
					<div className="space-y-2.5">
						{data.education.map((edu) => (
							<div key={edu.degree}>
								<p className="font-semibold text-[10.5px]">{edu.degree}</p>
								<p className="text-[9.5px] text-slate-300">{edu.institution}</p>
								<p className="text-[9px] text-slate-400 mt-0.5">
									{edu.startDate}–{edu.endDate} · {edu.score}
								</p>
							</div>
						))}
					</div>
				</section>
			</aside>

			<main className="flex-1 p-5 pl-6">
				<section>
					<h2 className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#0f172a] border-b-2 border-sky-500 pb-1 mb-2">
						Summary
					</h2>
					<p className="text-justify leading-[1.4] text-neutral-700">{data.summary}</p>
				</section>

				<section className="mt-4">
					<h2 className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#0f172a] border-b-2 border-sky-500 pb-1 mb-2">
						Experience
					</h2>
					<div className="space-y-3">
						{data.experiences.map((exp, i) => (
							<div key={`${exp.company}-${i}`}>
								<div className="flex justify-between gap-2 items-baseline">
									<div>
										<p className="font-bold text-[11.5px] text-[#0f172a]">{exp.title}</p>
										<p className="text-[10.5px] text-sky-700 font-medium">{exp.company}</p>
									</div>
									<p className="text-[9.5px] text-neutral-500 whitespace-nowrap">
										{exp.startDate} – {exp.endDate}
									</p>
								</div>
								<ul className="mt-1 list-disc pl-4 space-y-0.5 text-neutral-700">
									{exp.bullets.map((bullet, bi) => (
										<li key={bi} className="text-justify leading-snug">
											{bullet}
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</section>

				<section className="mt-4">
					<h2 className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#0f172a] border-b-2 border-sky-500 pb-1 mb-2">
						Projects
					</h2>
					<div className="space-y-1.5">
						{data.projects.map((project) => (
							<p key={project.name} className="leading-snug">
								<span className="font-semibold text-[#0f172a]">{project.name}</span>
								<span className="text-neutral-600"> — {project.description}</span>
							</p>
						))}
					</div>
				</section>

				{data.achievements.length > 0 && (
					<section className="mt-4">
						<h2 className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#0f172a] border-b-2 border-sky-500 pb-1 mb-2">
							Achievements
						</h2>
						<ul className="list-disc pl-4 space-y-0.5 text-neutral-700">
							{data.achievements.map((a) => (
								<li key={a}>{a}</li>
							))}
						</ul>
					</section>
				)}
			</main>
		</div>
	);
}
