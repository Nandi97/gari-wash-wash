import Image from 'next/image';
import { metadata } from './layout';
import AdminDashboard from '@/components/main/admin/Dashboard';

export default function Home() {
	metadata.title = 'Admin Dashboard';
	return (
		<div>
			<AdminDashboard />
		</div>
	);
}
