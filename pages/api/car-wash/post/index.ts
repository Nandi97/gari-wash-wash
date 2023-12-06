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
	lat: number;
	long: number;
	logo: string;
	areaId: string;
	bookingLeadTime: number;
	carWashServices: {
		serviceId: string;
		cost: number;
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
					lat: formData.lat,
					long: formData.long,
					logo: formData.logo,
					areaId: formData.areaId,
					bookingLeadTime: 1,
					carWashServices: {
						create: formData.carWashServices.map((item) => ({
							serviceId: item.serviceId,
							cost: item.cost,
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
