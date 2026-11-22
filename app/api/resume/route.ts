import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { getResume, saveResume } from '@/lib/data-service';

export async function GET() {
	const resume = await getResume();
	return NextResponse.json(resume);
}

export async function PUT(request: NextRequest) {
	if (!(await requireAdmin(request))) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}
	const body = await request.json();
	const resume = await saveResume(body);
	return NextResponse.json(resume);
}
