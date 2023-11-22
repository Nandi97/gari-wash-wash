import Image from 'next/image';
import { metadata } from './layout';
import AdminDashboard from '@/components/main/car-wash/Dashboard';

export default function Home() {
	metadata.title = 'Admin Dashboard';
	return (
		<div>
			<AdminDashboard />
		</div>
	);
}
