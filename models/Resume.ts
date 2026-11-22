import mongoose, { Schema, models, model } from 'mongoose';
import type { ResumeData } from '@/types/resume';

const ResumeSchema = new Schema<ResumeData>(
	{
		template: {
			type: String,
			enum: ['classic', 'modern', 'executive'],
			default: 'classic',
		},
		name: { type: String, required: true },
		headline: { type: String, required: true },
		location: { type: String, default: '' },
		phone: { type: String, default: '' },
		email: { type: String, default: '' },
		website: { type: String, default: '' },
		summary: { type: String, default: '' },
		skillGroups: [
			{
				category: String,
				items: String,
			},
		],
		experiences: [
			{
				title: String,
				company: String,
				startDate: String,
				endDate: String,
				bullets: [String],
			},
		],
		projects: [
			{
				name: String,
				description: String,
			},
		],
		education: [
			{
				degree: String,
				institution: String,
				startDate: String,
				endDate: String,
				score: String,
			},
		],
		achievements: [{ type: String }],
	},
	{ timestamps: true }
);

export const Resume = models.Resume || model<ResumeData>('Resume', ResumeSchema);
