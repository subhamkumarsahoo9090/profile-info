'use client';

import type { Ref } from 'react';
import type { ResumeData } from '@/types/resume';
import { ClassicTemplate } from '@/components/resume/templates/classic-template';
import { ModernTemplate } from '@/components/resume/templates/modern-template';
import { ExecutiveTemplate } from '@/components/resume/templates/executive-template';

export function ResumePreview({
	data,
	previewRef,
}: {
	data: ResumeData;
	previewRef?: Ref<HTMLDivElement>;
}) {
	return (
		<div
			ref={previewRef}
			id="resume-preview-sheet"
			className="bg-white text-black shadow-2xl mx-auto overflow-hidden"
			style={{
				width: '794px',
				height: '1123px',
				minHeight: '1123px',
				maxHeight: '1123px',
				padding: data.template === 'modern' || data.template === 'executive' ? 0 : '36px 44px',
			}}
		>
			{data.template === 'classic' && <ClassicTemplate data={data} />}
			{data.template === 'modern' && <ModernTemplate data={data} />}
			{data.template === 'executive' && <ExecutiveTemplate data={data} />}
		</div>
	);
}
