import { NextRequest, NextResponse } from 'next/server';
import { createAdminToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const username = String(body.username || '').trim();
		const password = String(body.password || '');

		const adminUser = process.env.ADMIN_USERNAME || 'admin';
		const adminPass = process.env.ADMIN_PASSWORD || '';

		if (!username || !password || username !== adminUser || password !== adminPass) {
			return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
		}

		const token = await createAdminToken();
		const response = NextResponse.json({ success: true, message: 'Logged in' });
		response.cookies.set('admin_token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			path: '/',
			maxAge: 60 * 60 * 24 * 7,
		});
		return response;
	} catch (error) {
		console.error('login error:', error);
		return NextResponse.json({ error: 'Login failed' }, { status: 500 });
	}
}
