import Image from 'next/image';
import { metadata } from './layout';
import AdminDashboard from '@/components/main/car-wash/Dashboard';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';

export async function getSessionData() {
	const session: any = await getServerSession(authOptions);
	// console.log(session);
	return session;
}

export default async function Home() {
	metadata.title = 'Car Washes Dashboard';
	const session = await getSessionData();

	if (!session) {
		return redirect('/booking');
	}

	// // console.log(session);

	// if (session?.user?.role?.name !== 'Super Admin') {
	// 	return redirect(`/car-wash/${session?.user?.carWash?.path}`);
	// }
	return <div>Main Dashboard</div>;
}
