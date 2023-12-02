'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import usr_avatar from '@/public/assets/images/user-avatar.webp';
import { registerStaffValidate } from '@/lib/validate';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { UploadButton } from '@/lib/uploadthing';

interface Roles {
	id: string;
	name: string;
}
interface Designations {
	id: string;
	name: string;
	description: string;
}

interface StaffForm {
	name: string;
	email: string;
	image: string;
	password: string;
	cPassword: string;
	phoneNumber: string;
	address: string;
	about: string;
	city: string;
	stateProvince: string;
	zipPostalCode: string;
	roleId: string;
	designationId: string;
	carWashId: string;
	createdById: string;
}
interface StaffFormProps {
	onSubmit: SubmitHandler<StaffForm>;
	initialValues?: StaffForm;
	isPending: boolean;
}
const fetchAllRoles = async () => {
	const response = await axios.get('/api/roles/get');
	return response.data;
};

const fetchAllDesignations = async (slug: any) => {
	const response = await axios.get('/api/roles/get', { params: { slug: slug } });
	return response.data;
};

export default function StaffForm({ onSubmit, initialValues, isPending }: StaffFormProps) {
	const { data: session } = useSession();
	const params = useParams();
	const [selectedImage, setSelectedImage] = useState<string>('');
	const imageRef = useRef<HTMLInputElement>(null);
	const {
		register,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm<StaffForm>({
		defaultValues: initialValues,
	});
	const carWashId = params?.['car-wash-id'];

	const { data: roles } = useQuery<Roles[]>({
		queryFn: fetchAllRoles,
		queryKey: ['roles'],
	});
	const { data: designations } = useQuery<Designations[]>({
		queryKey: ['designations', carWashId],
		queryFn: () =>
			axios
				.get('/api/designation/get', { params: { slug: carWashId } })
				.then((response) => response.data),
	});

	// console.log(designations);

	// const convertToBase64 = (file: File): Promise<string> => {
	// 	return new Promise((resolve, reject) => {
	// 		const reader = new FileReader();
	// 		reader.readAsDataURL(file);
	// 		reader.onload = () => resolve(reader.result as string);
	// 		reader.onerror = (error) => reject(error);
	// 	});
	// };

	// const staffImageSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
	// 	const files = event?.target?.files;
	// 	if (files && files.length > 0) {
	// 		const file = files[0];
	// 		const base64Image = await convertToBase64(file);
	// 		setSelectedImage(base64Image);
	// 	}
	// };
	const handleSubmitForm: SubmitHandler<StaffForm> = (data) => {
		try {
			if (selectedImage) {
				data.image = selectedImage;
			} else {
				data.image = '';
			}

			if (!session || !session.user) {
				throw new Error('Session user ID is missing. Cannot submit the form.');
			}

			data.createdById = session.user.id;
			data.carWashId = session.user.carWash.id;

			// console.log(data);

			onSubmit(data);
		} catch (error) {
			// Handle the error appropriately, you can log it or show a user-friendly message
			console.error('An error occurred while submitting the form:', error);
		}
	};

	return (
		<div>
			<div className="title w-full border-b-2 border-primary-500 mb-2">
				<h1 className="text-gray-800 text-4xl font-bold py-4">Register staff member</h1>
			</div>
			<form className="w-full" onSubmit={handleSubmit(handleSubmitForm)}>
				<div>
					<div className="md:grid md:grid-cols-3 md:gap-6">
						<div className="md:col-span-1">
							<div className="px-4 sm:px-0">
								<h3 className="text-lg font-medium leading-6 text-gray-900">
									Profile
								</h3>
								<p className="mt-1 text-sm text-gray-600">
									This information will be displayed publicly so be careful what
									you share.
								</p>
							</div>
						</div>
						<div className="mt-5 md:col-span-2 md:mt-0">
							<div className="shadow sm:overflow-hidden sm:rounded-md">
								<div className="space-y-6 bg-white px-4 py-5 sm:p-6">
									<div className="flex flex-col w-full space-y-2">
										<label
											htmlFor="image"
											className="text-sm font-medium text-secondary-700"
										>
											Photo
										</label>
										<div className="mt-1 flex items-center">
											<Image
												height={512}
												width={512}
												src={selectedImage || usr_avatar}
												alt="Staff Avatar Image"
												className="items-center justify-center overflow-hidden rounded-md md:w-24 sm:h-10 md:h-24 sm:w-10 ring-2 ring-offset-1 ring-primary-600 bg-secondary-300 inline-block"
											/>
											{/* <input
												type="file"
												name="image"
												id="image"
												ref={imageRef}
												accept="image/*"
												placeholder="Staff Avatar"
												className="hidden"
												onChange={staffImageSelected}
											/>
											<button
												onClick={() => imageRef.current?.click()}
												type="button"
												className="ml-5 py-2 px-3   leading-4    focus:ring-offset-2 p-1 text-sm font-medium  bg-white border rounded-md shadow-sm border-secondary-300 text-secondary-700 hover:bg-white focus:outline-none focus:ring-2 focus:ring-secondary-500"
											>
												Change
											</button> */}
											<div className="px-5">
												<UploadButton
													endpoint="strictImageAttachment"
													onClientUploadComplete={(res) => {
														if (res) {
															// console.log('Files: ', res[0].url);
															setSelectedImage(res[0].url);
														}

														// alert('Upload Completed');
													}}
													onUploadError={(error: Error) => {
														// Do something with the error.
														console.log(JSON.stringify(error));
														alert(`ERROR! ${error.message}`);
													}}
												/>
											</div>
										</div>
									</div>
									<div className="flex flex-col w-full space-y-2">
										<label
											htmlFor="about"
											className="text-sm font-medium text-secondary-700"
										>
											About
										</label>
										<div className="mt-1">
											<textarea
												id="about"
												rows={3}
												className="sm:text-sm w-full bg-white bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
												placeholder="you@example.com"
												{...register('about', { max: 300, min: 20 })}
											/>
											<p
												className={`font-bold ${
													watch('about')?.length > 300
														? 'text-red-700'
														: 'text-slate-600'
												}`}
											>{`${watch('about')?.length}/300`}</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="hidden sm:block" aria-hidden="true">
					<div className="py-5">
						<div className="border-t border-gray-200" />
					</div>
				</div>

				<div className="mt-10 sm:mt-0">
					<div className="md:grid md:grid-cols-3 md:gap-6">
						<div className="md:col-span-1">
							<div className="px-4 sm:px-0">
								<h3 className="text-lg font-medium leading-6 text-gray-900">
									Personal Information
								</h3>
								<p className="mt-1 text-sm text-gray-600">
									Use a permanent address where you can receive mail.
								</p>
							</div>
						</div>
						<div className="mt-5 md:col-span-2 md:mt-0">
							<div className="overflow-hidden shadow sm:rounded-md">
								<div className="bg-white px-4 py-5 sm:p-6">
									<div className="grid grid-cols-6 gap-6">
										<div className="col-span-6 sm:col-span-3 space-y-1">
											<label
												htmlFor="name"
												className="block text-xs font-medium text-secondary-700 "
											>
												Full Name
											</label>
											<input
												type="text"
												id="name"
												{...register('name', { required: true })}
												className="sm:text-sm w-full bg-white bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
											/>
										</div>

										<div className="col-span-6 sm:col-span-3 space-y-1">
											<label
												htmlFor="phone-number"
												className="block text-xs font-medium text-secondary-700"
											>
												Phone Number
											</label>
											<input
												type="text"
												{...register('phoneNumber')}
												id="phone-number"
												className="sm:text-sm w-full bg-white bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
											/>
										</div>
										<div className="col-span-6 sm:col-span-2 space-y-1">
											<label
												htmlFor="email"
												className="block text-xs font-medium text-secondary-700"
											>
												Email address
											</label>
											<input
												type="text"
												id="email"
												className="sm:text-sm w-full bg-white bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
												{...register('email', {
													pattern:
														/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
													required: true,
												})}
											/>
										</div>

										<div className="col-span-6 sm:col-span-2 space-y-1">
											<label
												htmlFor="roleId"
												className="block text-xs font-medium text-secondary-700"
											>
												Staff Role
											</label>
											<select
												{...register('roleId', { required: true })}
												id="roleId"
												className={`${
													errors.roleId
														? 'bg-red-50 border-red-300'
														: 'bg-white border-secondary-300'
												} sm:text-sm w-full  bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1`}
											>
												<option
													disabled
													defaultValue=""
													value=""
													className="text-opacity-50 text-secondary-700"
												>
													--Select Role--
												</option>
												{roles ? (
													roles?.map((item) => (
														<option key={item?.id} value={item?.id}>
															{item?.name}
														</option>
													))
												) : (
													<></>
												)}
											</select>
										</div>

										<div className="col-span-6 sm:col-span-2 space-y-1">
											<label
												htmlFor="designationId"
												className="block text-xs font-medium text-secondary-700"
											>
												Staff Designation
											</label>
											<select
												{...register('designationId', { required: true })}
												id="designationId"
												className={`${
													errors.designationId
														? 'bg-red-50 border-red-300'
														: 'bg-white border-secondary-300'
												} sm:text-sm w-full  bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1`}
											>
												<option
													disabled
													defaultValue=""
													value=""
													className="text-opacity-50 text-secondary-700"
												>
													--Select Role--
												</option>
												{designations ? (
													designations?.map((item) => (
														<option key={item?.id} value={item?.id}>
															{item?.name}
														</option>
													))
												) : (
													<></>
												)}
											</select>
										</div>
										<div className="col-span-6 space-y-1">
											<label
												htmlFor="address"
												className="block text-xs font-medium text-secondary-700"
											>
												Street address
											</label>
											<input
												type="text"
												{...register('address', { required: true })}
												id="address"
												className="sm:text-sm w-full bg-white bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
											/>
										</div>

										<div className="col-span-6 sm:col-span-6 lg:col-span-2 space-y-1">
											<label
												htmlFor="city"
												className="block text-xs font-medium text-secondary-700"
											>
												City
											</label>
											<input
												type="text"
												{...register('city', { required: true })}
												id="city"
												className="sm:text-sm w-full bg-white bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
											/>
										</div>

										<div className="col-span-6 sm:col-span-6 lg:col-span-2 space-y-1">
											<label
												htmlFor="stateProvince"
												className="block text-xs font-medium text-secondary-700"
											>
												State / Province
											</label>
											<input
												type="text"
												{...register('stateProvince', { required: true })}
												id="stateProvince"
												className={`sm:text-sm w-full bg-white bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border ${
													errors.stateProvince
														? 'border-red-500'
														: 'border-secondary-300'
												} text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1`}
											/>
										</div>

										<div className="col-span-6 sm:col-span-6 lg:col-span-2 space-y-1">
											<label
												htmlFor="zipPostalCode"
												className="block text-xs font-medium text-secondary-700"
											>
												ZIP / Postal code
											</label>
											<input
												type="text"
												{...register('zipPostalCode', { required: true })}
												id="zipPostalCode"
												className="sm:text-sm w-full bg-white bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border border-secondary-300 text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
											/>
										</div>

										<div className="col-span-6 md:col-span-3 space-y-1">
											<label
												htmlFor="password"
												className="block text-xs font-medium text-secondary-700"
											>
												Password
											</label>
											<input
												type="password"
												{...register('password', {
													required: 'Password is required',
													minLength: {
														value: 8,
														message:
															'Password must be at least 8 characters long',
													},
													maxLength: {
														value: 20,
														message:
															'Password must be at most 20 characters long',
													},
													pattern: {
														value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
														message:
															'Password must contain at least one lowercase letter, one uppercase letter, and one number',
													},
												})}
												id="password"
												className={`sm:text-sm w-full bg-white bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border ${
													errors.password
														? 'border-red-500'
														: 'border-secondary-300'
												} text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1`}
											/>
											{errors.password && (
												<p className="text-red-500 text-xs mt-1">
													{errors.password.message}
												</p>
											)}
										</div>

										<div className="col-span-6 md:col-span-3 space-y-1">
											<label
												htmlFor="cPassword"
												className="block text-xs font-medium text-secondary-700"
											>
												Confirm Password
											</label>
											<input
												type="password"
												{...register('cPassword', {
													required: 'Confirm Password is required',
													validate: (val: string) => {
														if (watch('password') !== val) {
															return 'Your passwords do not match';
														}
													},
												})}
												id="cPassword"
												className={`sm:text-sm w-full bg-white bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300  focus:border-secondary-500 block p-2.5 h-8  px-3 py-1 shadow-secondary-300 rounded-md border ${
													errors.cPassword
														? 'border-red-500'
														: 'border-secondary-300'
												} text-sm font-medium leading-4 text-secondary-700 shadow-sm hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1`}
											/>
											{errors.cPassword && (
												<p className="text-red-500 text-xs mt-1">
													{errors.cPassword.message}
												</p>
											)}
										</div>
									</div>
								</div>
								<div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
									<button
										type="submit"
										className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
									>
										Save
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="hidden sm:block" aria-hidden="true">
					<div className="py-5">
						<div className="border-t border-gray-200" />
					</div>
				</div>
			</form>
		</div>
	);
}
