import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/assets/images/gari_was_wash_logo.png';
import NavMenu from './CarWashNavMenu';

interface CarWashNavProps {
	pageTitle?: any;
	carWashLogo?: any;
	carWashName?: string;
}

export default async function Nav({ pageTitle, carWashLogo, carWashName }: CarWashNavProps) {
	return (
		<nav className="w-full shadow-sm shadow-slate-400 bg-primary-400/30 h-10 justify-between p-1 flex items-center px-3">
			<div className="flex items-center flex-shrink-0 divide-x divide-secondary-300 space-x-3">
				<Link href={'/'} className="flex items-center space-x-2">
					<Image
						height={64}
						width={64}
						className="object-contain w-5 h-5"
						src={carWashLogo || logo}
						alt="OCO Logo"
					/>
					<div className="inline-flex items-center text-sm font-medium">
						<span className="text-secondary-600">
							{carWashName || 'Gari Wash Wash'}
						</span>
					</div>
				</Link>
				<div className="font-extralight px-2 text-base text-secondary-600">{pageTitle}</div>
			</div>
			<div className="flex space-x-2 items-center justify-center h-full">
				<NavMenu />
			</div>
		</nav>
	);
}
