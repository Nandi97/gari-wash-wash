'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from '@/components/ui/Accordion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import logo_placeholder from '@/public/assets/images/logo-placeholder-image.png';
import CarWashServiceForm from './CarWashServices';
import { Icon } from '@iconify/react/dist/iconify.js';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Item } from '@radix-ui/react-accordion';
import { Town } from '@/lib/types/town';
import DuplicateError from './DuplicateError';

interface CarTypeCost {
	carTypeId: string;
	serviceId: string;
	carWashId: string;
	cost: number;
}

interface CarType {
	id: string;
	type: string;
}

interface CarWashService {
	serviceId: string;
	carTypes: CarType[];
	carTypeCosts: CarTypeCost[];
}

interface CarWashForm {
	name: string;
	logo: string;
	path: string;
	branch: string;
	landmark: string;
	lat: number;
	long: number;
	bookingLeadTime: number;
	carWashServices: CarWashService[];
	areaId: string;
}
interface CarWashFormProps {
	onSubmit: SubmitHandler<CarWashForm>;
	initialValues?: CarWashForm;
	isPending: boolean;
}
interface Service {
	id: string;
	name: string;
	description: string;
}

const fetchAllTowns = async () => {
	const response = await axios.get('/api/town/get');
	return response.data as Array<Town>;
};
const fetchAllCarTypes = async () => {
	const response = await axios.get('/api/car-type/get');
	return response.data as Array<CarType>;
};
const fetchAllCarWashServices = async () => {
	const response = await axios.get('/api/service/get');
	return response.data as Array<Service>;
};
export default function CarWashForm({ onSubmit, initialValues, isPending }: CarWashFormProps) {
	const [accValue, setAccValue] = useState('one');
	const [selectedTown, setSelectedTown] = useState<any>();
	const [selectedConstituency, setSelectedConstituency] = useState<any>();
	const [selectedLogo, setSelectedLogo] = useState<string>('');
	const logoRef = useRef<HTMLInputElement>(null);
	const [carWashServices, setCarWashServices] = useState<any>([]);
	const [toggle, setToggle] = useState(false);
	const [toggleError, setToggleError] = useState(false);

	const { data: towns } = useQuery({
		queryFn: fetchAllTowns,
		queryKey: ['towns'],
	});

	const { data: services } = useQuery({
		queryFn: fetchAllCarWashServices,
		queryKey: ['carWashServices'],
	});
	const { data: types } = useQuery({
		queryFn: fetchAllCarTypes,
		queryKey: ['carTypes'],
	});

	const constituencies = towns
		?.filter((town) =>
			town.constituencies.some((constituency) => constituency.townId === selectedTown)
		)
		.map((town) => town.constituencies)
		.flat();

	const areas = constituencies
		?.filter((constituency) =>
			constituency.areas.some((area) => area.constituencyId === selectedConstituency)
		)
		.map((constituency) => constituency.areas)
		.flat();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CarWashForm>({
		defaultValues: initialValues,
	});

	const handleContinueClick = (newValue: string) => {
		setAccValue(newValue);
	};

	const convertToBase64 = (file: File): Promise<string> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result as string);
			reader.onerror = (error) => reject(error);
		});
	};

	const companyLogoSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event?.target?.files;
		if (files && files.length > 0) {
			const file = files[0];
			const base64Image = await convertToBase64(file);
			setSelectedLogo(base64Image);
		}
	};

	const handleAddCarWashService = (newService: any) => {
		const newItem = {
			key: carWashServices.length + 1,
			...newService,
		};
		setCarWashServices([...carWashServices, newItem]);
	};

	const [result, setResult] = useState([]);

	useEffect(() => {
		let hasDuplicate = false;

		const newResult = carWashServices?.reduce((acc, item) => {
			const existingEntry = acc.find((entry) => entry.serviceId === item.serviceId);

			if (!existingEntry) {
				acc.push({
					serviceId: item.serviceId,
					carTypes: [{ id: item.carTypeId }],
					carTypeCosts: [
						{
							carTypeId: item.carTypeId,
							serviceId: item.serviceId,
							carWashId: 'carWashId',
							cost: parseFloat(item.cost),
						},
					],
				});
			} else {
				// Check for duplicates before adding a new carType
				const isCarTypeDuplicate = existingEntry.carTypes.some(
					(type) => type.id === item.carTypeId
				);

				if (!isCarTypeDuplicate) {
					existingEntry.carTypes.push({ id: item.carTypeId });

					// Check for duplicates before adding a new carTypeCost
					const isCarTypeCostDuplicate = existingEntry.carTypeCosts.some(
						(cost) => cost.carTypeId === item.carTypeId
					);

					if (!isCarTypeCostDuplicate) {
						existingEntry.carTypeCosts.push({
							carTypeId: item.carTypeId,
							serviceId: item.serviceId,
							carWashId: 'carWashId',
							cost: parseFloat(item.cost),
						});
					} else {
						console.error(errors);
						hasDuplicate = true;
					}
				} else {
					console.error(errors);
					hasDuplicate = true;
				}
			}

			return acc;
		}, []);

		setResult(newResult);

		// Display an error message or take action if a duplicate is found
		if (hasDuplicate) {
			setToggleError(true);
		}
	}, [carWashServices]);

	const handleRemoveItem = (key: any) => {
		const updatedServices = carWashServices.filter((item) => item.key !== key);
		setCarWashServices(updatedServices);
	};

	function convertToSlug(inputString: string) {
		// Convert to lowercase and replace spaces with hyphens
		const slug = inputString.toLowerCase().replace(/\s+/g, '-');

		// Remove special characters
		const cleanedSlug = slug.replace(/[^\w\-]+/g, '');

		return cleanedSlug;
	}
	const options = [
		{ name: '1 hour', time: 1 },
		{ name: '6 hours', time: 6 },
		{ name: '12 hours', time: 12 },
		{ name: '1 day', time: 24 },
		{ name: '2 days', time: 48 },
	];

	const handleSubmitForm: SubmitHandler<CarWashForm> = (data) => {
		try {
			if (selectedLogo) {
				data.logo = selectedLogo;
				// data.logo = '/assets/images/logo-placeholder-image.png';
			} else {
				data.logo = '/assets/images/logo-placeholder-image.png';
			}
			if (carWashServices && result) {
				data.carWashServices = result;
			}

			if (data?.name) {
				data.path = convertToSlug(data?.name);
			}
			onSubmit(data);
		} catch (error) {
			console.error('Error in handleSubmitForm:', error);
		}
	};
	return (
		<form className="md:w-4/6 w-full" onSubmit={handleSubmit(handleSubmitForm)}>
			<Accordion
				type="single"
				value={accValue}
				collapsible
				className="w-full p-2"
				defaultValue="one"
			>
				<AccordionItem value="one">
					<AccordionTrigger
						className="[&[data-state=open]>div>div]:bg-primary-600"
						onClick={() => handleContinueClick('one')}
					>
						<div className="flex items-center space-x-3">
							<div className="bg-secondary-200 text-white flex items-center justify-center text-xs p-2 h-4 w-4 rounded-full ">
								1
							</div>
							<span>Car Wash Details</span>
						</div>
					</AccordionTrigger>
					<AccordionContent>
						<div className="flex flex-col border rounded-b-lg">
							<div className="grid grid-cols-6 md:grid-cols-12 gap-4 p-2">
								<div className="md:col-span-4 col-span-6">
									<div className="flex flex-col items-center justify-center w-full space-y-2">
										<label
											htmlFor="logo"
											className="text-sm font-medium text-secondary-700"
										>
											Company Logo
										</label>

										<Image
											height={512}
											width={512}
											src={selectedLogo || logo_placeholder}
											alt="Staff Avatar Image"
											className="inline-flex items-center justify-center overflow-hidden rounded-md md:w-24 sm:h-10 md:h-24 sm:w-10 ring-2 ring-offset-1 ring-primary-600 bg-secondary-300"
										/>

										<input
											type="file"
											name="logo"
											id="logo"
											ref={logoRef}
											accept="image/*"
											placeholder="Staff Avatar"
											className="hidden"
											onChange={companyLogoSelected}
										/>
										<button
											onClick={() => logoRef.current?.click()}
											type="button"
											className="p-1 text-sm font-medium leading-4 bg-white border rounded-md shadow-sm border-secondary-300 text-secondary-700 hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-1"
										>
											Change
										</button>
									</div>
								</div>
								<div className="md:col-span-8 col-span-6 grid md:grid-cols-12 grid-cols-6 gap-4">
									<div className="col-span-8 space-y-1">
										<label
											htmlFor="name"
											className="block text-xs font-medium text-secondary-700"
										>
											Name <sup className="text-red-500">*</sup>
										</label>
										<input
											type="text"
											id="name"
											{...register('name', { required: true })}
											className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
										/>
										{errors.name && (
											<p className="text-xs text-red-500">
												Please enter a valid name
											</p>
										)}
									</div>

									<div className="col-span-5 space-y-1">
										<label
											htmlFor="branch"
											className="block text-xs font-medium text-secondary-700"
										>
											Branch <sup className="text-red-500">*</sup>
										</label>
										<input
											type="text"
											id="branch"
											{...register('branch', { required: true })}
											className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
										/>
									</div>
									<div className="col-span-9 space-y-1">
										<label
											htmlFor="location"
											className="block text-xs font-medium text-secondary-700"
										>
											Landmark <sup className="text-red-500">*</sup>
										</label>
										<input
											type="text"
											id="location"
											{...register('landmark', { required: true })}
											className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
										/>
									</div>

									<div className="md:col-span-4 col-span-12 space-y-1">
										<label
											htmlFor="town"
											className="block text-sm font-medium text-secondary-700"
										>
											Town <sup className="text-red-500">*</sup>
										</label>
										<select
											id="town"
											name="town"
											value={selectedTown}
											onChange={(e) => setSelectedTown(e.target.value)}
											className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
											required
										>
											<option
												selected
												disabled
												value=""
												className="text-opacity-50 text-secondary-700"
											>
												--Select Town--
											</option>
											{towns?.map((item) => (
												<option key={item?.id} value={item?.id}>
													{item?.name}
												</option>
											))}
										</select>
									</div>
									<div className="md:col-span-4 col-span-12 space-y-1">
										<label
											htmlFor="constituency"
											className="block text-sm font-medium text-secondary-700"
										>
											Constituency <sup className="text-red-500">*</sup>
										</label>
										<select
											id="constituency"
											name="constituency"
											value={selectedConstituency}
											onChange={(e) =>
												setSelectedConstituency(e.target.value)
											}
											className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
											required
											disabled={selectedTown ? false : true}
										>
											<option
												selected
												disabled
												value=""
												className="text-opacity-50 text-secondary-700"
											>
												--Select Constituency--
											</option>
											{constituencies?.map((item) => (
												<option key={item?.id} value={item?.id}>
													{item?.name}
												</option>
											))}
										</select>
									</div>
									<div className="md:col-span-4 col-span-12 space-y-1">
										<label
											htmlFor="areaId"
											className="block text-sm font-medium text-secondary-700"
										>
											Area
										</label>
										<select
											id="areaId"
											{...register('areaId', { required: true })}
											className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
											required
											disabled={selectedConstituency ? false : true}
										>
											<option
												selected
												disabled
												value=""
												className="text-opacity-50 text-secondary-700"
											>
												--Select Area--
											</option>
											{areas?.map((item) => (
												<option key={item?.id} value={item?.id}>
													{item?.name}
												</option>
											))}
										</select>
									</div>

									<div className="col-span-3 space-y-1">
										<label
											htmlFor="lat"
											className="block text-xs font-medium text-secondary-700"
										>
											Latitude <sup className="text-red-500">*</sup>
										</label>
										<input
											type="text"
											id="lat"
											{...register('lat', {
												required: true,
												pattern: /^([-+]?)([0-9]|[1-8][0-9]|90)\.(\d+)$/,
											})}
											className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
										/>
									</div>
									<div className="col-span-3 space-y-1">
										<label
											htmlFor="long"
											className="block text-xs font-medium text-secondary-700"
										>
											Longitude <sup className="text-red-500">*</sup>
										</label>
										<input
											type="text"
											id="long"
											{...register('long', {
												required: true,
												pattern:
													/^([-+]?)((([0-9]|[1-9][0-9]|1[0-7][0-9])\.(\d+))|180(\.0+)?)$/,
											})}
											className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
										/>
									</div>
									<div className="md:col-span-4 col-span-12 space-y-1">
										<label
											htmlFor="bookingLeadTime"
											className="block text-xs font-medium text-secondary-700"
										>
											LeadTime for Bookings
										</label>
										<select
											id="bookingLeadTime"
											{...register('bookingLeadTime', { required: true })}
											className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
											required
										>
											<option
												selected
												disabled
												value=""
												className="text-opacity-50 text-secondary-700"
											>
												--Select Time--
											</option>
											{options?.map((item: any, index: any) => (
												<option key={index} value={item?.time}>
													{item?.name}
												</option>
											))}
										</select>
									</div>
								</div>
							</div>
							<div className="w-full flex items-center py-2 justify-center">
								<button
									type="button"
									className="border rounded-md bg-secondary-600 text-white hover:bg-secondary-600/90 p-1"
									onClick={() => handleContinueClick('two')}
								>
									Continue
								</button>
							</div>
						</div>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="two">
					<AccordionTrigger
						className="[&[data-state=open]>div>div]:bg-primary-600"
						onClick={() => handleContinueClick('two')}
					>
						<div className="flex items-center space-x-3">
							<div className="bg-secondary-200 text-white flex items-center justify-center text-xs p-2 h-4 w-4 rounded-full ">
								2
							</div>

							<span className="text-base font-semibold text-secondary-600">
								Services
								<span className="text-xs font-semibold text-secondary-600/70 flex items-center">
									Click the + icon to add a new item and the
									<Icon icon="heroicons:trash-solid" /> icon to delete an item
								</span>
							</span>
						</div>
					</AccordionTrigger>
					<AccordionContent>
						<div className="flex flex-col border rounded-b-lg bg-primary-50 p-4">
							<div className="flex w-full divide-solid py-2">
								<button
									type="button"
									onClick={(e) => {
										e.stopPropagation();
										setToggle(true);
									}}
									className="bg-primary-600 text-white text-sm flex items-center p-2 rounded-md"
								>
									<Icon icon="heroicons:plus" /> <span> Add A Purchase Item</span>
								</button>
							</div>
							<div className="w-full flex flex-col space-y-3">
								<table className="w-full text-sm text-left rtl:text-right text-gray-500 border">
									<thead className="text-xs text-gray-700 uppercase bg-primary-300">
										<tr>
											<th scope="col" className="px-6 py-3">
												#
											</th>
											<th scope="col" className="px-6 py-3">
												Service
											</th>
											<th scope="col" className="px-6 py-3">
												Car Type
											</th>
											<th scope="col" className="px-6 py-3">
												Cost
											</th>
											<th scope="col" className="px-6 py-3"></th>
										</tr>
									</thead>
									<tbody>
										{carWashServices?.map((item) => (
											<tr key={item?.key} className="bg-white border-b">
												<th
													scope="row"
													className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
												>
													{item?.key}
												</th>
												<td className="px-6 py-4">
													{
														services?.find(
															(service) =>
																service?.id === item.serviceId
														)?.name
													}
												</td>
												<td className="px-6 py-4">
													{
														types?.find(
															(type) => type?.id === item.carTypeId
														)?.type
													}
												</td>
												<td className="px-6 py-4">{item?.cost} KES</td>
												<td className="px-6 py-4">
													<button
														onClick={() => handleRemoveItem(item?.key)}
														type="button"
													>
														<Icon icon="heroicons:trash" />
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
								{/* {carWashServices.map((item: any, index: any) => (
									<CarWashServiceForm
										key={index}
										initialValues={item}
										onClick={() => handleRemoveCarWashService(index)}
										onChange={(e) => handleChangeCarWashService(index, e)}
									/>
								))} */}
							</div>
							<div className="w-full flex items-center py-2 justify-center">
								<button
									type="submit"
									className={`border w-14 h-8 rounded-md flex items-center justify-center ${
										isPending
											? 'bg-slate-600 text-white'
											: 'bg-secondary-600 text-white hover:bg-secondary-600/90'
									}  p-1`}
									disabled={isPending ? true : false}
								>
									{isPending ? (
										<span>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												className="text-white h-5 w-5"
											>
												<path
													fill="currentColor"
													d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
												>
													<animateTransform
														attributeName="transform"
														dur="0.75s"
														repeatCount="indefinite"
														type="rotate"
														values="0 12 12;360 12 12"
													/>
												</path>
											</svg>
										</span>
									) : (
										<span>Save</span>
									)}
								</button>
							</div>
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
			{toggle && (
				<CarWashServiceForm
					setToggle={setToggle}
					addCarWashService={handleAddCarWashService}
				/>
			)}
			{toggleError && <DuplicateError setToggle={setToggleError} />}
		</form>
	);
}
