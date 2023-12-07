import { Icon } from '@iconify/react/dist/iconify.js';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';

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
	addCarWashService: (service: any) => void;
	setToggle: (toggle: boolean) => void;
}

export default function CarWashServiceForm({
	addCarWashService,
	setToggle,
}: CarWashServiceFormProps) {
	const [formData, setFormData] = useState<any>({
		serviceId: '',
		cost: 0,
		carTypes: [],
	});

	const [selectedValues, setSelectedValues] = useState<any>();

	const { data: services } = useQuery({
		queryFn: fetchAllCarWashServices,
		queryKey: ['carWashServices'],
	});

	const { data: types } = useQuery({
		queryFn: fetchAllCarTypes,
		queryKey: ['carTypes'],
	});

	useEffect(() => {
		if (selectedValues) {
			setFormData((prevFormData) => ({
				...prevFormData,
				carTypes: selectedValues,
			}));
		}
	}, [selectedValues]);

	const handleAddService = () => {
		addCarWashService(formData);
		setToggle(false);
	};

	return (
		<div className="fixed top-0 left-0 z-20 w-full h-full bg-black/50">
			<div className="absolute flex flex-col items-center gap-6 p-12 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg top-1/2 left-1/2">
				<div className="grid md:grid-cols-12 grid-cols-6 gap-4 border rounded-md w-full p-2">
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
							value={formData?.serviceId}
							onChange={(e) =>
								setFormData({
									...formData,
									serviceId: e.target.value,
								})
							}
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
						<Listbox
							as="div"
							value={selectedValues}
							onChange={setSelectedValues}
							className="md:col-span-4 col-span-6 space-y-1"
							multiple
						>
							<Listbox.Label className="block text-sm font-medium text-secondary-700">
								Car Types: <sup className="text-red-500">*</sup>
							</Listbox.Label>
							<div className="relative mt-1">
								<Listbox.Button className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8   py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1">
									<span className="block -ml-10">
										{selectedValues?.map((item: any) => item?.type).join(', ')}
									</span>
									<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
										<Icon
											icon="heroicons:chevron-up-down"
											className="h-5 w-5 text-gray-400"
											aria-hidden="true"
										/>
									</span>
								</Listbox.Button>
								<Transition
									as="div"
									leave="transition ease-in duration-100"
									leaveFrom="opacity-100"
									leaveTo="opacity-0"
								>
									<Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
										{types?.map((item, itemIdx) => (
											<Listbox.Option
												key={itemIdx}
												className={({ active }) =>
													`relative cursor-default select-none py-2 pl-10 pr-4 ${
														active
															? 'bg-amber-100 text-amber-900'
															: 'text-gray-900'
													}`
												}
												value={item}
											>
												{({ selected }) => (
													<>
														<span
															className={`block truncate ${
																selected
																	? 'font-medium'
																	: 'font-normal'
															}`}
														>
															{item?.type}
														</span>
														{selected ? (
															<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">
																<Icon
																	icon="heroicons:check-circle-20-solid"
																	className="h-5 w-5"
																	aria-hidden="true"
																/>
															</span>
														) : (
															<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-600">
																<Icon
																	icon="heroicons:check-circle"
																	className="h-5 w-5"
																	aria-hidden="true"
																/>
															</span>
														)}
													</>
												)}
											</Listbox.Option>
										))}
									</Listbox.Options>{' '}
								</Transition>
							</div>
						</Listbox>
					</div>
					<div className="md:col-span-4 col-span-6 space-y-1">
						<label
							htmlFor="cost"
							className="block text-sm font-medium text-secondary-700"
						>
							Cost <sup className="text-red-500">*</sup>
						</label>
						<input
							type="number"
							name="cost"
							id="cost"
							value={formData?.cost}
							onChange={(e) =>
								setFormData({
									...formData,
									cost: e.target.value,
								})
							}
							className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
							required
						/>
					</div>
				</div>
				<div className="flex items-center justify-center">
					<button
						className="bg-primary-600 text-white p-2 rounded-md mt-5"
						type="button"
						onClick={handleAddService}
					>
						Add Service
					</button>
				</div>
				<button
					onClick={(e) => {
						e.stopPropagation();
						setToggle(false);
					}}
					className="absolute top-3 right-3"
				>
					<Icon icon="heroicons:x-mark" />
				</button>
			</div>
		</div>
	);
}
