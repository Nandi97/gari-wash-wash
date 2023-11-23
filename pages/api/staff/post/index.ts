import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const formData = req.body;
		const {
			about,
			firstName,
			lastName,
			phoneNumber,
			email,
			address,
			city,
			stateProvince,
			zipPostalCode,
			password,
			cPassword,
			image,
		} = formData;
		// console.log('FormData:', formData);

		if (!firstName || !email || !password || !lastName || !phoneNumber) {
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
		const hashedPassword = await bcrypt.hash(password, 10);

		console.log('Hashed Password:', hashedPassword);

		const result = await prisma.user.create({
			data: {
				firstName,
				lastName,
				about,
				image,
				email,
				password: hashedPassword,
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