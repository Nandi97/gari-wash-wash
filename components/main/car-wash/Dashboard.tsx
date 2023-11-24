'use client';
import CarWashCard from '@/components/my-ui/CarWashCard';
import { getAuthenticatedUser } from '@/lib/auth-user';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface CarWashes {
	id: string;
	name: string;
	path: string;
	logo: string;
	location: string;
	mapsLink: string;
}

const fetchAllCarWashes = async () => {
	const response = await axios.get('/api/car-wash/get');
	return response.data;
};
export default function AdminDashboard() {
	const { data } = useQuery<CarWashes[]>({
		queryFn: fetchAllCarWashes,
		queryKey: ['carwashes'],
	});
	// console.log(session?.user);

	// const user = getAuthenticatedUser(session);

	// console.log(user);

	return (
		<div className="grid grid-cols-12 gap-4">
			{data?.map((item) => (
				<CarWashCard
					key={item?.id}
					name={item?.name}
					path={item?.path}
					logo={item?.logo}
					location={item?.location}
					mapsLink={item?.mapsLink}
				/>
			))}{' '}
		</div>
	);
}
