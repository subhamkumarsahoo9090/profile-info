import mongoose, { Schema, models, model } from 'mongoose';

export interface IProfile {
	_id?: string;
	name: string;
	headline: string;
	tagline: string;
	summary: string;
	about: string;
	journey: string;
	location: string;
	email: string;
	phone: string;
	website: string;
	image: string;
	links: {
		github?: string;
		linkedin?: string;
		twitter?: string;
		facebook?: string;
		instagram?: string;
		whatsapp?: string;
	};
	achievements: string[];
}

const ProfileSchema = new Schema<IProfile>(
	{
		name: { type: String, required: true },
		headline: { type: String, required: true },
		tagline: { type: String, required: true },
		summary: { type: String, required: true },
		about: { type: String, required: true },
		journey: { type: String, required: true },
		location: { type: String, required: true },
		email: { type: String, required: true },
		phone: { type: String, required: true },
		website: { type: String },
		image: { type: String },
		links: {
			github: String,
			linkedin: String,
			twitter: String,
			facebook: String,
			instagram: String,
			whatsapp: String,
		},
		achievements: [{ type: String }],
	},
	{ timestamps: true }
);

export const Profile = models.Profile || model<IProfile>('Profile', ProfileSchema);
