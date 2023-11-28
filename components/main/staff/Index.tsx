'use client';

import OptDropdown from '@/components/my-ui/OptDropdown';
import SearchInput from '@/components/my-ui/SearchInput';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/Skeleton';
import Image from 'next/image';

interface Staff {
	id: string;
	name: string;
	email: string;
	image: string;
	staffNo: string;
	phoneNumber: string;
	address: string;
	about: string;
	city: string;
	stateProvince: string;
	zipPostalCode: string;
	createdById: string;
	designationId: string;
	carWashId: string;
	deletedAt: null;
	createdAt: string;
	updatedAt: string;
	designation: {
		id: string;
		name: string;
		description: string;
		carWashId: string;
		deletedAt: null;
		createdAt: string;
		updatedAt: string;
	};
}

export default function IndexStaff() {
	const [searchParam, setSearchParam] = useState<any>();
	const params = useParams();
	const carWashId = params?.['car-wash-id'];

	const { data, isPending } = useQuery({
		queryKey: ['detailStaff', carWashId, searchParam],
		queryFn: () =>
			axios
				.get('/api/staff/get', {
					params: { slug: carWashId, searchParam },
				})
				.then((response) => response.data),
	});

	const staff: Staff[] = data?.data;

	const handleSearch = (searchInput: any) => {
		setSearchParam(searchInput);
	};

	const newStaffMember = () => {
		console.log('new Staff Member');
	};

	const editStaffMember = (staffId: string) => {
		console.log('edit Staff Member:', staffId);
	};

	const exportStaffList = () => {
		console.log('new Staff Member');
	};
	// Header Dropdown
	const headerOptBtnTxt = {
		icon: 'heroicons:chevron-down',
		name: 'Options',
		buttonClassName:
			'inline-flex items-center justify-center w-full h-8 px-4 text-xs text-white rounded-sm shadow-sm bg-secondary-600 focus:outline-none focus:ring-2 focus:ring-secondary-600 focus:ring-offset-0 focus:ring-offset-secondary-100',
		iconClassName: '',
	};

	const headerOptionsList = [
		{ name: 'New Staff Member', action: newStaffMember, icon: 'heroicons:user-plus' },
		{
			name: 'Export Staff List',
			action: exportStaffList,
			icon: 'vscode-icons:file-type-excel2',
		},
	];

	// Table Dopdown
	const tableOptBtnTxt = {
		icon: 'heroicons:ellipsis-horizontal',
		buttonClassName:
			'flex items-center justify-center w-full h-8 px-4 text-secondary-900 rounded-sm hover:shadow-sm z-20',
	};

	const tableOptionsList = [];

	const nameAbbreviation = (name: string) => {
		const abbreviation = name
			.split(' ')
			.slice(0, 2)
			.map((n) => n[0])
			.join('')
			.toUpperCase();
		return abbreviation;
	};

	// console.log('Params:', carWashId);
	console.log('Staff:', staff);
	// console.log('Data:', data);
	// console.log('Search Input:', searchParam);
	return (
		<div className="mt-10">
			<div className="sticky z-20 md:flex items-center justify-between gap-2 bg-white top-2 hidden">
				<h1 className="text-lg font-extralight text-accent-700"></h1>
				<div className="inline-flex items-center space-x-2">
					<SearchInput onSearch={handleSearch} />
					<OptDropdown optBtn={headerOptBtnTxt} optionsList={headerOptionsList} />
				</div>
			</div>
			<div className="shadow overscroll-none ring-1 ring-black ring-opacity-5 md:rounded-md">
				<div className="flex-col hidden lg:flex">
					<table className="table-auto divide-y divide-primary-100">
						<thead className="sticky z-10 top-10 bg-secondary-600 text-secondary-50">
							<tr>
								<th
									scope="col"
									className="sticky top-0 py-3.5 pl-4 pr-3 text-center text-sm font-semibold"
								>
									Staff ID #
								</th>
								<th
									scope="col"
									className="sticky top-0 py-3.5 pl-4 pr-3 text-left text-sm font-semibold  sm:pl-6"
								>
									Name
								</th>
								<th
									scope="col"
									className="sticky top-0 px-3 py-3.5 text-left text-sm font-semibold "
								>
									Designation
								</th>
								<th
									scope="col"
									className="sticky top-0 px-3 py-3.5 text-left text-sm font-semibold "
								>
									E-mail Address
								</th>
								<th
									scope="col"
									className="sticky top-0 px-3 py-3.5 text-center text-sm font-semibold "
								>
									Phone Number
								</th>
								<th
									scope="col"
									className="sticky top-0 px-3 py-3.5 text-left text-sm font-semibold "
								>
									Status
								</th>
								<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
									<span className="sr-only">Edit</span>
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{staff?.map((item, index: any) => {
								if (isPending) {
									return (
										<tr key={index}>
											<td
												colSpan={9}
												className="flex items-center justify-center w-full px-3 py-2 text-sm text-center whitespace-nowrap text-secondary-500"
											>
												<Skeleton className="w-full h-full" />
											</td>
										</tr>
									);
								} else {
									return (
										<tr
											key={item?.id}
											className={`hover:bg-primary-100/95 ${
												index % 2 && index !== 0
													? 'bg-secondary-100/95'
													: ''
											}`}
										>
											{/* <td className="px-3 py-2 text-sm text-center whitespace-nowrap text-secondary-500">
												{index + 1}
											</td> */}
											<td className="px-3 py-2 text-sm text-center whitespace-nowrap text-secondary-500">
												{item?.staffNo}
											</td>
											<td className="py-2 pl-4 pr-3 text-sm whitespace-nowrap sm:pl-6">
												<div className="flex items-center gap-2">
													{item?.image ? (
														<span className="inline-flex items-center justify-center rounded-full h-7 w-7 bg-secondary-500">
															<span className="font-medium leading-none text-white">
																{nameAbbreviation(item?.name)}
															</span>
														</span>
													) : (
														<Image
															height={200}
															width={200}
															className="rounded-full h-7 w-7"
															src={item?.image}
															alt=""
														/>
													)}

													<div className="font-medium text-secondary-900">
														{item?.name}
													</div>
												</div>
											</td>
											<td className="px-3 py-2 text-sm whitespace-nowrap text-secondary-500">
												<div className="text-secondary-900">
													{item?.designation?.name}
												</div>
											</td>
											<td className="px-3 py-2 text-sm whitespace-nowrap text-primary-500">
												{item?.email}
											</td>
											<td className="px-3 py-2 text-sm whitespace-nowrap text-primary-500">
												{`+${item?.phoneNumber}`}
											</td>
											<td className="px-3 py-2 text-sm whitespace-nowrap text-secondary-500">
												<span
													className={`inline-flex rounded-full  px-2 text-xs font-semibold leading-5 ${
														item?.deletedAt === null
															? 'text-green-800 bg-green-100'
															: 'text-red-800 bg-red-100'
													}`}
												>
													{item?.deletedAt === null
														? 'Active'
														: 'Inactive'}
												</span>
											</td>
											<td className="relative py-2 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-6">
												<button
													type="button"
													className="flex items-center justify-center w-5 h-5 p-1 rounded hover:bg-primary-700 hover:bg-opacity-20"
												>
													<OptDropdown
														optBtn={tableOptBtnTxt}
														optionsList={[
															{
																action: () =>
																	editStaffMember(item?.id),
																name: 'Edit Staff',
																icon: 'heroicons:pencil-square',
															},
															// item.deletedAt === null
															// 	? {
															// 			action: () =>
															// 				deactivateStaff(
															// 					person?.id
															// 				),
															// 			name: 'Deactivate Staff',
															// 			icon: 'heroicons:user-minus',
															// 	  }
															// 	: {
															// 			action: () =>
															// 				activateStaff(
															// 					person?.id
															// 				),
															// 			name: 'Activate Staff',
															// 			icon: 'heroicons:user-plus',
															// 	  },

															// ...tableOptionsList,
														]}
													/>
												</button>
											</td>
										</tr>
									);
								}
							})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
