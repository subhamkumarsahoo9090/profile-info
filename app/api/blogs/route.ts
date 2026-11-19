import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { createItem, listItems } from '@/lib/data-service';

export async function GET() {
	const items = await listItems('blogs');
	return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
	if (!(await requireAdmin(request))) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}
	const body = await request.json();
	const item = await createItem('blogs', body);
	return NextResponse.json(item, { status: 201 });
}
