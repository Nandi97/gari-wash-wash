import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		try {
			const staffId = req.query.slug?.toString();
			const data = await prisma.user.findUnique({
				where: { id: staffId },
				select: {
					id: true,
					firstName: true,
					lastName: true,
					email: true,
					image: true,

					role: {
						select: {
							id: true,
							name: true,
						},
					},
					carWash: {
						select: {
							id: true,
							name: true,
							path: true,
							logo: true,
							location: true,
							mapsLink: true,
						},
					},
				},
			});
			return res.status(200).json(data);
		} catch (err) {
			res.status(403).json({ err: 'Error has occurred while fetching Car Wash List' });
		}
	}
}
