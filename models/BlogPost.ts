import mongoose, { Schema, models, model } from 'mongoose';

export interface IBlogPost {
	_id?: string;
	title: string;
	excerpt: string;
	date: string;
	author: string;
	image: string;
	slug: string;
	order?: number;
}

const BlogPostSchema = new Schema<IBlogPost>(
	{
		title: { type: String, required: true },
		excerpt: { type: String, required: true },
		date: { type: String, required: true },
		author: { type: String, required: true },
		image: { type: String, required: true },
		slug: { type: String, required: true, unique: true },
		order: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

export const BlogPost =
	models.BlogPost || model<IBlogPost>('BlogPost', BlogPostSchema);
