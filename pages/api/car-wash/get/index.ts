import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		try {
			const data = await prisma.carWash.findMany({
				orderBy: {
					createdAt: 'asc',
				},
				select: {
					id: true,
					name: true,
					path: true,
					logo: true,
					location: true,
					lat: true,
					long: true,
					branch: true,
					carWashServices: {
						select: {
							id: true,
							carWashId: true,
							serviceId: true,
							cost: true,
							status: true,
							service: {
								select: {
									id: true,
									name: true,
									description: true,
								},
							},
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
