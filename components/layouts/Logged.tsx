'use client';

import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Link from 'next/link';

type User = {
	id: string;
	image: string;
	name: any;
	designation?: string;
};

export default function Logged({ id, image, name, designation }: User) {
	return (
		<>
			<div className="text-right inline-flex items-center  bg-white rounded-lg bg-opacity-0 z-40">
				<Menu as="div" className="relative inline-block text-left">
					<div>
						<Menu.Button className="inline-flex w-full justify-center items-center rounded-md text-sm font-medium text-white  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
							{!image ? (
								<span className="inline-flex items-center justify-center rounded-full h-6 w-6 bg-secondary-50 border-secondary-500 border-2 text-secondary-500 hover:bg-secondary-500 hover:text-secondary-50">
									<span className="font-sm leading-none ">
										{name
											.split(' ')
											.map((n: any) => n[0])
											.join('')}
									</span>
								</span>
							) : (
								<Image
									src={image}
									width={20}
									height={20}
									alt="User Avatar"
									className="object-contain w-6 h-6 p-px border-2 rounded-full border-secondary-50 hover:border-secondary-400"
								/>
							)}
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
						<Menu.Items className="absolute w-40 right-0 mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
							<div className="px-1 py-1 flex flex-col text-secondary-700 font-semibold text-base divide-y">
								<Menu.Item>
									{({ active }) => (
										<div className="flex items-center p-1 flex-col rounded-t-md bg-primary-400 text-white rou">
											<span>{name}</span>
											<span className="text-xs">{designation}</span>
										</div>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<Link
											className="flex items-center p-1 hover:rounded-md  hover:bg-primary-400 hover:text-white"
											href={`/staff/${id}`}
										>
											My Profile{' '}
										</Link>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<button
											type="button"
											className="flex items-center p-1 hover:rounded-md justify-between hover:bg-primary-400 hover:text-white"
											onClick={() => signOut()}
										>
											<span>Sign Out</span>
											<Icon icon="heroicons:arrow-left-on-rectangle" />
										</button>
									)}
								</Menu.Item>
							</div>
						</Menu.Items>
					</Transition>
				</Menu>
			</div>
		</>
	);
}
