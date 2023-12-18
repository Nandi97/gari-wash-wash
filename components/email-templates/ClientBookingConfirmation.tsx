/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
import { Tailwind, Font, Head } from '@react-email/components';
import { format, add } from 'date-fns';

interface ClientConfData {
	customer: {
		name: string;
		phoneNumber: string;
		email: string;
		customerCarsDetails: {
			numberPlate: string;
			carTypeId: string;
		}[];
	};
	bookingDate: string | number | Date;
	bookingTime: string | number | Date;
	totalCost: number;
	carTypeId: string;
	carWashId: string;
	bookingService: { serviceId: string }[];
}

interface ClientBookingConfirmationProps {
	data: ClientConfData;
	carWash?: any;
}

// export function Email() {
export const Email: React.FC<Readonly<ClientBookingConfirmationProps>> = ({ data, carWash }) => {
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

	const dateVal = new Date(data.bookingDate);
	const timeVal = new Date(data.bookingTime);

	return (
		<Tailwind
			config={{
				theme: {
					extend: {
						colors: {
							primary: {
								50: '#eef6ff',
								100: '#d9eaff',
								200: '#bbdbff',
								300: '#8cc5ff',
								400: '#56a4ff',
								500: '#2f7fff',
								600: '#195ef7',
								700: '#1149e4',
								800: '#153bb8',
								900: '#173791',
								950: '#101d49',
							},
							secondary: {
								50: '#f1f9fe',
								100: '#e2f2fc',
								200: '#bfe6f8',
								300: '#86d1f3',
								400: '#46baea',
								500: '#29abe2',
								600: '#1082b9',
								700: '#0e6896',
								800: '#10577c',
								900: '#134967',
								950: '#0d2f44',
							},
						},
					},
				},
			}}
		>
			<Head>
				<title>Booking Confirmation Email</title>
				<Font
					fontFamily="Roboto"
					fallbackFontFamily="Verdana"
					webFont={{
						url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
						format: 'woff2',
					}}
					fontWeight={400}
					fontStyle="normal"
				/>
			</Head>
			<section className="max-w-2xl px-6 py-8 mx-auto bg-primary-50 dark:bg-gray-900">
				<main className="mt-8">
					<h2 className="text-gray-700 dark:text-gray-200">Hi {data?.customer?.name},</h2>

					<p className="mt-2 leading-loose text-gray-600 dark:text-gray-300">
						Your Car wash Booking has been made at <br />
						<span className="font-semibold ">{carWash?.name}</span>.
					</p>

					<div className="px-6 py-2 mt-2 w-full text-sm font-medium tracking-wider text-gray-600 capitalize">
						<div>
							Scheduled for
							<time dateTime={data && format(dateVal, 'do, MMMM yyyy')}>
								{data && format(dateVal, 'do, MMMM yyyy')}
							</time>
							<ol className="mt-1 w-full space-y-1 text-sm text-gray-500">
								<li className="group flex items-center  rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
									<div>
										<p className="text-gray-900 font-semibold">
											Booking Time:{' '}
										</p>
										<p className="mt-0.5">
											<time dateTime={data && format(timeVal, 'h:mm a')}>
												{data && format(timeVal, 'h:mm a')}
											</time>{' '}
											-{' '}
											<time dateTime={data && setAddTime(timeVal)}>
												{data && setAddTime(timeVal)}
											</time>
										</p>
									</div>
								</li>
							</ol>
							<div className="flex items-center">
								<p className="font-semibold text-gray-900">Price :</p>{' '}
								<p className="ml-2 text-gray-700">KSH {data?.totalCost}</p>
							</div>
							<div className="flex items-center">
								<p className="font-semibold text-gray-900">For Vehicle :</p>{' '}
								{data &&
									data.customer.customerCarsDetails.map(
										(item: any, index: any) => (
											<p key={index} className="ml-2 text-gray-700">
												{item.numberPlate}
											</p>
										)
									)}
							</div>
						</div>
					</div>
					<div className="px-6 py-2 mt-2 text-sm font-medium tracking-wider text-primary-600 capitalize">
						<p className=" text-gray-900 font-semibold">Address :</p>
						<div className="mt-1 text-gray-700">
							<address className="not-italic">
								<span className="block">
									{carWash?.area?.constituency?.town?.name},{' '}
									{carWash?.area?.constituency?.name}, {carWash?.area?.name}
								</span>
								<span className="block">Along/ Close to {carWash?.landmark}</span>
							</address>
							<span>
								<a
									className="text-primary-700 underline hover:text-primary-700/70 font-semibold"
									href={`http://www.google.com/maps/place/${carWash?.lat},${carWash?.long}`}
								>
									Open Maps For Directions
								</a>
							</span>
						</div>
					</div>
				</main>

				<footer className="mt-8">
					<p className="text-gray-500 dark:text-gray-400">
						This email was sent to{' '}
						<a
							href={`mailto:${data?.customer?.email}`}
							className="text-primary-600 hover:underline dark:text-primary-400"
							target="_blank"
						>
							{data?.customer?.email}
						</a>
						. If you&apos;d rather not receive this kind of email, you can{' '}
						<a
							href="#"
							className="text-primary-600 hover:underline dark:text-primary-400"
						>
							manage your email preferences
						</a>
						.
					</p>

					<p className="mt-3 text-gray-500 dark:text-gray-400">
						© {new Date().getFullYear()} {carWash?.name}. All Rights Reserved.
					</p>
					<img
						className="w-auto h-3"
						src="https://utfs.io/f/e43a6157-f92e-4030-b447-65073bf55b79-9zv8vt.png"
						alt="logo"
					/>
				</footer>
			</section>
		</Tailwind>
	);
};
