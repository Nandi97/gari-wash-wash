import { Icon } from '@iconify/react/dist/iconify.js';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

interface CarWashServiceForm {
	serviceId: string;
	cost: number;
	carTypeId: string;
}

interface Service {
	id: string;
	name: string;
	description: string;
}

interface CarType {
	id: string;
	type: string;
}

const fetchAllCarWashServices = async () => {
	const response = await axios.get('/api/car-wash-service/get');
	return response.data as Array<Service>;
};
const fetchAllCarTypes = async () => {
	const response = await axios.get('/api/car-type/get');
	return response.data as Array<CarType>;
};

interface CarWashServiceFormProps {
	initialValues: CarWashServiceForm;
	onChange: (event: any) => void;
	onClick: (event: any) => void;
}

export default function CarWashServiceForm({
	initialValues,
	onChange,
	onClick,
}: CarWashServiceFormProps) {
	const { data: services } = useQuery({
		queryFn: fetchAllCarWashServices,
		queryKey: ['carWashServices'],
	});

	const { data: types } = useQuery({
		queryFn: fetchAllCarTypes,
		queryKey: ['carTypes'],
	});

	// console.log('Values', initialValues);
	return (
		<div className="flex items-center w-full">
			<div className="md:col-span-8 col-span-6 grid md:grid-cols-12 grid-cols-6 gap-4 border rounded-md w-full p-2">
				<div className="md:col-span-4 col-span-6 space-y-1">
					<label
						htmlFor="serviceId"
						className="block text-sm font-medium text-secondary-700"
					>
						Service <sup className="text-red-500">*</sup>
					</label>
					<select
						id="serviceId"
						name="serviceId"
						value={initialValues?.serviceId} // Use selectedStaffType here
						onChange={onChange}
						className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
						required
					>
						<option
							selected
							disabled
							value=""
							className="text-opacity-50 text-secondary-700"
						>
							--Select Service Type--
						</option>
						{services?.map((item) => (
							<option key={item?.id} value={item?.id}>
								{item?.name}
							</option>
						))}
					</select>
				</div>
				<div className="md:col-span-4 col-span-6 space-y-1">
					<label
						htmlFor="carTypeId"
						className="block text-sm font-medium text-secondary-700"
					>
						Car Type <sup className="text-red-500">*</sup>
					</label>
					<select
						id="carTypeId"
						name="carTypeId"
						value={initialValues?.carTypeId}
						onChange={onChange}
						className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
						required
					>
						<option
							selected
							disabled
							value=""
							className="text-opacity-50 text-secondary-700"
						>
							--Select Car Type--
						</option>
						{types?.map((item) => (
							<option key={item?.id} value={item?.id}>
								{item?.type}
							</option>
						))}
					</select>
				</div>
				<div className="md:col-span-4 col-span-6 space-y-1">
					<label htmlFor="cost" className="block text-sm font-medium text-secondary-700">
						Cost <sup className="text-red-500">*</sup>
					</label>
					<input
						type="number"
						name="cost"
						id="cost"
						value={initialValues?.cost}
						onChange={onChange}
						className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
						required
					/>
				</div>
			</div>
			<div className="flex items-center justify-center">
				<button
					onClick={onClick}
					className="bg-primary-600 text-white p-2 rounded-md mt-5"
					type="button"
				>
					<Icon icon="heroicons:trash" className="text-xl" />
				</button>
			</div>
		</div>
	);
}
