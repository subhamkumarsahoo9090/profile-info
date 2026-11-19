import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { deleteItem, updateItem } from '@/lib/data-service';

export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	if (!(await requireAdmin(request))) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}
	const { id } = await params;
	const body = await request.json();
	const item = await updateItem('experiences', id, body);
	if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
	return NextResponse.json(item);
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	if (!(await requireAdmin(request))) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}
	const { id } = await params;
	const ok = await deleteItem('experiences', id);
	if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 });
	return NextResponse.json({ success: true });
}
