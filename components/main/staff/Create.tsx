'use client';
import StaffForm from '@/components/forms/staff/StaffForm';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function CreateStaff() {
	const router = useRouter();
	let toastId: string;

	const { mutate, isPending } = useMutation({
		mutationFn: async (data: any) => {
			const response1 = await axios.post('/api/staff/post', data);
			const response2 = await axios.post('/api/user/post', data);
			return response1.data;
		},

		onError: (error: any) => {
			if (error instanceof AxiosError) {
				toast.error(error?.response?.data.message, {
					id: toastId,
				});
			}
		},
		onSuccess: (data: any) => {
			toast.success('Staff Was Successful', { id: toastId });
			if (data) {
				router.push(`/car-wash/${data?.carWashId}/staff/${data?.id}`);
			}
		},
	});

	const handleCreateStaff = (data: any) => {
		mutate(data);
	};

	return (
		<div>
			<StaffForm onSubmit={handleCreateStaff} isPending={isPending} />
		</div>
	);
}
