import Image from 'next/image';
import { metadata } from '../layout';
import AdminDashboard from '@/components/main/car-wash/Dashboard';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';

export async function getSessionData() {
	const session: any = await getServerSession(authOptions);
	return session;
}

export default async function Home() {
	metadata.title = 'Super Admin Dashboard';
	return (
		<div>
			<AdminDashboard />
		</div>
	);
}
