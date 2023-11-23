import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/lib/prisma';
import { compare } from 'bcrypt';

const adapter = PrismaAdapter(prisma);

export const authOptions: NextAuthOptions = {
	session: {
		strategy: 'jwt',
	},
	adapter: adapter,
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		CredentialsProvider({
			name: 'Sign in',
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'hello@example.com',
				},
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error('Missing username or password');
				}
				const user = await prisma.user.findUnique({
					where: {
						email: credentials?.email,
					},
				});
				// if user doesn't exist or password doesn't match
				if (!user || !(await compare(credentials?.password, user.password))) {
					throw new Error('Invalid username or password');
				}
				console.log('User:', user);
				return {
					id: user.id + '',
					email: user.email,
					name: `${user.firstName}' '${user.firstName}`,

					randomKey: 'Hey cool',
				};
			},
		}),
	],
	callbacks: {
		session: ({ session, token }) => {
			console.log('Session Callback', { session, token });
			return {
				...session,
				user: {
					...session.user,
					id: token.id,
					randomKey: token.randomKey,
				},
			};
		},
		jwt: ({ token, user }) => {
			console.log('JWT Callback', { token, user });
			if (user) {
				const u = user as unknown as any;
				return {
					...token,
					id: u.id,
					randomKey: u.randomKey,
				};
			}
			return token;
		},
	},
};

export default NextAuth(authOptions);
