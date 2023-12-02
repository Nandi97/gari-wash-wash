import type { Config } from 'tailwindcss';
import { withUt } from 'uploadthing/tw';

export default withUt({
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			colors: {
				primary: {
					50: '#eef6ff',
					100: '#d9eaff',
					200: '#bbdbff',
					300: '#8cc5ff',
					400: '#56a4ff',
					500: '#2f7fff',
					600: '#195ef7',
					700: '#1149e4',
					800: '#153bb8',
					900: '#173791',
					950: '#101d49',
				},
				secondary: {
					50: '#f1f9fe',
					100: '#e2f2fc',
					200: '#bfe6f8',
					300: '#86d1f3',
					400: '#46baea',
					500: '#29abe2',
					600: '#1082b9',
					700: '#0e6896',
					800: '#10577c',
					900: '#134967',
					950: '#0d2f44',
				},
			},
		},
	},
	plugins: [],
});
