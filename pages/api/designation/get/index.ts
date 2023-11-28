import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		try {
			const carWashId: any = req.query.slug;
			const data = await prisma.designation.findMany({
				where: {
					deletedAt: null,
					carWashId: carWashId,
				},
				include: {
					carWash: true,
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
