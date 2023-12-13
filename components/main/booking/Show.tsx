'use client';

import Map from '@/components/my-ui/Map';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import BorderlessSideBySideCalendar from '@/components/my-ui/BorderlessSideBySideCalendar';
import {
	addMonths,
	startOfMonth,
	endOfMonth,
	format,
	isSameDay,
	eachDayOfInterval,
	isSameMonth,
	add,
} from 'date-fns';

//Fetch A booking
const fetchDetails = async (slug: string) => {
	const response = await axios.get(`/api/booking/get/${slug}`);
	return response.data;
};

function classNames(...classes: string[]): string {
	return classes.filter(Boolean).join(' ');
}

export default function ShowBooking() {
	const params = useParams();
	const bookingId = params?.['booking-id'];
	const [currentMonth, setCurrentMonth] = useState(new Date());
	const { data, isPending } = useQuery({
		queryKey: ['detailStaff'],
		queryFn: () => {
			if (bookingId) {
				return fetchDetails(bookingId as string);
			} else {
				return Promise.reject(new Error('Booking Id not provided'));
			}
		},
	});

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

	const setAddTime = (time: any) => {
		try {
			const addingTime = add(new Date(time), { hours: 1 });
			const formattedTime = format(addingTime, 'h:mm a');
			return formattedTime;
		} catch (error) {
			console.error('Error in setAddTime:', error);
			return '';
		}
	};

	const dateVal = new Date(data?.bookingDate);
	const timeVal = new Date(data?.bookingTime);
	// console.log('Boooking Date & Time:', dateVal, timeVal);

	return (
		<div className="flex bg-primary-50 z-[6] fixed overflow-y-auto top-0 left-0 w-full h-full">
			<div className="bg-primary-100 w-full h-full flex justify-center">
				<div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
					<div className="max-w-xl">
						<h1 className="text-base font-medium text-indigo-600">Thank you !</h1>
						<h1 className="text-3xl font-medium text-indigo-600">
							{data?.customer?.name}
						</h1>
						<p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
							You have Made A booking at
							<br /> {data?.carWash?.name}
						</p>

						<dl className="mt-12 text-sm font-medium">
							<dt className="text-gray-900">
								Booking Details have been emailed to you at:
							</dt>
							<dd className="mt-2 text-indigo-600">{data?.customer?.email}</dd>
						</dl>
					</div>

					<div className="mt-10 border-t border-gray-200">
						<h2 className="sr-only">Your order</h2>

						<h3 className="sr-only">Items</h3>

						<div className="flex space-x-6 border-b border-gray-200 py-10">
							<div className="flex flex-auto flex-col">
								{data?.bookingService?.map((item: any) => (
									<div key={item?.id}>
										<div>
											<h4 className="font-medium text-gray-900">
												{item?.service?.name}
											</h4>
											<p className="mt-2 text-sm text-gray-600">
												{item?.service?.description}
											</p>
										</div>
										<div>
											<h4 className="font-medium text-gray-900">Quantity</h4>
											<p className="mt-2 text-sm text-gray-600">
												{item?.quantity}
											</p>
										</div>
									</div>
								))}
								<div className="mt-6 flex flex-1 items-end">
									<dl className="flex space-x-4 divide-x divide-gray-200 text-sm sm:space-x-6">
										<div className="flex">
											<dt className="font-medium text-gray-900">
												Service For:
											</dt>
											<dd className="ml-2 text-gray-700">
												{data?.carType?.type}
											</dd>
										</div>
										<div className="flex pl-4 sm:pl-6">
											<dt className="font-medium text-gray-900">Price:</dt>
											<dd className="ml-2 text-gray-700">
												KSH {data?.totalCost}
											</dd>
										</div>
									</dl>
								</div>
							</div>
						</div>

						<div className="sm:pl-6">
							<h3 className="sr-only">Your information</h3>

							<h4 className="sr-only">Addresses</h4>
							<dl className="grid grid-cols-2 gap-x-6 py-10 text-sm">
								<div>
									<dt className="font-medium text-gray-900">Shipping address</dt>
									<dd className="mt-2 text-gray-700">
										<address className="not-italic">
											<span className="block">
												{data?.carWash?.area?.constituency?.town?.name},
												{data?.carWash?.area?.constituency?.name},
												{data?.carWash?.area?.name}
											</span>
											<span className="block">{data?.carWash?.landmark}</span>
										</address>
									</dd>
								</div>
								<div>
									{data?.carWash?.lat &&
										data?.carWash?.long &&
										data.carWash.name && (
											<Map
												className="aspect-video w-full h-full pb-2"
												width="800"
												height="450"
												center={[data?.carWash.lat, data.carWash.long]}
												zoom={20}
											>
												{({ TileLayer, Marker, Popup }: any) => (
													<>
														<TileLayer
															url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
															attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
														/>
														<Marker
															position={[
																data.carWash.lat,
																data.carWash.long,
															]}
														>
															<Popup>{data.carWash.name} </Popup>
														</Marker>
													</>
												)}
											</Map>
										)}
								</div>
							</dl>

							<h4 className="sr-only">Payment</h4>
							<dl className="grid grid-cols-2 gap-x-6 border-t border-gray-200 py-10 text-sm">
								<div>
									<dt className="font-medium text-gray-900">Payment</dt>
									<dd className="mt-2 text-gray-700 flex flex-col space-y-2">
										<p>
											<span className="font-semibold">Total Amount Due </span>
											: KSH {data?.totalCost}
										</p>
										<p>
											{data?.paymentStatus === 0 ? (
												<span className="text-red-500">Not Paid</span>
											) : data?.paymentStatus === 1 ? (
												<span className="text-green-500">Paid</span>
											) : (
												<span className="text-primary-500">
													Partially Paid
												</span>
											)}
										</p>
									</dd>
								</div>
							</dl>

							<h3 className="sr-only">Summary</h3>

							<dl className="space-y-6 border-t border-gray-200 pt-10 text-sm">
								<div className="flex justify-between">
									<div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
										<BorderlessSideBySideCalendar
											month={format(currentMonth, 'MMMM')}
											year={format(currentMonth, 'yyyy')}
											days={daysArray}
											onPrevMonth={goToPreviousMonth}
											onNextMonth={goToNextMonth}
											selectedDate={data && format(dateVal, 'yyyy-MM-dd')}
											// selectedDate={'2023-12-17'}
										/>
										<section className="mt-12 md:mt-0 md:pl-14">
											<h2 className="text-base font-semibold leading-6 text-gray-900">
												Scheduled for{' '}
												<time
													dateTime={data && format(dateVal, 'yyyy-MM-dd')}
												>
													{data && format(dateVal, 'yyyy-MM-dd')}
												</time>
											</h2>
											<ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
												<li className="group flex items-center space-x-4 rounded-xl px-4 py-2 focus-within:bg-gray-100 hover:bg-gray-100">
													<div className="flex-auto">
														<p className="text-gray-900">
															A booking at {data?.carWash?.name}
														</p>
														<p className="mt-0.5">
															<time
																dateTime={
																	data &&
																	format(timeVal, 'h:mm a')
																}
															>
																{data && format(timeVal, 'h:mm a')}
															</time>{' '}
															-{' '}
															<time
																dateTime={
																	data && setAddTime(timeVal)
																}
															>
																{data && setAddTime(timeVal)}
															</time>
														</p>
													</div>
												</li>
											</ol>
										</section>
									</div>
								</div>
							</dl>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
