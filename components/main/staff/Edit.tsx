'use client';

import StaffForm from '@/components/forms/staff/StaffForm';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

//Fetch A Staff
const fetchDetails = async (slug: string) => {
	const response = await axios.get(`/api/staff/get/${slug}`);
	return response.data;
};

export default function EditStaff() {
	const router = useRouter();
	const params = useParams();
	const staffId = params?.['staff-id'];
	let toastId: string;

	const { data: staffDetails } = useQuery({
		queryKey: ['detailStaff'],
		queryFn: () => {
			if (staffId) {
				return fetchDetails(staffId as string);
			} else {
				return Promise.reject(new Error('Staff ID not provided'));
			}
		},
	});

	const initialValues = {
		// ...staffDetails,

		name: staffDetails?.name,
		email: staffDetails?.email,
		image: staffDetails?.image,
		phoneNumber: staffDetails?.phoneNumber,
		address: staffDetails?.address,
		about: staffDetails?.about,
		city: staffDetails?.city,
		stateProvince: staffDetails?.stateProvince,
		zipPostalCode: staffDetails?.zipPostalCode,
		roleId: staffDetails?.roleId,
		designationId: staffDetails?.designationId,
		carWashId: staffDetails?.carWashId,
		createdById: staffDetails?.createdById,
	};
	// console.log(initialValues);

	const { mutate, isPending } = useMutation({
		mutationFn: async (data: any) => {
			const response1 = await axios.patch('/api/staff/patch', data);
			const response2 = await axios.patch('/api/user/patch', data);
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
			// console.log(data);
			toast.success('Staff Was Successful', { id: toastId });
			if (data) {
				router.push(`/car-wash/${data?.carWashId}/staff/${data?.id}`);
			}
		},
	});

	const handleEditStaff = (data: any) => {
		console.log('Data:', data);
		// mutate(data);
	};
	return (
		<div>
			<StaffForm
				onSubmit={handleEditStaff}
				isPending={isPending}
				initialValues={initialValues}
			/>
		</div>
	);
}
