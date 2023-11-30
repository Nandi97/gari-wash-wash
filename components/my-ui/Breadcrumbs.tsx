// ReusableBreadcrumbs.js
import { Icon } from '@iconify/react/dist/iconify.js';
import Link from 'next/link';
import path from 'path';

interface PageProps {
	pages: {
		icon?: string;
		name?: string;
		href?: string;
		current?: boolean;
	}[];
}

export default function ReusableBreadcrumbs({ pages }: PageProps) {
	// console.log(pages);
	return (
		<nav className="flex text-xs py-2 sticky top-1 z-20" aria-label="Breadcrumb">
			<ol role="list" className="flex items-center space-x-2">
				{pages.map((page, index) => (
					<li key={page.name}>
						<div className="flex items-center">
							{index !== 0 && (
								<svg
									className="h-3 w-3 flex-shrink-0 text-primary-300"
									fill="currentColor"
									viewBox="0 0 20 20"
									aria-hidden="true"
								>
									<path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
								</svg>
							)}
							<Link
								href={`${page.href}`}
								className={`flex items-center space-x-2 text-sm font-medium ${
									page.current === false
										? 'text-primary-500 hover:text-primary-700'
										: 'text-slate-500 cursor-default'
								}`}
								aria-current={page.current ? 'page' : undefined}
							>
								{page?.icon && (
									<Icon
										icon={`${page?.icon}`}
										className="h-5 w-5 flex-shrink-0"
										aria-hidden="true"
									/>
								)}
								{page?.name && <span> {page?.name}</span>}
							</Link>
						</div>
					</li>
				))}
			</ol>
		</nav>
	);
}
