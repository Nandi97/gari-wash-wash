import prisma from '@/lib/prisma';

export const getAsyncAuthenticatedUser = async (session: any) => {
	if (!session || !session.user || !session.user.id) {
		return null;
	}

	try {
		const userId = session.user.id;
		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
			// Include any additional fields you want to retrieve
			include: {
				role: true,
				carWash: true,
			},
		});
		// console.log(user);
		return user;
	} catch (error) {
		console.error('Error fetching authenticated user:', error);
		return null;
	}
};

export const getAuthenticatedUser = (session: any) => {
	if (!session || !session.user || !session.user.id) {
		return null;
	}

	try {
		const userId = session.user.id;
		const user = prisma.user.findUnique({
			where: {
				id: userId,
			},
			// Include any additional fields you want to retrieve
			include: {
				role: true,
				carWash: true,
			},
		});
		// console.log(user);
		return user;
	} catch (error) {
		console.error('Error fetching authenticated user:', error);
		return null;
	}
};
