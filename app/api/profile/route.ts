import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { getProfile, saveProfile } from '@/lib/data-service';

export async function GET() {
	const profile = await getProfile();
	return NextResponse.json(profile);
}

export async function PUT(request: NextRequest) {
	if (!(await requireAdmin(request))) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}
	const body = await request.json();
	const profile = await saveProfile(body);
	return NextResponse.json(profile);
}
