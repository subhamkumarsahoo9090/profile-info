import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { ThemeProvider } from '@/components/theme-provider';
import { SiteShell } from '@/components/layout/site-shell';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'subham.dev | Subham Kumar Sahoo',
	description:
		'Senior Full-Stack Developer | MERN | React Native | Next.js | TypeScript',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link
					rel="shortcut icon"
					href="https://cdn-icons-png.freepik.com/256/12539/12539811.png"
					type="image/x-icon"
				/>
			</head>
			<body className={inter.className}>
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
					<SiteShell>{children}</SiteShell>
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
