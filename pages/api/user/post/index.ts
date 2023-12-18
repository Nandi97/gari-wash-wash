import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const formData = req.body;
		const { createdById, carWashId, name, email, password, image, roleId } = formData;

		if (!name || !email || !password || !roleId) {
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
		const hashedPassword = await bcrypt.hash(password, 10);

		const result = await prisma.user.create({
			data: {
				roleId,
				name,
				createdById,
				carWashId,
				image,
				email,
				password: hashedPassword,
			},
		});
		res.status(200).json(result);
	} catch (err: any) {
		console.log('Error when creating Leave Application', err.message);
		res.status(403).json({ err: 'Error has occurred while creating leave Application' });
	}
}
