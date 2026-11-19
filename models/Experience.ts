import mongoose, { Schema, models, model } from 'mongoose';

export interface IExperience {
	_id?: string;
	title: string;
	company: string;
	location: string;
	startDate: string;
	endDate: string;
	description: string[];
	technologies: string[];
	order?: number;
}

const ExperienceSchema = new Schema<IExperience>(
	{
		title: { type: String, required: true },
		company: { type: String, required: true },
		location: { type: String, required: true },
		startDate: { type: String, required: true },
		endDate: { type: String, required: true },
		description: [{ type: String }],
		technologies: [{ type: String }],
		order: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

export const Experience =
	models.Experience || model<IExperience>('Experience', ExperienceSchema);
