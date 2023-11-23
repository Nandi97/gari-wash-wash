'use client';
import StaffForm from '@/components/forms/staff/StaffForm';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function CreateStaff() {
	const router = useRouter();
	let toastId: string;

	const session = useSession();
	console.log(JSON.stringify(session));

	const { mutate, isPending } = useMutation({
		mutationFn: async (data: any) => {
			const response = await axios.post('/api/staff/post', data);
			return response.data;
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
			router.push(`/${data?.path}`);
		},
	});

	const handleStaff = (data: any) => {
		// console.log('Data:', data);
		mutate(data);
	};

	return (
		<div>
			<StaffForm onSubmit={handleStaff} isPending={isPending} />
		</div>
	);
}
