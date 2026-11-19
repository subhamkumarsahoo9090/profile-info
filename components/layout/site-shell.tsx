'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export function SiteShell({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const isAdmin = pathname?.startsWith('/admin');

	if (isAdmin) {
		return <>{children}</>;
	}

	return (
		<div className="relative min-h-screen flex flex-col">
			<Navbar />
			<main className="flex-grow pt-16">{children}</main>
			<Footer />
		</div>
	);
}
