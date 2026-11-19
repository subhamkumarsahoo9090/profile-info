import mongoose, { Schema, models, model } from 'mongoose';

export interface ISkill {
	_id?: string;
	name: string;
	level: number;
	category: 'technical' | 'software' | 'soft' | 'language';
	order?: number;
}

const SkillSchema = new Schema<ISkill>(
	{
		name: { type: String, required: true },
		level: { type: Number, required: true, min: 1, max: 10 },
		category: {
			type: String,
			enum: ['technical', 'software', 'soft', 'language'],
			required: true,
		},
		order: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

export const Skill = models.Skill || model<ISkill>('Skill', SkillSchema);
