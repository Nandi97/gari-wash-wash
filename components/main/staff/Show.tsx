'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import { useParams } from 'next/navigation';

//Fetch A Staff
const fetchDetails = async (slug: string) => {
	const response = await axios.get(`/api/staff/get/${slug}`);
	return response.data;
};

export default function ShowStaff() {
	const params = useParams();
	const staffId = params?.['staff-id'];

	const { data, isPending } = useQuery({
		queryKey: ['detailStaff'],
		queryFn: () => {
			if (staffId) {
				return fetchDetails(staffId as string);
			} else {
				return Promise.reject(new Error('Staff ID not provided'));
			}
		},
	});

	return (
		<div className="bg-primary-50 grid grid-cols-12 gap-2 p-2 rounded-md shadow-md">
			<div className="md:col-span-4 col-span-12">
				<div className="flex flex-col space-y-2">
					<Image
						height={300}
						width={300}
						alt="staff image"
						className="rounded h-40 w-40 object-contain border"
						src={data?.image}
					/>
					<h1 className="text-xl font-semibold">{data?.name}</h1>
					<h2 className="text-base font-semibold">{data?.designation?.name}</h2>
					<h3 className="text-base font-semibold">{data?.phoneNumber}</h3>
				</div>
			</div>
			<div className="md:col-span-8 col-span-12">
				<table className="table-fixed divide-y divide-primary-100">
					<thead className="sticky z-10 bg-secondary-600 text-secondary-50">
						<tr>
							<th
								scope="col"
								className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold"
							></th>
							<th
								scope="col"
								className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold  sm:pl-6"
							>
								Name
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						<tr className="hover:bg-primary-100/95">
							<td className="px-3 py-2 text-sm text-end whitespace-nowrap text-secondary-500">
								Staff No :
							</td>
							<td className="px-3 py-2 text-sm whitespace-nowrap">{data?.staffNo}</td>
						</tr>
						<tr className="hover:bg-primary-100/95">
							<td className="px-3 py-2 text-sm text-end whitespace-nowrap text-secondary-500">
								Address :
							</td>
							<td className="px-3 py-2 text-sm whitespace-nowrap">
								{`${data?.city}, ${data?.stateProvince}, ${data?.address}, ${data?.zipPostalCode}`}
							</td>
						</tr>
						<tr className="hover:bg-primary-100/95">
							<td className="px-3 py-2 text-sm text-end whitespace-nowrap text-secondary-500">
								Address :
							</td>
							<td className="px-3 py-2 text-xs">{data?.about}</td>
						</tr>
						<tr className="hover:bg-primary-100/95">
							<td className="px-3 py-2 text-sm text-end whitespace-nowrap text-secondary-500">
								Status :
							</td>
							<td className="px-3 py-2 text-xs">
								<span
									className={`inline-flex rounded-full  px-2 text-xs font-semibold leading-5 ${
										data?.deletedAt === null
											? 'text-green-800 bg-green-100'
											: 'text-red-800 bg-red-100'
									}`}
								>
									{data?.deletedAt === null ? 'Active' : 'Inactive'}
								</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className="col-span-12 border-y-2 mt-5">
				<h1 className="font-semibold text-xl">Bookings $ Statistics</h1>
			</div>
		</div>
	);
}
