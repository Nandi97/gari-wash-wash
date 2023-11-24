import Image from 'next/image';
import { metadata } from './layout';
import AdminDashboard from '@/components/main/car-wash/Dashboard';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export async function getSessionData() {
	const session: any = await getServerSession(authOptions);
	// console.log(session);
	return session;
}

export default async function Home() {
	metadata.title = 'Admin Dashboard';
	const session = await getSessionData();

	console.log(session);

	return (
		<div>
			<AdminDashboard />
		</div>
	);
}
