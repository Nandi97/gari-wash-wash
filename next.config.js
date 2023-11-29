/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: [
			'lh3.googleusercontent.com',
			'avatars.githubusercontent.com',
			'firebasestorage.googleapis.com',
			'orarocoke-my.sharepoint.com',
			'www.dropbox.com',
			'www.oraro.co.ke',
			'tailwindui.com',
			'images.unsplash.com',
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
