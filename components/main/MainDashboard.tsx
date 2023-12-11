'use client';

import Link from 'next/link';

export default function MainDashboard() {
	return (
		<div className="flex bg-primary-50 z-[6] fixed top-0 left-0 w-full h-full">
			<div className="mx-auto mt-16 max-w-7xl px-4 sm:mt-24 h-full">
				<div className="text-center">
					<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
						<span className="block xl:inline">Book carwash services for your</span>{' '}
						<span className="block text-indigo-600 xl:inline">vehicles</span>
					</h1>
					<p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
						Easily schedule carwash appointments with subscribed car washes in your
						town. Keep your vehicle clean and shining without hassle.
					</p>
					<div className="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8">
						<div className="rounded-md shadow">
							<Link
								href="/booking"
								className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
							>
								Get started
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
