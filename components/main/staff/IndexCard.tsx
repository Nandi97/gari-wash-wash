import OptDropdown from '@/components/my-ui/OptDropdown';
import { StaffType } from '@/lib/types/staff';
import Image from 'next/image';

interface IndexTableProps {
	data: StaffType[];
	pathname: any;
	isPending: boolean;
}

export default function IndexCard({ data, pathname, isPending }: IndexTableProps) {
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
			<div className="flex-col lg:hidden flex">
				{data?.map((item, index: any) => {
					if (isPending) {
						return (
							<div
								key={index}
								className="flex w-full h-20 animate-pulse bg-slate-400 rounded-md"
							></div>
						);
					} else {
						return (
							<div
								key={index}
								className="relative px-2 pt-7 pb-2 flex flex-col rounded-md shadow w-full"
							>
								<div className="absolute top-0 right-0">
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
								</div>
								<div className="w-full grid grid-cols-12">
									<div className="col-span-3">
										{item?.image ? (
											<span className="inline-flex items-center justify-center rounded-full h-16 w-16 bg-secondary-500">
												<span className="font-medium leading-none text-white">
													{nameAbbreviation(item?.name)}
												</span>
											</span>
										) : (
											<Image
												height={200}
												width={200}
												className="rounded-full h-16 w-16"
												src={item?.image}
												alt=""
											/>
										)}
									</div>
									<div className="w-full col-span-9">
										<table className="table-auto w-full divide-y divide-primary-100">
											<thead className=" z-10 bg-secondary-600 text-secondary-50">
												<tr>
													<th
														scope="col"
														className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold"
													></th>
													<th
														scope="col"
														className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold  sm:pl-6"
													></th>
												</tr>
											</thead>
											<tbody className="bg-white divide-y divide-gray-200">
												<tr
													className="hover:bg-primary-100/95 bg-secondary-100/95 
													"
												>
													<td className="px-3 py-2 text-sm  text-secondary-500">
														Name :
													</td>
													<td className="px-3 py-2 text-sm ">
														{item?.name}
													</td>
												</tr>
												<tr
													className="hover:bg-primary-100/95 bg-secondary-100/95 
													"
												>
													<td className="px-3 py-2 text-sm  text-secondary-500">
														Designation :
													</td>
													<td className="px-3 py-2 text-sm ">
														{item?.designation?.name}
													</td>
												</tr>
												<tr
													className="hover:bg-primary-100/95 bg-secondary-100/95 
													"
												>
													<td className="px-3 py-2 text-sm  text-secondary-500">
														Staff No :
													</td>
													<td className="px-3 py-2 text-sm ">
														{item?.staffNo}
													</td>
												</tr>
												<tr
													className="hover:bg-primary-100/95 bg-secondary-100/95 
													"
												>
													<td className="px-3 py-2 text-sm  text-secondary-500">
														Email :
													</td>
													<td className="px-3 py-2 text-sm ">
														{item?.email}
													</td>
												</tr>
												<tr
													className="hover:bg-primary-100/95 bg-secondary-100/95 
													"
												>
													<td className="px-3 py-2 text-sm  text-secondary-500">
														Phone No :
													</td>
													<td className="px-3 py-2 text-sm ">
														{item?.phoneNumber}
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						);
					}
				})}
			</div>
		</>
	);
}
