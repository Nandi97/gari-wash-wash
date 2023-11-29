import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';

interface CarWashService {
	serviceId: string;
	cost: string;
	carTypeId: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		// const session = await getServerSession();

		try {
			const formData = req.body;

			// console.log(session);
			// console.log(session);

			const result = await prisma.carWash.create({
				data: {
					name: formData.name,
					path: formData.path,
					branch: formData.branch,
					location: formData.location,
					mapsLink: formData.mapsLink,
					logo: formData.logo,
					areaId: formData.areaId,
					carWashServices: {
						create: formData.carWashServices.map((item: CarWashService) => ({
							serviceId: item.serviceId,
							cost: parseInt(item.cost),
							carTypeId: item.carTypeId,
						})),
					},
				},
			});
			res.status(200).json(result);
		} catch (err: any) {
			console.log('Error when creating Leave Application', err.message);
			res.status(403).json({ err: 'Error has occurred while creating leave Application' });
		}
	}
}
