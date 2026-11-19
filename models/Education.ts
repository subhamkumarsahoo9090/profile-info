import mongoose, { Schema, models, model } from 'mongoose';

export interface IEducation {
	_id?: string;
	degree: string;
	field: string;
	institution: string;
	location: string;
	startDate: string;
	endDate: string;
	gpa?: string;
	achievements: string[];
	order?: number;
}

const EducationSchema = new Schema<IEducation>(
	{
		degree: { type: String, required: true },
		field: { type: String, required: true },
		institution: { type: String, required: true },
		location: { type: String, required: true },
		startDate: { type: String, required: true },
		endDate: { type: String, required: true },
		gpa: { type: String },
		achievements: [{ type: String }],
		order: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

export const Education =
	models.Education || model<IEducation>('Education', EducationSchema);
