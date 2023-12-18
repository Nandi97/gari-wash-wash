'use client';
import CarWashForm from '@/components/forms/car-wash/CarWashForm';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function CreateCarWash() {
	const router = useRouter();
	let toastId: string;

	const { mutate, isPending } = useMutation({
		mutationFn: async (data: any) => {
			const response = await axios.post('/api/car-wash/post', data);
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
			toast.success('Car Wash Was Successful', { id: toastId });
			router.push(`/car-wash/${data?.id}`);
		},
	});

	const handleCreateCarWash = (data: any) => {
		mutate(data);
	};
	return (
		<>
			<CarWashForm onSubmit={handleCreateCarWash} isPending={isPending} />
		</>
	);
}
