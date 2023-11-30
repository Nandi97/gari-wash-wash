import Image from 'next/image';
import Link from 'next/link';
import OptDropdown from '@/components/my-ui/OptDropdown';
import { StaffType } from '@/lib/types/staff';
import { Skeleton } from '@/components/ui/Skeleton';

interface IndexTableProps {
	data: StaffType[];
	pathname: any;
	isPending: boolean;
}

export default function IndexTable({ data, pathname, isPending }: IndexTableProps) {
	// Table Dopdown
	const tableOptBtnTxt = {
		icon: 'heroicons:ellipsis-horizontal',
		buttonClassName:
			'flex items-center justify-center w-full h-8 px-4 text-secondary-900 rounded-sm hover:shadow-sm z-20',
	};

	const nameAbbreviation = (name: string) => {
		const abbreviation = name
			.split(' ')
			.slice(0, 2)
			.map((n) => n[0])
			.join('')
			.toUpperCase();
		return abbreviation;
	};

	const editStaffMember = (staffId: string) => {
		console.log('edit Staff Member:', staffId);
	};
	return (
		<>
			<div className="flex-col hidden lg:flex">
				<table className="table-auto divide-y divide-primary-100">
					<thead className="sticky z-10 top-20 bg-secondary-600 text-secondary-50">
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
						{data?.map((item, index: any) => {
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
											index % 2 && index !== 0 ? 'bg-secondary-100/95' : ''
										}`}
									>
										<td className="px-3 py-2 text-sm text-center whitespace-nowrap text-secondary-500">
											{item?.staffNo}
										</td>
										<td className="py-2 pl-4 pr-3 text-sm whitespace-nowrap sm:pl-6">
											<Link
												href={`${pathname}/${item.id}`}
												className="flex items-center gap-2"
											>
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
											</Link>
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
												{item?.deletedAt === null ? 'Active' : 'Inactive'}
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
															action: () => editStaffMember(item?.id),
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
		</>
	);
}
