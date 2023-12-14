import * as React from 'react';
import { Tailwind, Font, Head } from '@react-email/components';
import { format, add } from 'date-fns';

interface ClientBookingConfirmationProps {
	data?: any;
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

	const dateVal = new Date(data?.bookingDate);
	const timeVal = new Date(data?.bookingTime);

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
				<title>Purchase Order Email</title>
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

			<body className="overflow-y-auto flex flex-col max-h-96  bg-gradient-to-br from-primary-500/10 to-secondary-500/10 p-2">
				<div
					style={{
						display: 'flex',
						overflowY: 'auto',
						position: 'fixed',
						top: '0',
						left: '0',
						width: '100%',
						height: '100%',
						zIndex: '6',
						backgroundColor: '#eef6ff',
					}}
				>
					<div className="bg-primary-100 w-full h-full flex justify-center px-4 py-8">
						<div className="mx-auto max-w-3xl">
							<div className="max-w-xl">
								<h1 className="text-base font-medium text-primary-600">
									Thank you !
								</h1>
								<h1 className="text-1xl font-medium text-primary-600">
									{data?.customer?.name}
								</h1>
								<p className="mt-2 text-2xl font-bold text-gray-900 tracking-tight sm:text-5xl">
									You have Made A booking at
									<br /> {carWash?.name}
								</p>
							</div>

							<div className="text-sm w-full grid grid-cols-3">
								<div className="col-span-1 w-full">
									<h2 className="text-base font-semibold leading-6 text-gray-900">
										Scheduled for{' '}
										<time dateTime={data && format(dateVal, 'yyyy-MM-dd')}>
											{data && format(dateVal, 'yyyy-MM-dd')}
										</time>
									</h2>
									<ol className="mt-4 w-full space-y-1 text-sm leading-6 text-gray-500">
										<li className="group flex items-center space-x-4 rounded-xl p-2 focus-within:bg-gray-100 hover:bg-gray-100">
											<div className="flex-auto">
												<p className="text-gray-900">A booking</p>
												<p className="mt-0.5">
													<time
														dateTime={data && format(timeVal, 'h:mm a')}
													>
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
								</div>
								<div className="col-span-1 w-full">
									<p className="font-medium text-gray-900">Price:</p>
									<p className="ml-2 text-gray-700">KSH {data?.totalCost}</p>
								</div>
								<div className="col-span-1 w-full">
									<div className="grid grid-cols-2 gap-2 text-sm">
										<div className="md:col-span-1 col-span-2">
											<p className="font-medium text-gray-900">Address</p>
											<div className="mt-2 text-gray-700">
												<address className="not-italic">
													<span className="block">
														{carWash?.area?.constituency?.town?.name},
														{carWash?.area?.constituency?.name},
														{carWash?.area?.name}
													</span>
													<span className="block">
														{carWash?.landmark}
													</span>
												</address>
												<span>
													<a
														className="text-primary-700 underline font-semibold"
														href={`http://www.google.com/maps/place/${carWash?.lat},${carWash?.long}`}
													>
														Open Maps For Directions
													</a>
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</body>
		</Tailwind>
	);
};
