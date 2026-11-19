import mongoose, { Schema, models, model } from 'mongoose';

export interface IProject {
	_id?: string;
	title: string;
	description: string;
	image: string;
	tags: string[];
	link?: string;
	repo?: string;
	featured?: boolean;
	order?: number;
}

const ProjectSchema = new Schema<IProject>(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		image: { type: String, required: true },
		tags: [{ type: String }],
		link: { type: String },
		repo: { type: String },
		featured: { type: Boolean, default: false },
		order: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

export const Project = models.Project || model<IProject>('Project', ProjectSchema);
