'use client';

import type { RefObject } from 'react';
import type { ResumeData } from '@/types/resume';
import { ClassicTemplate } from '@/components/resume/templates/classic-template';
import { ModernTemplate } from '@/components/resume/templates/modern-template';
import { ExecutiveTemplate } from '@/components/resume/templates/executive-template';

export function ResumePreview({
	data,
	previewRef,
}: {
	data: ResumeData;
	previewRef?: RefObject<HTMLDivElement | null>;
}) {
	return (
		<div
			ref={previewRef}
			id="resume-preview-sheet"
			className="bg-white text-black shadow-2xl mx-auto overflow-hidden"
			style={{
				width: '794px',
				minHeight: '1123px',
				padding: data.template === 'modern' || data.template === 'executive' ? 0 : '40px 48px',
			}}
		>
			{data.template === 'classic' && <ClassicTemplate data={data} />}
			{data.template === 'modern' && <ModernTemplate data={data} />}
			{data.template === 'executive' && <ExecutiveTemplate data={data} />}
		</div>
	);
}
