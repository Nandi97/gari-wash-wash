'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import formatISO from 'date-fns/formatISO';
import { useParams } from 'next/navigation';
import { Icon } from '@iconify/react/dist/iconify.js';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import {
	addMonths,
	startOfMonth,
	endOfMonth,
	format,
	isSameDay,
	eachDayOfInterval,
	isSameMonth,
} from 'date-fns';
import Link from 'next/link';

interface BookingForm {
	customer: { name: string; email: string; phoneNumber: string };
	carWashId: string;
	carTypeId: string;
	totalCost: number;
	bookingDate: string;
	bookingTime: string;
	bookingService: { serviceId: string }[];
}

interface BookingFormProps {
	onSubmit: SubmitHandler<BookingForm>;
	initialValues?: BookingForm;
	isPending: boolean;
}

export default function BookingForm({ onSubmit, initialValues, isPending }: BookingFormProps) {
	const params = useParams();
	const [currentMonth, setCurrentMonth] = useState(new Date());
	const cwId = params?.['car-wash-id'];
	const [dateOfBooking, setDateOfBooking] = useState<any>();
	const [timeOfBooking, setTimeOfBooking] = useState<any>();
	const [selectedService, setSelectedService] = useState<any>();

	const { data } = useQuery({
		queryKey: ['cws', cwId],
		queryFn: () =>
			axios
				.get('/api/car-wash-service/get', {
					params: { cwId },
				})
				.then((response) => response.data),
	});

	const carTypes = data
		?.filter((item) => item?.serviceId === selectedService)
		.map((item) => item?.carTypes)
		.flat();

	const serviceCost = data?.find((service) => service?.serviceId === selectedService)?.cost;

	const startOfMonthDate = startOfMonth(currentMonth);
	const endOfMonthDate = endOfMonth(currentMonth);

	const daysArray = eachDayOfInterval({ start: startOfMonthDate, end: endOfMonthDate }).map(
		(date) => ({
			date: format(date, 'yyyy-MM-dd'),
			isCurrentMonth: isSameMonth(date, currentMonth),
			isToday: isSameDay(date, new Date()),
		})
	);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<BookingForm>({
		defaultValues: initialValues,
	});

	function addHours(date: any, hours: any) {
		const newDate = new Date(date);
		newDate.setTime(newDate.getTime() + hours * 60 * 60 * 1000);
		return newDate;
	}

	const [formData, setFormData] = useState<any>(null);

	const handleTimeISOConvert = (time: any) => {
		const selectedTime = time;

		// Get the current date
		const currentDate = new Date();

		// Get the selected time's hours and minutes
		const [hours, minutes] = selectedTime.split(':');

		// Set the time in the current date
		const resultDate = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth(),
			currentDate.getDate(),
			parseInt(hours, 10),
			parseInt(minutes, 10)
		);

		const formattedResult = formatISO(resultDate);

		return formattedResult;
	};

	const handleSubmitForm: SubmitHandler<BookingForm> = (data) => {
		try {
			if (dateOfBooking && timeOfBooking && serviceCost) {
				data.bookingDate = formatISO(new Date(dateOfBooking));
				data.bookingTime = handleTimeISOConvert(timeOfBooking);
				data.totalCost = serviceCost;
			}

			data.carWashId = cwId as any;
			data.bookingService = [{ serviceId: selectedService }];
			// console.log('Form Data:', data);
			onSubmit(data);
		} catch (error) {
			console.error('Error in handleSubmitForm:', error);
		}
	};

	return (
		<form onSubmit={handleSubmit(handleSubmitForm)} className="bg-secondary-50 p-4 rounded-md">
			<div className="space-y-12">
				<div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
					<div>
						<h2 className="text-base font-semibold leading-7 text-gray-900">
							Customer Information
						</h2>
						<p className="mt-1 text-sm leading-6 text-gray-600">
							This information will be kept private
						</p>
					</div>

					<div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
						<div className="sm:col-span-3 col-span-1 space-y-1">
							<label
								htmlFor="name"
								className="block text-xs font-medium text-secondary-700"
							>
								Name <sup className="text-red-500">*</sup>
							</label>
							<input
								type="text"
								id="name"
								{...register('customer.name', { required: true })}
								className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
							/>
							{errors?.customer?.name && (
								<p className="text-xs text-red-500">Please enter a valid name</p>
							)}
						</div>
						<div className="sm:col-span-3 col-span-1 space-y-1">
							<label
								htmlFor="phone"
								className="block text-xs font-medium text-secondary-700"
							>
								Phone Number
							</label>
							<div className="mt-2">
								<div className="flex border border-secondary-300 text-sm font-medium p-2.5 h-8 focus:shadow-inner shadow-secondary-300  focus:border-secondary-500  px-3 py-1 rounded-md shadow-sm ring-1 ring-inset ring-gray-300  focus-within:ring-inset focus-within:ring-primary-600 sm:max-w-md hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1">
									<span className="flex select-none items-center pl-1 text-gray-500 sm:text-sm">
										+254
									</span>
									<input
										type="text"
										id="phone"
										{...register('customer.phoneNumber', {
											required: true,
											pattern: /^(7|11)\d{8}$/,
										})}
										className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
										placeholder="700000000"
									/>
								</div>
								{errors?.customer?.phoneNumber && (
									<p className="text-xs text-red-500">
										Please enter a valid Phone Number <br />
										either 7******** or 11*******
									</p>
								)}
							</div>
						</div>
						<div className="sm:col-span-4">
							<label
								htmlFor="email"
								className="block text-xs font-medium text-secondary-700"
							>
								Email address
							</label>
							<input
								type="email"
								id="email"
								className="sm:text-sm w-full bg-white bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
								{...register('customer.email', {
									pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
									required: true,
								})}
								placeholder="email@email.com"
							/>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
					<div>
						<h2 className="text-base font-semibold leading-7 text-gray-900">
							Booking Information
						</h2>
						<p className="mt-1 text-sm leading-6 text-gray-600">
							Use a permanent address where you can receive mail.
						</p>
						<div className="p-4 border hidden md:flex shadow-md rounded-md my-4">
							<ol className="mt-4 divide-y divide-gray-100 text-sm leading-6 lg:col-span-7 xl:col-span-8">
								<li className="relative flex xl:static">
									<div className="flex-auto">
										<h3 className="pr-10 font-semibold text-gray-900 xl:pr-0">
											Car Wash Service
										</h3>
										<dl className="mt-2 flex flex-col text-gray-700 xl:flex-row">
											<div className="flex items-start space-x-3">
												<dt className="mt-0.5">
													<span className="sr-only">Date</span>
													<Icon
														icon="heroicons:calendar"
														className="h-5 w-5 text-gray-700"
														aria-hidden="true"
													/>
												</dt>
												<dd className="text-primary-400 font-semibold">
													<time dateTime={`meeting.datetime`}>
														{dateOfBooking} at {timeOfBooking}
													</time>
												</dd>
											</div>
											<div className="mt-2 flex items-start space-x-3 xl:ml-3.5 xl:mt-0 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
												<dt className="mt-0.5">
													<span className="sr-only">Location</span>
													<Icon
														icon="heroicons:map"
														className="h-5 w-5 text-gray-700"
														aria-hidden="true"
													/>
												</dt>
												<dd className="text-primary-400 font-semibold">
													{data?.[0]?.carWash?.landmark}
												</dd>
											</div>
										</dl>
									</div>
								</li>
							</ol>
						</div>
					</div>
					<div className="w-full h-full md:col-span-2">
						<div className="grid w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 ">
							<div className="sm:col-span-4 space-y-1">
								<label
									htmlFor="name"
									className="block text-xs font-medium text-slate-700"
								>
									Car Wash
								</label>
								<div className="mt-2">
									<input
										type="text"
										name="name"
										id="name"
										autoComplete="given-name"
										className="sm:text-sm w-full bg-slate-50 bg-opacity-70 border-1  shadow-accent-300  block p-2.5 h-8  px-3 py-1 shadow-slate-300 rounded-md border border-slate-300 text-sm font-medium leading-4 text-slate-400 shadow-sm"
										disabled
										value={data?.[0]?.carWash?.name}
									/>
								</div>
							</div>
							<div className="sm:col-span-2 space-y-1 hidden md:flex"></div>
							<div className="sm:col-span-2 space-y-1">
								<label
									htmlFor="bookingDate"
									className="block text-xs font-medium text-secondary-700"
								>
									Booking Date
								</label>
								<div className="mt-2">
									<input
										type="date"
										name="bookingDate"
										min={new Date().toISOString().split('T')[0]}
										id="bookingDate"
										value={dateOfBooking}
										onChange={(e) => setDateOfBooking(e.target.value)}
										autoComplete="family-name"
										className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
										required
									/>
								</div>
							</div>
							<div className="sm:col-span-2 space-y-1">
								<label
									htmlFor="bookingTime"
									className="block text-xs font-medium text-secondary-700"
								>
									Booking Time
								</label>

								<input
									type="time"
									name="bookingTime"
									min="08:00"
									max="21:00"
									id="bookingTime"
									value={timeOfBooking}
									onChange={(e) => setTimeOfBooking(e.target.value)}
									autoComplete="family-name"
									className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
									required
								/>
							</div>
							<div className="sm:col-span-2 space-y-1 hidden md:flex"></div>
							<div className="sm:col-span-3 space-y-1">
								<label
									htmlFor="serviceId"
									className="block text-xs font-medium text-secondary-700"
								>
									Service
								</label>
								<select
									id="serviceId"
									name="serviceId"
									value={selectedService}
									onChange={(e) => setSelectedService(e.target.value)}
									className=" sm:text-sm w-full  bg-opacity-70 border-1 focus:shadow-inner bg-white border-secondary-300 shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
									disabled={data ? false : true}
								>
									<option
										disabled
										selected
										value=""
										className="text-opacity-50 text-secondary-700"
									>
										--Select Service--
									</option>
									{data ? (
										data?.map((item: any) => (
											<option key={item?.id} value={item?.serviceId}>
												{item?.service?.name}
											</option>
										))
									) : (
										<></>
									)}
								</select>
							</div>
							<div className="sm:col-span-3 space-y-1">
								<label
									htmlFor="carTypeId"
									className="block text-xs font-medium text-secondary-700"
								>
									Car Type
								</label>
								<select
									{...register('carTypeId', { required: true })}
									id="carTypeId"
									className={`${
										errors.carTypeId
											? 'bg-red-50 border-red-300'
											: 'bg-white border-secondary-300'
									} sm:text-sm w-full  bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1`}
									disabled={selectedService ? false : true}
								>
									<option
										disabled
										selected
										value=""
										className="text-opacity-50 text-secondary-700"
									>
										--Select Car Type--
									</option>
									{carTypes ? (
										carTypes?.map((item) => (
											<option key={item?.id} value={item?.id}>
												{item?.type}
											</option>
										))
									) : (
										<></>
									)}
								</select>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-6 flex items-center justify-end gap-x-6">
				<Link href="/booking" className="text-sm font-semibold leading-6 text-gray-900">
					Cancel
				</Link>
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
		</form>
	);
}
