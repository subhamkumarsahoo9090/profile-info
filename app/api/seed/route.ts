import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { reseedAll } from '@/lib/data-service';

export async function POST(request: Request) {
	const { searchParams } = new URL(request.url);
	const force = searchParams.get('force') === 'true';

	if (force) {
		const ok = await requireAdmin();
		if (!ok) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}
	}

	await reseedAll();
	return NextResponse.json({ success: true, message: 'Data seeded' });
}
