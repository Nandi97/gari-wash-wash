'use client';

import Image from 'next/image';
import logo from '@/public/assets/images/gari_was_wash_logo.png';
import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import styles from './page.module.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface LogInForm {
	email: string;
	password: string;
}

interface LogInFormProps {
	initialValues?: LogInForm;
}

export default function SignIn({ initialValues }: LogInFormProps) {
	let toastId: string;
	const router = useRouter();

	const { data: session } = useSession();

	// console.log(session);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LogInForm>({
		defaultValues: initialValues,
	});

	const { mutate, isPending } = useMutation({
		mutationFn: async (data: any) => {
			try {
				const response = await signIn('credentials', {
					redirect: false,
					email: data.email,
					password: data.password,
					callbackUrl: '/',
				});

				// console.log(response);

				if (response?.ok) {
					return response;
				} else {
					throw response;
				}
			} catch (error) {
				if (error instanceof Error) {
					console.error('An unexpected error occurred:', error);
					throw new Error('An unexpected error occurred');
				}

				throw error;
			}
		},

		onError: (response: any) => {
			// console.log(response);

			if (response && response.status) {
				const { status, data } = response;

				if (status === 401) {
					toast.error(data?.error || 'Invalid email or password. Please try again.', {
						id: toastId,
					});
				} else if (status === 403) {
					toast.error('You do not have permission to perform this action', {
						id: toastId,
					});
				} else if (status >= 400 && status < 500) {
					toast.error('Client error. Please check your input and try again.', {
						id: toastId,
					});
				} else if (status >= 500) {
					toast.error('Server error. Please try again later.', { id: toastId });
				} else {
					toast.error('An unexpected error occurred', { id: toastId });
				}
			} else {
				toast.error('An unexpected error occurred', { id: toastId });
			}
		},
		onSuccess: (data: any) => {
			if (data?.ok === true) {
				toast.success('Car Wash Was Successful', { id: toastId });
				router.push(data.url);
			} else {
				// console.log(data);
			}
		},
	});

	const handleSubmitForm: SubmitHandler<LogInForm> = (data) => {
		try {
			mutate(data);
		} catch (error) {
			console.log(error);
		}
	};

	if (session) {
		router.push('/car-wash');
	}
	return (
		<div className="flex bg-primary-50 z-[3] fixed top-0 left-0 w-full h-full">
			<div className="z-[3] m-auto bg-slate-50 rounded-md w-3/5 h-3/4 grid lg:grid-cols-2 ">
				<div className="flex w-full h-full flex-col bg-gradient-to-r from-blue-500 to-indigo-500 rounded-l-md z-[3] ">
					<div className="flex flex-col mt-5 px-5 space-y-4">
						<div className="flex items-center space-x-3">
							<Image src={logo} alt="" width={20} height={20} />
							<span className="text-primary-50">Gari Wash Wash</span>
						</div>
						<h2 className="text-2xl font-semibold text-primary-50">Welcome to</h2>
						<h1 className="text-5xl text-primary-50 font-extrabold">Gari Wash Wash</h1>
					</div>
					<div className="relative w-full h-full overflow-hidden">
						<div className={styles.cartoonImg}></div>
						<div className={styles.cloud_one}></div>
						<div className={styles.cloud_two}></div>
					</div>
				</div>
				<div className="z-[3] right flex flex-col justify-evenly bg-gray-50 px-8 items-center">
					<form onSubmit={handleSubmit(handleSubmitForm)} className="w-1/2">
						<div className="mb-6">
							<label
								htmlFor="email_field"
								className="block mb-2 text-sm font-medium text-gray-900"
							>
								Email
								<input
									type="email"
									id="email_field"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
									placeholder="name@email.com"
									required
									{...register('email', { required: true })}
								/>
							</label>
						</div>
						<div className="mb-6">
							<label
								htmlFor="password_field"
								className="block mb-2 text-sm font-medium text-gray-900"
							>
								Password
								<input
									type="password"
									id="password_field"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
									required
									{...register('password', { required: true })}
								/>
							</label>
						</div>
						<div className="">
							{isPending === true ? (
								<div className="rounded-md shadow text-white bg-primary-500 hover:bg-secondary-500 p-2 flex items-center justify-center w-16 h-10">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										className="h-4 w-4 text-white"
									>
										<path
											fill="#888888"
											d="M2,12A11.2,11.2,0,0,1,13,1.05C12.67,1,12.34,1,12,1a11,11,0,0,0,0,22c.34,0,.67,0,1-.05C6,23,2,17.74,2,12Z"
										>
											<animateTransform
												attributeName="transform"
												dur="0.6s"
												repeatCount="indefinite"
												type="rotate"
												values="0 12 12;360 12 12"
											/>
										</path>
									</svg>
								</div>
							) : (
								<button
									type="submit"
									className="rounded-md shadow text-white bg-primary-500 hover:bg-secondary-500 p-2 w-16 text-center h-10"
								>
									Login
								</button>
							)}
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
