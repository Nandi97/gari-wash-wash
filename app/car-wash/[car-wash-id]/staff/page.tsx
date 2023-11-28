import IndexStaff from '@/components/main/staff/Index';
import { metadata } from '../../../layout';

export default function Dashboard() {
	metadata.title = 'Staff Dashboard';
	return (
		<>
			<IndexStaff />
		</>
	);
}
