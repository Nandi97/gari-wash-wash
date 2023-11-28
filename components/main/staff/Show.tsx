'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import { useParams } from 'next/navigation';

//Fetch All posts
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
		<div className="bg-primary-50 grid grid-cols-12 p-2">
			<div className="md:col-span-4 col-span-12">
				<Image
					height={300}
					width={300}
					alt="staff image"
					className="rounded h-40 w-40 object-contain border"
					src={data?.image}
				/>
			</div>
			<div className="md:col-span-8 col-span-12"></div>
		</div>
	);
}
