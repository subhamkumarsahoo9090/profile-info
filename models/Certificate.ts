import mongoose, { Schema, models, model } from 'mongoose';

export interface ICertificate {
	_id?: string;
	title: string;
	issuer: string;
	date: string;
	id?: string;
	url?: string;
	pdf?: string;
	order?: number;
}

const CertificateSchema = new Schema<ICertificate>(
	{
		title: { type: String, required: true },
		issuer: { type: String, required: true },
		date: { type: String, required: true },
		id: { type: String },
		url: { type: String },
		pdf: { type: String },
		order: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

export const Certificate =
	models.Certificate || model<ICertificate>('Certificate', CertificateSchema);
