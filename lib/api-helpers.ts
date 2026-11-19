import { NextRequest, NextResponse } from 'next/server';
import { Model } from 'mongoose';
import { connectDB } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { ensureSeeded } from '@/lib/seed';

export function json(data: unknown, status = 200) {
	return NextResponse.json(data, { status });
}

export async function listCollection<T>(
	ModelRef: Model<T>,
	sort: Record<string, 1 | -1> = { order: 1 },
	fallback: unknown[] = []
) {
	try {
		await ensureSeeded();
		const items = await ModelRef.find().sort(sort).lean();
		return json(items);
	} catch (error) {
		console.error('listCollection error:', error);
		return json(fallback);
	}
}

export async function createItem<T>(request: NextRequest, ModelRef: Model<T>) {
	if (!(await requireAdmin(request))) return json({ error: 'Unauthorized' }, 401);
	try {
		await connectDB();
		const body = await request.json();
		const item = await ModelRef.create(body);
		return json(item, 201);
	} catch (error) {
		console.error('createItem error:', error);
		return json(
			{ error: 'Database unavailable. Check MongoDB Atlas network access / DNS.' },
			503
		);
	}
}

export async function updateItem<T>(
	request: NextRequest,
	ModelRef: Model<T>,
	id: string
) {
	if (!(await requireAdmin(request))) return json({ error: 'Unauthorized' }, 401);
	try {
		await connectDB();
		const body = await request.json();
		const item = await ModelRef.findByIdAndUpdate(id, body, { new: true });
		if (!item) return json({ error: 'Not found' }, 404);
		return json(item);
	} catch (error) {
		console.error('updateItem error:', error);
		return json(
			{ error: 'Database unavailable. Check MongoDB Atlas network access / DNS.' },
			503
		);
	}
}

export async function deleteItem<T>(request: NextRequest, ModelRef: Model<T>, id: string) {
	if (!(await requireAdmin(request))) return json({ error: 'Unauthorized' }, 401);
	try {
		await connectDB();
		const item = await ModelRef.findByIdAndDelete(id);
		if (!item) return json({ error: 'Not found' }, 404);
		return json({ success: true });
	} catch (error) {
		console.error('deleteItem error:', error);
		return json(
			{ error: 'Database unavailable. Check MongoDB Atlas network access / DNS.' },
			503
		);
	}
}
