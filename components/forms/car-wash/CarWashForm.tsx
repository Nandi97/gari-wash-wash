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
}
interface CarWashFormFormProps {
	onSubmit: SubmitHandler<CarWashForm>;
	initialValues?: CarWashForm;
	isPending: boolean;
}
export default function CarWashForm() {
	const [accValue, setAccValue] = useState('one');
	const [selectedLogo, setSelectedLogo] = useState<string>('');
	const logoRef = useRef<HTMLInputElement>(null);

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
	// console.log(selectedLogo);

	return (
		<form className="md:w-4/6 w-full">
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
											Name
										</label>
										<input
											type="text"
											name="name"
											id="name"
											className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
										/>
									</div>
									<div className="col-span-6 space-y-1">
										<label
											htmlFor="path"
											className="block text-xs font-medium text-secondary-700"
										>
											Path
										</label>
										<input
											type="text"
											name="path"
											id="path"
											className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
										/>
									</div>
									<div className="col-span-6 space-y-1">
										<label
											htmlFor="branch"
											className="block text-xs font-medium text-secondary-700"
										>
											Branch
										</label>
										<input
											type="text"
											name="branch"
											id="branch"
											className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
										/>
									</div>
									<div className="col-span-6 space-y-1">
										<label
											htmlFor="location"
											className="block text-xs font-medium text-secondary-700"
										>
											Location
										</label>
										<input
											type="text"
											name="location"
											id="location"
											className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
										/>
									</div>
									<div className="col-span-6 space-y-1">
										<label
											htmlFor="mapsLink"
											className="block text-xs font-medium text-secondary-700"
										>
											Maps Link
										</label>
										<input
											type="text"
											name="mapsLink"
											id="mapsLink"
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
							<span>Services</span>
						</div>
					</AccordionTrigger>
					<AccordionContent>
						<div className="flex flex-col border rounded-b-lg bg-primary-50 p-4">
							<div className="w-full ">
								<CarWashServiceForm />
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
