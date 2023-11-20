import { Icon } from '@iconify/react/dist/iconify.js';

interface CarWashServiceForm {
	serviceId: string;
	cost: number;
	carTypeId: string;
}

interface CarWashServiceFormProps {
	initialValues?: CarWashServiceForm;
}

export default function CarWashServiceForm() {
	return (
		<div className="flex items-center w-full">
			<div className="md:col-span-8 col-span-6 grid md:grid-cols-12 grid-cols-6 gap-4 border rounded-md w-full p-2">
				<div className="md:col-span-4 col-span-6 space-y-1">
					<label
						htmlFor="serviceTypeId"
						className="block text-sm font-medium text-secondary-700"
					>
						Service
					</label>
					<select
						id="serviceTypeId"
						name="serviceTypeId"
						// value={selectedStaffType} // Use selectedStaffType here
						// onChange={updateDesignations}
						className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
					>
						<option disabled value="" className="text-opacity-50 text-secondary-700">
							--Select Service Type--
						</option>
						{/* {staffTypes?.map((item) => (
						<option key={item?.id} value={item?.id}>
							{item?.name}
						</option>
					))} */}
					</select>
				</div>
				<div className="md:col-span-4 col-span-6 space-y-1">
					<label
						htmlFor="carTypeId"
						className="block text-sm font-medium text-secondary-700"
					>
						Car Type
					</label>
					<select
						id="carTypeId"
						name="carTypeId"
						// value={selectedStaffType} // Use selectedStaffType here
						// onChange={updateDesignations}
						className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
					>
						<option disabled value="" className="text-opacity-50 text-secondary-700">
							--Select Service Type--
						</option>
						{/* {staffTypes?.map((item) => (
						<option key={item?.id} value={item?.id}>
							{item?.name}
						</option>
					))} */}
					</select>
				</div>
				<div className="md:col-span-4 col-span-6 space-y-1">
					<label
						htmlFor="mapsLink"
						className="block text-sm font-medium text-secondary-700"
					>
						Maps Link
					</label>
					<input
						type="number"
						name="mapsLink"
						id="mapsLink"
						className="sm:text-sm w-full bg-secondary-50 bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
					/>
				</div>
			</div>
			<div className="flex items-center justify-center">
				<Icon icon="heroicons:trash" className="text-xl" />
			</div>
		</div>
	);
}
