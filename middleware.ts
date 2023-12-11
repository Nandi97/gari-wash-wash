import { withAuth } from 'next-auth/middleware';
import { redirect } from 'next/navigation';

// middleware is applied to all routes, use conditionals to select

export default withAuth(
	async function middleware(req) {
		// console.log(req.nextauth.token);
	},
	{
		pages: {
			signIn: '/auth/login',
		},

		callbacks: {
			authorized: ({ req, token }) => {
				// console.log('Token', token.role.name);
				// console.log('Request', req);
				if (token === null) {
					return false;
				}
				return true;
			},
		},
	}
);
export const config = { matcher: ['/car-wash/:path*'] };
