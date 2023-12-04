import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'PATCH' || req.method === 'PATCH') {
		const session = await getServerSession(req, res, authOptions);

		if (!session) {
			return res.status(401).json({ message: 'Please sign-in to edit staff.' });
		}

		try {
			const formData = req.body;

			// console.log('Form Data;', formData);

			const result = await prisma.staff.update({
				where: {
					email: formData.email,
				},
				data: formData,
			});
			res.status(200).json(result);
		} catch (err: any) {
			console.log('Error when editing staff:', err.message);
			res.status(403).json({
				err: `Error has occurred while editing staff: ${req.body.name}`,
			});
		}
	}
}
