import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const formData = req.body;
		const {
			about,
			designationId,
			createdById,
			carWashId,
			name,
			phoneNumber,
			email,
			address,
			city,
			stateProvince,
			zipPostalCode,
			image,
		} = formData;

		if (!name || !email || !phoneNumber || !createdById || !designationId) {
			// return new NextResponse('Missing Fields', { status: 400 });
			return res.status(400).json({ err: 'Missing Fields' });
		}

		const exist = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (exist) {
			throw new Error('Email already exists');
		}

		const result = await prisma.staff.create({
			data: {
				name,
				createdById,
				carWashId,
				designationId,
				about,
				image,
				email,
				phoneNumber,
				address,
				city,
				stateProvince,
				zipPostalCode,
			},
		});
		res.status(200).json(result);
	} catch (err: any) {
		console.log('Error when creating Leave Application', err.message);
		res.status(403).json({ err: 'Error has occurred while creating leave Application' });
	}
}
