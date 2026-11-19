import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const COOKIE_NAME = 'admin_token';

function getSecret() {
	const secret = process.env.JWT_SECRET;
	if (!secret) throw new Error('JWT_SECRET is not set');
	return new TextEncoder().encode(secret);
}

export async function createAdminToken() {
	return new SignJWT({ role: 'admin' })
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime('7d')
		.sign(getSecret());
}

export async function verifyAdminToken(token: string) {
	try {
		const { payload } = await jwtVerify(token, getSecret());
		return payload.role === 'admin';
	} catch {
		return false;
	}
}

export async function setAdminCookie(token: string) {
	const cookieStore = await cookies();
	cookieStore.set(COOKIE_NAME, token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		path: '/',
		maxAge: 60 * 60 * 24 * 7,
	});
}

export async function clearAdminCookie() {
	const cookieStore = await cookies();
	cookieStore.delete(COOKIE_NAME);
}

export async function isAdminAuthenticated() {
	const cookieStore = await cookies();
	const token = cookieStore.get(COOKIE_NAME)?.value;
	if (!token) return false;
	return verifyAdminToken(token);
}

export async function requireAdmin(request?: NextRequest) {
	const token =
		request?.cookies.get(COOKIE_NAME)?.value ||
		(await cookies()).get(COOKIE_NAME)?.value;

	if (!token || !(await verifyAdminToken(token))) {
		return false;
	}
	return true;
}
