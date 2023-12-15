/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		// domains: [
		// 	'lh3.googleusercontent.com',
		// 	'avatars.githubusercontent.com',
		// 	'firebasestorage.googleapis.com',
		// 	'orarocoke-my.sharepoint.com',
		// 	'www.dropbox.com',
		// 	'www.oraro.co.ke',
		// 	'tailwindui.com',
		// 	'images.unsplash.com',
		// 	'utfs.io',
		// 	'picsum.photos',
		// ],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
			},
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
			},
			{
				protocol: 'https',
				hostname: 'firebasestorage.googleapis.com',
			},
			{
				protocol: 'https',
				hostname: 'firebasestorage.googleapis.com',
			},
			{
				protocol: 'https',
				hostname: 'orarocoke-my.sharepoint.com',
			},
			{
				protocol: 'https',
				hostname: 'www.dropbox.com',
			},
			{
				protocol: 'https',
				hostname: 'www.oraro.co.ke',
			},
			{
				protocol: 'https',
				hostname: 'tailwindui.com',
			},
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
			},
			{
				protocol: 'https',
				hostname: 'utfs.io',
			},
			{
				protocol: 'https',
				hostname: 'picsum.photos',
			},
			{
				protocol: 'https',
				hostname: 'lh5.googleusercontent.com',
			},
			{
				protocol: 'https',
				hostname: 'uploadthing.com',
			},
		],
	},
	typescript: {
		// !! WARN !!
		// Dangerously allow production builds to successfully complete even if
		// your project has type errors.
		// !! WARN !!
		ignoreBuildErrors: true,
	},
};

module.exports = nextConfig;
