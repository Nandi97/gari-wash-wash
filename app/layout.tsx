import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { Providers } from './auth/provider';
import Nav from '@/components/layouts/AdminNav';
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
