import '~/src/styles/globals.css';

import { ReactNode } from 'react';
import { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';

import { Analytics } from '~/src/components';
import { siteConfig } from '~/src/config/site';
import { cn } from '~/src/lib/utils';

const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
});

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	keywords: [
		'Next.js',
		'React',
		'Tailwind CSS',
		'Server Components',
		'Attendance',
		'Tracking',
	],
	authors: [
		{
			name: 'Marcus Rodrigues',
			url: 'https://mrodrigues.me',
		},
	],
	creator: 'Marcus Rodrigues',
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: siteConfig.url,
		title: siteConfig.name,
		description: siteConfig.description,
		siteName: siteConfig.name,
		images: [
			{
				url: siteConfig.ogImage,
				width: 1920,
				height: 1080,
				alt: siteConfig.name,
			},
		],
	},
	icons: {
		icon: '/favicon.ico',
	},
};

const RootLayout = ({ children }: { children: ReactNode }) => {
	return (
		<html lang="en">
			<body
				className={cn('min-h-screen font-sans antialiased', fontSans.variable)}
			>
				{children}
				<Analytics />
			</body>
		</html>
	);
};

export default RootLayout;
