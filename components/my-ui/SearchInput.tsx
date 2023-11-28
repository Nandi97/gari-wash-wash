import React, { useEffect, useState } from 'react';

import { Icon } from '@iconify/react/dist/iconify.js';
import useDebounce from '@/hooks/useDebounce';

export default function SearchInput({ onSearch }: any) {
	const [searchInput, setSearchInput] = useState('');
	const debouncedSearchInput = useDebounce(searchInput, 500); // Adjust the delay as needed

	// You can now call the onSearch function with the debounced searchInput
	useEffect(() => {
		onSearch(debouncedSearchInput);
	}, [debouncedSearchInput, onSearch]);

	return (
		<div>
			<label className="h-8 w-full md:w-72 relative inline-flex items-center">
				<input
					type="search"
					name="search"
					id="search"
					placeholder="Search..."
					className="h-full w-full bg-ocoblue-50 bg-opacity-70 border-1 border-ocoblue-300 shadow-inner shadow-accent-300 text-xs pl-8 focus:ring-ocoblue-500 border text-ocoblue-900 rounded-lg  focus:border-blue-500 block p-2.5"
					value={searchInput}
					onChange={(e) => setSearchInput(e.target.value)}
				/>
				<Icon
					icon="heroicons:magnifying-glass"
					className="absolute left-2 top-2 text-md text-zinc-500"
				/>
			</label>
		</div>
	);
}
