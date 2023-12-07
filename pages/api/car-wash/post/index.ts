import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';

interface CarWashService {
	serviceId: string;
	cost: string;
	carTypes: any[];
}

interface FormData {
	name: string;
	path: string;
	branch: string;
	landmark: string;
	lat: string;
	long: string;
	logo: string;
	areaId: string;
	bookingLeadTime: string;
	carWashServices: {
		serviceId: string;
		cost: string;
		carTypes: {
			id: string;
		}[];
	}[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		// const session = await getServerSession();

		try {
			const formData: FormData = req.body;

			const result = await prisma.carWash.create({
				data: {
					name: formData.name,
					path: formData.path,
					branch: formData.branch,
					landmark: formData.landmark,
					lat: parseFloat(formData.lat),
					long: parseFloat(formData.long),
					logo: formData.logo,
					areaId: formData.areaId,
					bookingLeadTime: parseFloat('1'),
					carWashServices: {
						create: formData.carWashServices.map((item) => ({
							serviceId: item.serviceId,
							cost: parseFloat(item.cost),
							carTypes: {
								connect: item.carTypes.map((type: any) => ({
									id: type.id,
								})),
							},
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
