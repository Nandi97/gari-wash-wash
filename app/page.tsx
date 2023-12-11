import { metadata } from './layout';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import MainDashboard from '@/components/main/MainDashboard';
import { redirect } from 'next/navigation';

export async function getSessionData() {
	const session: any = await getServerSession(authOptions);
	return session;
}
export default async function Home() {
	// // console.log(session);

	// if (session?.user?.role?.name !== 'Super Admin') {
	// 	return redirect(`/car-wash/${session?.user?.carWash?.path}`);
	// }
	return (
		<div>
			<MainDashboard />
		</div>
	);
}
