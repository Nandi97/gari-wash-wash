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
					include: {
						role: true,
						carWash: true,
					},
				});
				// if user doesn't exist or password doesn't match
				if (!user || !(await compare(credentials?.password, user.password))) {
					throw new Error('Invalid username or password');
				}

				function generate32BitKey() {
					// Generate a random 32-bit integer
					const key = Math.floor(Math.random() * 2 ** 32);

					// Convert the integer to a hexadecimal string
					const hexKey = key.toString(16).toUpperCase();

					// Pad the string with zeros if needed to ensure it's 8 characters long
					return hexKey.padStart(8, '0');
				}

				// Example usage
				const generatedKey = generate32BitKey();
				// console.log('User:', user);
				return {
					id: user.id + '',
					email: user.email,
					image: user.image,
					address: user.address,
					about: user.about,
					city: user.city,
					stateProvince: user.stateProvince,
					zipPostalCode: user.zipPostalCode,
					name: `${user.firstName} ${user.lastName}`,
					randomKey: generatedKey,
					role: user.role,
					carWash: user.carWash,
				};
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
					address: token.address,
					about: token.about,
					city: token.city,
					stateProvince: token.stateProvince,
					zipPostalCode: token.zipPostalCode,
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
					address: u.address,
					about: u.about,
					city: u.city,
					stateProvince: u.stateProvince,
					zipPostalCode: u.zipPostalCode,
					carWash: u.carWash,
					randomKey: u.randomKey,
				};
			}
			return token;
		},
	},
};

export default NextAuth(authOptions);
