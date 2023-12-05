'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from '@/components/ui/Accordion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import logo_placeholder from '@/public/assets/images/logo-placeholder-image.png';
import CarWashServiceForm from './CarWashServices';
import { Icon } from '@iconify/react/dist/iconify.js';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Item } from '@radix-ui/react-accordion';
import { Town } from '@/lib/types/town';

interface CarWashForm {
	name: string;
	logo: string;
	path: string;
	branch: string;
	location: string;
	mapsLink: string;
	carWashServices: [
		{
			serviceId: string;
			cost: number;
			carTypeId: string;
		},
	];
	areaId: string;
}
interface CarWashFormProps {
	onSubmit: SubmitHandler<CarWashForm>;
	initialValues?: CarWashForm;
	isPending: boolean;
}

const fetchAllTowns = async () => {
	const response = await axios.get('/api/town/get');
	return response.data as Array<Town>;
};
export default function CarWashForm({ onSubmit, initialValues, isPending }: CarWashFormProps) {
	const [accValue, setAccValue] = useState('one');
	const [selectedTown, setSelectedTown] = useState<any>();
	const [selectedConstituency, setSelectedConstituency] = useState<any>();
	const [selectedLogo, setSelectedLogo] = useState<string>('');
	const logoRef = useRef<HTMLInputElement>(null);
	const [carWashServices, setCarWashServices] = useState<any>([
		{
			serviceId: '',
			cost: 0,
			carTypeId: '',
		},
	]);

	const { data: towns } = useQuery({
		queryFn: fetchAllTowns,
		queryKey: ['towns'],
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

	// console.log('Towns:', selectedTown);
	// console.log('Towns:', selectedConstituency);
	// console.log('Towns:', constituencies);
	// console.log('Towns:', areas);

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

	const handleAddCarWashService = () => {
		const newItem = {
			serviceId: '',
			cost: 0,
			carTypeId: '',
		};
		setCarWashServices([...carWashServices, newItem]);
	};

	const handleRemoveCarWashService = (index: any) => {
		const updatedItems = [...carWashServices];
		updatedItems.splice(index, 1);
		setCarWashServices(updatedItems);
	};

	const handleChangeCarWashService = (index: any, event: any) => {
		const { name, value } = event.target;
		const updatedItems = [...carWashServices];
		updatedItems[index][name] = value;
		setCarWashServices(updatedItems);
	};

	const handleSubmitForm: SubmitHandler<CarWashForm> = (data) => {
		try {
			if (selectedLogo) {
				data.logo = selectedLogo;
			} else {
				data.logo = logo_placeholder.src;
			}
			if (carWashServices) {
				data.carWashServices = carWashServices;
			}

			// console.log('Form Data:', data);
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
									<div className="col-span-6 space-y-1">
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
									<div className="col-span-6 space-y-1">
										<label
											htmlFor="path"
											className="block text-xs font-medium text-secondary-700"
										>
											Path <sup className="text-red-500">*</sup>
										</label>
										<input
											type="text"
											id="path"
											{...register('path', {
												required: true,
												pattern:
													/^[a-zA-Z]{10}-[a-zA-Z]{10}(-[a-zA-Z]{10})?$/,
											})}
											className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
										/>
										{errors.path && (
											<p className="text-xs text-red-500">
												Please enter a valid pattern like
												&apos;abc-abc&apos; or &apos;abc-abc-abc&apos;.
											</p>
										)}
									</div>
									<div className="col-span-6 space-y-1">
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
									<div className="col-span-6 space-y-1">
										<label
											htmlFor="location"
											className="block text-xs font-medium text-secondary-700"
										>
											Landmark <sup className="text-red-500">*</sup>
										</label>
										<input
											type="text"
											id="location"
											{...register('location', { required: true })}
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

									<div className="col-span-6 space-y-1">
										<label
											htmlFor="mapsLink"
											className="block text-xs font-medium text-secondary-700"
										>
											Maps Link <sup className="text-red-500">*</sup>
										</label>
										<input
											type="text"
											id="mapsLink"
											{...register('mapsLink', { required: true })}
											className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
										/>
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
									onClick={handleAddCarWashService}
									className="bg-primary-600 text-white text-sm flex items-center p-2 rounded-md"
								>
									<Icon icon="heroicons:plus" /> <span> Add A Purchase Item</span>
								</button>
							</div>
							<div className="w-full flex flex-col space-y-3">
								{carWashServices.map((item: any, index: any) => (
									// console.log('Item:', item)
									<CarWashServiceForm
										key={index}
										initialValues={item}
										onClick={() => handleRemoveCarWashService(index)}
										onChange={(e) => handleChangeCarWashService(index, e)}
									/>
								))}
							</div>
							<div className="w-full flex items-center py-2 justify-center">
								<button
									type="submit"
									className="border rounded-md bg-secondary-600 text-white hover:bg-secondary-600/90 p-1"
								>
									Save
								</button>
							</div>
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</form>
	);
}
