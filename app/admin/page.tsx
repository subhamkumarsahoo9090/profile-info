'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, Shield } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AdminLoginPage() {
	const router = useRouter();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [checking, setChecking] = useState(true);

	useEffect(() => {
		fetch('/api/auth/me')
			.then((res) => res.json())
			.then((data) => {
				if (data.authenticated) router.replace('/admin/dashboard');
			})
			.finally(() => setChecking(false));
	}, [router]);

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();
		setLoading(true);
		try {
			const res = await fetch('/api/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password }),
			});
			const data = await res.json();
			if (!res.ok) {
				toast.error(data.error || 'Login failed');
				return;
			}
			toast.success('Welcome Admin');
			router.push('/admin/dashboard');
		} catch {
			toast.error('Unable to login');
		} finally {
			setLoading(false);
		}
	}

	if (checking) {
		return (
			<div className="min-h-screen grid place-items-center bg-[#0b1020] text-white">
				<p className="text-muted-foreground">Checking session...</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen relative overflow-hidden bg-[#0b1020] text-white">
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.18),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(244,114,182,0.16),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(52,211,153,0.12),transparent_40%)]" />
			<div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:48px_48px]" />

			<div className="relative z-10 min-h-screen flex items-center justify-center px-4">
				<div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
					<div className="flex flex-col items-center text-center mb-8">
						<div className="h-14 w-14 rounded-full bg-sky-500/20 border border-sky-400/30 grid place-items-center mb-4">
							<Shield className="h-7 w-7 text-sky-300" />
						</div>
						<h1 className="text-3xl font-bold tracking-tight">Admin Login</h1>
						<p className="text-sm text-slate-300 mt-2">
							subham.dev control panel — enter credentials to manage content.
						</p>
					</div>

					<form onSubmit={handleSubmit} className="space-y-5">
						<div className="space-y-2">
							<Label htmlFor="username">Username</Label>
							<div className="relative">
								<User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
								<Input
									id="username"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									placeholder="admin"
									className="pl-10 bg-black/30 border-white/10"
									required
									autoComplete="username"
								/>
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<div className="relative">
								<Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
								<Input
									id="password"
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									placeholder="••••••••"
									className="pl-10 bg-black/30 border-white/10"
									required
									autoComplete="current-password"
								/>
							</div>
						</div>

						<Button type="submit" className="w-full" disabled={loading}>
							{loading ? 'Signing in...' : 'Sign in to Admin'}
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
}
