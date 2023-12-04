import { Icon } from '@iconify/react/dist/iconify.js';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import Map from '@/components/my-ui/Map';

type CarWashCardProps = {
	name: string;
	path: string;
	logo: string;
	location: string;
	lat: number;
	long: number;
};

export default function CarWashCard({ name, path, logo, location, lat, long }: CarWashCardProps) {
	const [toggle, setToggle] = useState(false);
	// const DEFAULT_CENTER = [38.907132, -77.036546];
	return (
		<>
			<div className="relative shadow rounded-md bg-primary-200 md:col-span-3 col-span-12 p-2 flex flex-col group hover:shadow-md z-0">
				<div className="flex">
					<Image
						src={logo}
						height={1000}
						width={1000}
						alt={`Logo for ${name}`}
						className="w-20 h-20 object-contain"
					/>
					<div className="p-1 flex flex-col justify-between w-full h-full space-y-5">
						<Link href={`/car-wash/${path}`} className=" w-full">
							<h1 className="font-semibold group-hover:underline">{name}</h1>
						</Link>
						<button
							onClick={(e) => setToggle(true)}
							type="button"
							className="flex items-center"
						>
							<Icon
								icon="heroicons:globe-europe-africa"
								className="text-primary-600"
							/>
							<span>{location}</span>
						</button>
					</div>
				</div>
				<Icon
					icon="heroicons:arrow-up-right"
					className="text-primary-600 group-hover:text-primary-500 absolute top-2 right-2"
				/>
			</div>
			{toggle && (
				<div className="flex bg-primary-50/40 z-[3] fixed top-0 left-0 w-full h-full">
					<div className="relative z-[3] m-auto bg-slate-50 rounded-md h-3/4 w-3/4 pt-10">
						<div className="flex flex-col">
							<div className="p-4 w-full">
								<Link
									href={`https://maps.google.com/?q=${lat},${long}`}
									target="_blank"
									className="inline-flex items-center space-x-2 rounded-md border-2 border-primary-500 p-2"
								>
									<Icon icon="heroicons:globe-europe-africa" />
									<span>Open on google maps</span>
								</Link>
							</div>
							<div className="p-4">
								<Map
									// className={styles.homeMap}
									width="800"
									height="300"
									center={[lat, long]}
									zoom={17}
								>
									{({ TileLayer, Marker, Popup }: any) => (
										<>
											<TileLayer
												url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
												attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
											/>
											<Marker position={[lat, long]}>
												<Popup>{name} </Popup>
											</Marker>
										</>
									)}
								</Map>
							</div>
						</div>

						<button
							type="button"
							className="top-3 right-3 absolute text-xl"
							onClick={(e) => setToggle(false)}
						>
							<Icon icon="heroicons:x-mark"></Icon>
						</button>
					</div>
				</div>
			)}
		</>
	);
}
