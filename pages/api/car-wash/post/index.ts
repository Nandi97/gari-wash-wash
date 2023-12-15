import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';

interface CarTypeCost {
	carTypeId: string;
	serviceId: string;
	carWashId: string;
	cost: number;
}

interface CarType {
	id: string;
}

interface CarWashService {
	serviceId: string;
	carTypes: CarType[];
	carTypeCosts: CarTypeCost[];
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
		cost: number;
		carTypes: {
			id: string;
		}[];
	}[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
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
					bookingLeadTime: parseFloat(formData.bookingLeadTime),
					carWashServices: {
						create: formData.carWashServices.map((item) => ({
							serviceId: item.serviceId,
							cost: item.cost,
							carTypes: {
								connect: item.carTypes.map((type) => ({
									id: type.id,
								})),
							},
							carTypeCosts: {
								create: item.carTypes.map((type) => ({
									carTypeId: type.id,
									cost: item.cost,
								})),
							},
						})),
					},
				},
			});
			res.status(200).json(result);
		} catch (err: any) {
			console.log('Error when creating Car Wash', err.message);
			res.status(403).json({ err: 'Error has occurred while creating Car Wash' });
		}
	}
}
