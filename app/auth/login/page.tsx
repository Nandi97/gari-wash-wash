'use client';

import Image from 'next/image';
import logo from '@/public/assets/images/gari_was_wash_logo.png';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import { Icon } from '@iconify/react';
import { redirect } from 'next/navigation';
import Head from 'next/head';
import styles from './page.module.css';

export default function SignIn() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	// const { data: session } = useSession();

	const submitHandler = async (e: any) => {
		e.preventDefault();

		try {
			const data = await signIn('credentials', {
				redirect: false,
				email,
				password,
			});

			// console.log(data);
		} catch (error) {
			console.log(error);
		}
	};
	// if (session) {
	// 	return redirect('/');
	// }
	return (
		<div className="flex bg-primary-50 z-[3] fixed top-0 left-0 w-full h-full">
			<div className="z-[3] m-auto bg-slate-50 rounded-md w-3/5 h-3/4 grid lg:grid-cols-2 ">
				<div className="flex w-full h-full flex-col bg-gradient-to-r from-blue-500 to-indigo-500 rounded-l-md z-[3] ">
					<div className="flex flex-col mt-5 px-5 space-y-4">
						<div className="flex items-center space-x-3">
							<Image src={logo} alt="" width={20} height={20} />{' '}
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
					<form onSubmit={submitHandler} className="w-1/2">
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
									value={email}
									onChange={(e) => setEmail(e.target.value)}
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
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</label>
						</div>
						<button
							type="submit"
							className="rounded-md shadow text-box-four-light bg-text-primary-light hover:bg-text-secondary-light p-2"
						>
							Login
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
