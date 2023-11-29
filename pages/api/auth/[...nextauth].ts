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
				function generate32BitKey() {
					const key = Math.floor(Math.random() * 2 ** 32);
					const hexKey = key.toString(16).toUpperCase();
					return hexKey.padStart(8, '0');
				}

				try {
					if (!credentials?.email || !credentials?.password) {
						throw new Error('Missing username or password');
					}

					const user = await prisma.user.findUnique({
						where: {
							email: credentials?.email,
						},
						include: {
							role: true,
							carWash: true,
						},
					});

					if (!user || !(await compare(credentials?.password, user.password))) {
						throw new Error('Invalid email or password');
					}

					// Example usage
					const generatedKey = generate32BitKey();

					return {
						id: user.id + '',
						email: user.email,
						image: user.image,
						name: user.name,
						randomKey: generatedKey,
						role: user.role,
						carWash: user.carWash,
					};
				} catch (error: any) {
					// Log the detailed error for debugging purposes
					console.error('Authentication error:', error);

					// Rethrow the original error or throw a custom error message
					if (error.message === 'Missing username or password') {
						throw new Error('Please provide both username and password');
					} else if (error.message === 'Invalid email or password') {
						throw new Error('Invalid email or password. Please try again.');
					} else {
						throw new Error('An unexpected error occurred during authentication');
					}
				}
			},
		}),
	],
	callbacks: {
		session: ({ session, token }) => {
			// console.log('Session Callback', { session, token });
			return {
				...session,
				user: {
					...session.user,
					id: token.id,
					role: token.role,

					carWash: token.carWash,
					randomKey: token.randomKey,
				},
			};
		},
		jwt: ({ token, user }) => {
			// console.log('JWT Callback', { token, user });
			if (user) {
				const u = user as unknown as any;
				return {
					...token,
					id: u.id,
					role: u.role,

					carWash: u.carWash,
					randomKey: u.randomKey,
				};
			}
			return token;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
