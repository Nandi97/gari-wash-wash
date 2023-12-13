import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		try {
			const bookingId = req.query.slug?.toString();
			const data = await prisma.booking.findUnique({
				where: { id: bookingId },
				include: {
					customer: true,
					carWash: {
						include: {
							area: {
								include: {
									constituency: {
										include: {
											town: true,
										},
									},
								},
							},
						},
					},
					carType: true,
					bookingService: {
						include: {
							service: true,
						},
					},
				},
			});
			return res.status(200).json(data);
		} catch (err) {
			res.status(403).json({ err: 'Error has occurred while fetching Booking' });
		}
	}
}
