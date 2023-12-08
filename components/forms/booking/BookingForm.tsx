'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import formatISO from 'date-fns/formatISO';
import { useParams } from 'next/navigation';
import { Icon } from '@iconify/react/dist/iconify.js';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import SmallCalendar from '@/components/my-ui/SmallCalendar';
import {
	addMonths,
	startOfMonth,
	endOfMonth,
	format,
	isSameDay,
	eachDayOfInterval,
	isSameMonth,
} from 'date-fns';

interface BookingForm {
	name: string;
	email: string;
	phoneNumber: string;
	carWashId: string;
	carTypeId: string;
	bookingDate: string;
	serviceId: string;
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

	// console.log('Current car wash:', data);
	// console.log('Current car wash:', selectedService);
	const carTypes = data
		?.filter((item) => item?.serviceId === selectedService)
		.map((item) => item?.carTypes)
		.flat();

	// console.log('Car Types:', carTypes);

	const goToPreviousMonth = () => {
		setCurrentMonth((prevMonth) => addMonths(prevMonth, -1));
	};

	const goToNextMonth = () => {
		setCurrentMonth((prevMonth) => addMonths(prevMonth, 1));
	};

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

	// console.log('Params:', params?.['car-wash-id']);

	const [formData, setFormData] = useState<any>(null);

	const handleTimeChange = (e: any) => {
		const selectedTime = e.target.value;

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

		// Add one hour to the result date
		const result1 = addHours(resultDate, 1);

		// Format the result date as ISO string
		const formattedResult = formatISO(result1);

		// Set the formatted date in the state
		setFormData(formattedResult);
	};

	// console.log(formData);

	return (
		<form action="" className="bg-secondary-50 p-4 rounded-md">
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
								{...register('name', { required: true })}
								className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
							/>
							{errors.name && (
								<p className="text-xs text-red-500">Please enter a valid name</p>
							)}
						</div>
						<div className="sm:col-span-3 col-span-1 space-y-1">
							<label
								htmlFor="phoneNumber"
								className="block text-xs font-medium text-secondary-700"
							>
								Phone Number
							</label>
							<div className="mt-2">
								<div className="flex border border-secondary-300 text-sm font-medium p-2.5 h-8 focus:shadow-inner shadow-secondary-300  focus:border-secondary-500  px-3 py-1 rounded-md shadow-sm ring-1 ring-inset ring-gray-300  focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1">
									<span className="flex select-none items-center pl-1 text-gray-500 sm:text-sm">
										+254
									</span>
									<input
										type="text"
										{...register('phoneNumber')}
										name="phoneNumber"
										id="phoneNumber"
										className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
										placeholder="700000000"
									/>
								</div>
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
								{...register('email', {
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
						<div className="p-4 border shadow-md rounded-md my-4">
							<ol className="mt-4 divide-y divide-gray-100 text-sm leading-6 lg:col-span-7 xl:col-span-8">
								<li className="relative flex xl:static">
									<div className="flex-auto">
										<h3 className="pr-10 font-semibold text-gray-900 xl:pr-0">
											Meeting Name
										</h3>
										<dl className="mt-2 flex flex-col text-gray-500 xl:flex-row">
											<div className="flex items-start space-x-3">
												<dt className="mt-0.5">
													<span className="sr-only">Date</span>
													<Icon
														icon="heroicons:calendar"
														className="h-5 w-5 text-gray-400"
														aria-hidden="true"
													/>
												</dt>
												<dd>
													<time dateTime={`meeting.datetime`}>
														{`meeting.date`} at {`meeting.time`}
													</time>
												</dd>
											</div>
											<div className="mt-2 flex items-start space-x-3 xl:ml-3.5 xl:mt-0 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
												<dt className="mt-0.5">
													<span className="sr-only">Location</span>
													<Icon
														icon="heroicons:map"
														className="h-5 w-5 text-gray-400"
														aria-hidden="true"
													/>
												</dt>
												<dd>{`meeting.location`}</dd>
											</div>
										</dl>
									</div>
								</li>
							</ol>
						</div>
						<div className="p-4 border shadow-md rounded-md my-4">
							<SmallCalendar
								month={format(currentMonth, 'MMMM')}
								year={format(currentMonth, 'yyyy')}
								days={daysArray}
								onPrevMonth={goToPreviousMonth}
								onNextMonth={goToNextMonth}
								selectedDate={dateOfBooking}
							/>
						</div>
					</div>

					<div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
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
									id="bookingDate"
									value={dateOfBooking}
									onChange={(e) => setDateOfBooking(e.target.value)}
									autoComplete="family-name"
									className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
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
								id="bookingTime"
								autoComplete="family-name"
								className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
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
									defaultValue=""
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
						<div className="sm:col-span-4">
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Email address
							</label>
							<div className="mt-2">
								<input
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div className="sm:col-span-3">
							<label
								htmlFor="country"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Country
							</label>
							<div className="mt-2">
								<select
									id="country"
									name="country"
									autoComplete="country-name"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
								>
									<option>United States</option>
									<option>Canada</option>
									<option>Mexico</option>
								</select>
							</div>
						</div>

						<div className="col-span-full">
							<label
								htmlFor="street-address"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Street address
							</label>
							<div className="mt-2">
								<input
									type="text"
									name="street-address"
									id="street-address"
									autoComplete="street-address"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div className="sm:col-span-2 sm:col-start-1">
							<label
								htmlFor="city"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								City
							</label>
							<div className="mt-2">
								<input
									type="text"
									name="city"
									id="city"
									autoComplete="address-level2"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div className="sm:col-span-2">
							<label
								htmlFor="region"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								State / Province
							</label>
							<div className="mt-2">
								<input
									type="text"
									name="region"
									id="region"
									autoComplete="address-level1"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div className="sm:col-span-2">
							<label
								htmlFor="postal-code"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								ZIP / Postal code
							</label>
							<div className="mt-2">
								<input
									type="text"
									name="postal-code"
									id="postal-code"
									autoComplete="postal-code"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-6 flex items-center justify-end gap-x-6">
				<button type="button" className="text-sm font-semibold leading-6 text-gray-900">
					Cancel
				</button>
				<button
					type="submit"
					className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
					Save
				</button>
			</div>
		</form>
	);
}
