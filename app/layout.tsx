import type { Metadata } from 'next';
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { extractRouterConfig } from 'uploadthing/server';
import { ourFileRouter } from '@/pages/api/upload-thing/server/uploadthing';
import { Roboto } from 'next/font/google';
import './globals.css';
import { Providers } from './auth/provider';
import Nav from '@/components/layouts/Nav';
import QueryWrapper from './QueryWrapper';

const roboto = Roboto({
	subsets: ['latin'],
	weight: ['400', '700'],
	variable: '--font-roboto',
});

export const metadata: Metadata = {
	title: ' ',
	description: ' ',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body
				className={` ${roboto.variable} h-screen font-sans  bg-light-background overflow-hidden`}
			>
				<QueryWrapper>
					<Providers>
						<NextSSRPlugin
							/**
							 * The `extractRouterConfig` will extract **only** the route configs
							 * from the router to prevent additional information from being
							 * leaked to the client. The data passed to the client is the same
							 * as if you were to fetch `/api/uploadthing` directly.
							 */
							routerConfig={extractRouterConfig(ourFileRouter)}
						/>
						<Nav pageTitle={metadata.title} />
						<main className="overflow-y-auto flex flex-col h-screen  bg-gradient-to-br from-primary-500/10 to-secondary-500/10 p-2">
							<div className="p-4 my-2  rounded-lg shadow-lg bg-primary-100 overflow-y-auto flex flex-col h-full ">
								{children}
							</div>
						</main>
					</Providers>
				</QueryWrapper>
			</body>
		</html>
	);
}
