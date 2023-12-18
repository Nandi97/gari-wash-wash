import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		try {
			const carWashId = req.query.slug?.toString();
			const data = await prisma.carWash.findUnique({
				where: { id: carWashId },
				select: {
					id: true,
					name: true,
					path: true,
					logo: true,
					landmark: true,
					lat: true,
					long: true,
					branch: true,
					bookingLeadTime: true,
					carWashServices: {
						select: {
							id: true,
							carWashId: true,
							serviceId: true,
							status: true,
							service: {
								select: {
									id: true,
									name: true,
									description: true,
								},
							},

							carTypeCosts: {
								select: { carWashServiceId: true, carType: true, cost: true },
							},
						},
					},
					areaId: true,
					area: {
						select: {
							id: true,
							name: true,
							constituencyId: true,
							constituency: {
								select: {
									id: true,
									name: true,
									townId: true,
									town: {
										select: {
											id: true,
											name: true,
										},
									},
								},
							},
						},
					},
				},
			});
			return res.status(200).json(data);
		} catch (err) {
			res.status(403).json({ err: 'Error has occurred while fetching Car Wash List' });
		}
	}
}
