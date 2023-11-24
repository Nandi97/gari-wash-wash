import { Icon } from '@iconify/react/dist/iconify.js';
import Image from 'next/image';
import Link from 'next/link';

type CarWashCardProps = {
	name: string;
	path: string;
	logo: string;
	location: string;
	mapsLink: string;
};
export default function CarWashCard({ name, path, logo, location, mapsLink }: CarWashCardProps) {
	return (
		<Link
			href={`/car-wash/${path}`}
			className="relative shadow rounded-md bg-primary-200 md:col-span-3 col-span-12 p-2 flex flex-col group hover:shadow-md z-0"
		>
			<div className="flex">
				<Image
					src={logo}
					height={1000}
					width={1000}
					alt={`Logo for ${name}`}
					className="w-20 h-20 object-contain"
				/>
				<div className="p-1 flex flex-col justify-between w-full h-full space-y-5">
					<div className=" w-full">
						<h1 className="font-semibold group-hover:underline">{name}</h1>
					</div>
					<div className="flex items-center">
						<Icon icon="heroicons:globe-europe-africa" className="text-primary-600" />
						<span>{location}</span>
					</div>
				</div>
			</div>
			<Icon
				icon="heroicons:arrow-up-right"
				className="text-primary-600 group-hover:text-primary-500 absolute top-2 right-2"
			/>
		</Link>
	);
}
