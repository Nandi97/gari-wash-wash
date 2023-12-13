import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

interface FormData {
	customer: { name: string; email: string; phoneNumber: string };
	carWashId: string;
	carTypeId: string;
	totalCost: number;
	bookingDate: string;
	bookingTime: string;
	bookingService: { serviceId: string }[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		try {
			const formData: FormData = req.body;

			// console.log(formData);
			const result = await prisma.booking.create({
				data: {
					carWash: {
						connect: { id: formData.carWashId },
					},
					carType: {
						connect: { id: formData.carTypeId },
					},
					bookingDate: formData.bookingDate,
					bookingTime: formData.bookingTime,
					customer: {
						connectOrCreate: {
							where: { email: formData.customer.email },
							create: {
								name: formData.customer.name,
								email: formData.customer.email,
								phoneNumber: formData.customer.phoneNumber,
							},
						},
					},
					totalCost: formData.totalCost,
					bookingService: {
						create: formData.bookingService.map((item: any) => ({
							service: {
								connect: { id: item.serviceId },
							},
							quantity: item.quantity || 1,
						})),
					},
				},
			});
			res.status(200).json(result);
		} catch (err: any) {
			console.log('Error when creating Booking', err.message);
			res.status(403).json({ err: 'Error has occurred while creating booking' });
		}
	}
}
