import { withAuth } from 'next-auth/middleware';
import { redirect } from 'next/navigation';

// middleware is applied to all routes, use conditionals to select

export default withAuth(async function middleware(req) {}, {
	pages: {
		signIn: '/auth/login',
	},

	callbacks: {
		authorized: ({ req, token }) => {
			if (token === null) {
				return false;
			}
			return true;
		},
	},
});
export const config = { matcher: ['/car-wash/:path*'] };
