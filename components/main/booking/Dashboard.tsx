'use client';

import BookingCard from '@/components/my-ui/BookingCard';
import SearchInput from '@/components/my-ui/SearchInput';
import { CarWashes } from '@/lib/types/carWashes';
import { Town } from '@/lib/types/town';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState, useEffect } from 'react';

const fetchAllCarWashes = async () => {
	const response = await axios.get('/api/car-wash/get');
	return response.data;
};
const fetchAllTowns = async () => {
	const response = await axios.get('api/town/get');
	return response.data;
};
export default function Dashboard() {
	const [selectedTown, setSelectedTown] = useState<any>();
	const [selectedConstituency, setSelectedConstituency] = useState<any>();
	const [selectedArea, setSelectedArea] = useState<any>();
	const [searchParam, setSearchParam] = useState<any>();

	const [filter, setFilter] = useState<any>();

	const { data: carWashes } = useQuery<CarWashes[]>({
		queryFn: fetchAllCarWashes,
		queryKey: ['carwashes'],
	});

	const { data: towns } = useQuery<Town[]>({
		queryFn: fetchAllTowns,
		queryKey: ['towns'],
	});

	const constituencies = towns
		?.filter((town) =>
			town.constituencies.some((constituency) => constituency.townId === selectedTown)
		)
		.map((town) => town.constituencies)
		.flat();

	const areas = constituencies
		?.filter((constituency) =>
			constituency.areas.some((area) => area.constituencyId === selectedConstituency)
		)
		.map((constituency) => constituency.areas)
		.flat();

	useEffect(() => {
		if (carWashes) {
			const filteredResult = carWashes?.filter((carWash) => {
				const matchesTown =
					!selectedTown || carWash?.area?.constituency?.townId === selectedTown;
				const matchesConstituency =
					!selectedConstituency || carWash?.area?.constituencyId === selectedConstituency;
				const matchesArea = !selectedArea || carWash?.areaId === selectedArea;
				const matchesSearchParam =
					!searchParam ||
					carWash?.name?.toLowerCase().includes(searchParam.toLowerCase());

				return matchesTown && matchesConstituency && matchesArea && matchesSearchParam;
			});

			setFilter(filteredResult);
		}
	}, [carWashes, selectedTown, selectedConstituency, selectedArea, searchParam]);

	const handleSearch = (searchInput: any) => {
		setSearchParam(searchInput);
	};
	return (
		<>
			<div className="w-full py-4">
				<div className="flex md:flex-auto flex-wrap space-y-1 sticky  items-end space-x-2">
					<div className="text-secondary-700">Filter by :</div>
					<div>
						<label
							htmlFor="town"
							className="block text-xs font-medium text-secondary-700 "
						>
							Town
						</label>
						<select
							id="town"
							name="town"
							value={selectedTown}
							onChange={(e) => {
								e.preventDefault();
								setSelectedTown(e.target.value);
							}}
							className="sm:text-sm w-full  bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-white focus:outline-none  focus:ring-offset-1"
						>
							<option
								selected
								disabled
								value=""
								className="text-opacity-50 text-secondary-700"
							>
								--Select Town--
							</option>
							{towns?.map((item) => (
								<option key={item?.id} value={item?.id}>
									{item?.name}
								</option>
							))}
						</select>
					</div>
					<div>
						<label
							htmlFor="constituency"
							className="block text-xs font-medium text-secondary-700 "
						>
							Constituency
						</label>
						<select
							id="constituency"
							name="constituency"
							value={selectedConstituency}
							onChange={(e) => {
								e.preventDefault();
								setSelectedConstituency(e.target.value);
							}}
							className="sm:text-sm w-full  bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-white focus:outline-none  focus:ring-offset-1"
							disabled={selectedTown ? false : true}
						>
							<option
								selected
								disabled
								value=""
								className="text-opacity-50 text-secondary-700"
							>
								--Select Constituency--
							</option>
							{constituencies?.map((item) => (
								<option key={item?.id} value={item?.id}>
									{item?.name}
								</option>
							))}
						</select>
					</div>
					<div>
						<label
							htmlFor="area"
							className="block text-xs font-medium text-secondary-700 "
						>
							Area
						</label>
						<select
							id="area"
							name="area"
							value={selectedArea}
							onChange={(e) => {
								e.preventDefault();
								setSelectedArea(e.target.value);
							}}
							className="sm:text-sm w-full  bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-white focus:outline-none  focus:ring-offset-1"
							disabled={selectedConstituency ? false : true}
						>
							<option
								selected
								disabled
								value=""
								className="text-opacity-50 text-secondary-700"
							>
								--Select Area--
							</option>
							{areas?.map((item) => (
								<option key={item?.id} value={item?.id}>
									{item?.name}
								</option>
							))}
						</select>
					</div>
					<div>
						<SearchInput onSearch={handleSearch} />
					</div>
				</div>
			</div>
			<div className="grid grid-cols-12 gap-4">
				{filter?.map((item: CarWashes) => (
					<BookingCard
						key={item?.id}
						name={item?.name}
						path={item?.id}
						logo={item?.logo}
						location={item?.location}
						lat={item?.lat}
						long={item?.long}
						town={item?.area?.constituency?.town?.name}
						constituency={item?.area?.constituency?.name}
						area={item?.area?.name}
					/>
				))}
			</div>
		</>
	);
}
