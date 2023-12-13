'use client';

import BookingForm from '@/components/forms/booking/BookingForm';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function CreateBooking() {
	const router = useRouter();
	let toastId: string;

	const { mutate, isPending } = useMutation({
		mutationFn: async (data: any) => {
			// console.log('Data:', data);
			const response = await axios.post('/api/booking/post', data);
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
			// console.log(data);
			toast.success('Car Wash Was Successful', { id: toastId });
			router.push(`/booking/${data?.carWashId}/confirmed/${data?.id}`);
		},
	});

	const handleCreateBooking = (data: any) => {
		// console.log('Data:', data);
		mutate(data);
	};
	return <BookingForm onSubmit={handleCreateBooking} isPending={isPending} />;
}
