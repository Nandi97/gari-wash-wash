import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		try {
			const cwId = req.query.slug?.toString();
			const data = await prisma.carWashService.findMany({
				where: {
					carWashId: cwId as string,
				},
				include: {
					carTypes: true,
					service: true,
					carWash: true,
					carTypeCosts: true,
				},
				orderBy: {
					createdAt: 'asc',
				},
			});
			return res.status(200).json(data);
		} catch (err) {
			res.status(403).json({ err: 'Error has occurred while fetching Car Wash List' });
		}
	}
}
