import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Map from '@/components/my-ui/Map';
import { usePathname } from 'next/navigation';

type BookingCardProps = {
	name: string;
	path: string;
	logo: string;
	location: string;
	lat: number;
	long: number;
	town: string;
	constituency: string;
	area: string;
};

export default function BookingCard({
	name,
	path,
	logo,
	location,
	lat,
	long,
	town,
	constituency,
	area,
}: BookingCardProps) {
	const pathname = usePathname();
	return (
		<>
			<div className="shadow rounded-md bg-primary-200 md:col-span-3 col-span-12 p-2 flex flex-col group hover:shadow-md z-0">
				<div className="grid grid-cols-12">
					<div className="col-span-3">
						<Image
							src={logo}
							height={1000}
							width={1000}
							alt={`Logo for ${name}`}
							className="w-20 h-20 object-contain"
						/>
					</div>
					<div className="col-span-9">
						<table className="text-xs table-fixed w-full  text-left rtl:text-right text-gray-800 ">
							<thead className=" text-gray-700 uppercase  ">
								<tr className="text-center">
									<th scope="col" colSpan={2} className="font-semibold">
										{name}
									</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className="font-medium">Location:</td>
									<td>
										{town}, {constituency}, {area}
									</td>
								</tr>
								<tr>
									<td className="font-medium">Nearest Landmark:</td>
									<td>{location}</td>
								</tr>
								<tr>
									<td colSpan={2} className="font-medium w-full text-center">
										<Link
											href={`${pathname}/${path}/create`}
											className="sm:text-sm w-3/4  bg-opacity-70 border-1 border-secondary-500 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-500 bg-primary-50 hover:text-secondary-50 focus:outline-none  focus:ring-offset-1"
										>
											Book Wash
										</Link>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div className="w-full h-20 py-1 rounded-md">
					<Map
						className="aspect-video"
						// width="200"
						height="160"
						center={[lat, long]}
						zoom={5}
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
		</>
	);
}
