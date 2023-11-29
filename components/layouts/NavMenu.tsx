'use client';

import { Menu, Transition } from '@headlessui/react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Fragment, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface MenuProps {
	id: number;
	name: string;
	url: string;
	icon: string;
	listOrder: number;
}

//Fetch All Menus
const fetchAllMenus = async () => {
	const response = await axios.get('/api/menu/get');
	return response.data;
};

interface NavMenuProps {
	user?: any;
}

export default function NavMenu({ user }: NavMenuProps) {
	const pathname = usePathname();
	const { data } = useQuery<MenuProps[]>({
		queryFn: fetchAllMenus,
		queryKey: ['menus'],
	});

	return (
		<>
			<div className="text-right z-50 inline-flex items-center  bg-white rounded-lg bg-opacity-0">
				<Menu as="div" className="relative inline-block text-left">
					<div>
						<Menu.Button className="inline-flex w-full items-center justify-center rounded-md text-sm font-medium text-white  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
							<Icon
								icon="mdi:dots-grid"
								className="object-contain w-7 h-7 p-px  border-opacity-30 hover:bg-secondary-600 rounded-md"
							/>
						</Menu.Button>
					</div>
					<Transition
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<Menu.Items className="absolute right-8 w-56 mt-2 z-50 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-4">
							<div className="px-1 z-50  py-1 flex flex-col w-full space-y-2">
								{data && user
									? data?.map((item) => (
											<Menu.Item
												as="a"
												key={item?.id}
												href={
													user?.role?.name === 'Super Admin' &&
													item?.name === 'Dashboard'
														? item?.url
														: `/car-wash/${user?.carWash?.id}/${item?.url}`
												}
												className={`${
													pathname === item?.url ||
													pathname ===
														`/car-wash/${user?.carWash?.id}/${item?.url}`
														? 'bg-slate-200 '
														: 'text-gray-900'
												} flex items-center p-2 space-x-2 text-secondary-600 hover:bg-slate-200 rounded-md`}
											>
												<Icon
													icon={item?.icon}
													className="text-xl h-5 w-5"
												/>
												<span className="text-base text-center">
													{item?.name}
												</span>
											</Menu.Item>
									  ))
									: ''}
							</div>
						</Menu.Items>
					</Transition>
				</Menu>
			</div>
		</>
	);
}
