import Link from 'next/link';
import { headers } from 'next/headers';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';

export async function getSessionData() {
	const session: any = await getServerSession(authOptions);
	// console.log(session);
	return session;
}

export default async function NotFound() {
	const session = await getSessionData();

	if (!session) {
		return redirect('/auth/login');
	}

	return (
		<div className="fixed top-0 left-0 z-40 w-full h-full bg-black/50">
			<div className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
				<div className="text-center">
					<p className="text-base font-semibold text-secondary-600">404</p>
					<h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
						Page not found
					</h1>
					<p className="mt-6 text-base leading-7 text-gray-600">
						Sorry, we couldn’t find the page you’re looking for.
					</p>
					<div className="mt-10 flex items-center justify-center gap-x-6">
						{session?.user?.role?.name !== 'Super Admin' ? (
							<Link
								href={`/car-wash/${session?.user?.carWash?.path}`}
								className="rounded-md bg-secondary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-secondary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-600"
							>
								Go back home
							</Link>
						) : (
							<Link
								href={`/car-wash/`}
								className="rounded-md bg-secondary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-secondary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-600"
							>
								Go back home
							</Link>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
