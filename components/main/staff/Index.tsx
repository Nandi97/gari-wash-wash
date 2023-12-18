'use client';

import OptDropdown from '@/components/my-ui/OptDropdown';
import SearchInput from '@/components/my-ui/SearchInput';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/Skeleton';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from '@/components/my-ui/Breadcrumbs';
import { StaffType } from '@/lib/types/staff';
import IndexTable from './IndexTable';
import IndexCard from './IndexCard';

export default function IndexStaff() {
	const [searchParam, setSearchParam] = useState<any>();
	const params = useParams();
	const pathname = usePathname();
	const router = useRouter();
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

	const staff: StaffType[] = data?.data;

	const handleSearch = (searchInput: any) => {
		setSearchParam(searchInput);
	};

	const newStaffMember = () => {
		router.push(`${pathname}/create`);
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

	const pathNames = pathname?.split('/').filter((path) => path);

	const pages = [
		{
			icon: 'heroicons:home',
			name: '',
			href: '/car-wash',
			current: false,
		},
		{
			name: 'show',
			href: `/${pathNames?.[0]}/${pathNames?.[1]}`,
			current: false,
		},
		{
			name: 'staff',
			href: `/${pathNames?.[0]}/${pathNames?.[1]}/${pathNames?.[2]}`,
			current: true,
		},
	];

	return (
		<div className="">
			<Breadcrumbs pages={pages} />
			<div className="sticky z-20 w-full flex items-center justify-end gap-2 p-2 bg-white top-8 ">
				<div className="inline-flex items-center space-x-2">
					<SearchInput onSearch={handleSearch} />
					<OptDropdown optBtn={headerOptBtnTxt} optionsList={headerOptionsList} />
				</div>
			</div>
			<div className="shadow overscroll-none ring-1 ring-black ring-opacity-5 md:rounded-md">
				<IndexTable data={staff} isPending={isPending} pathname={pathname} />
				<IndexCard data={staff} isPending={isPending} pathname={pathname} />
			</div>
		</div>
	);
}
