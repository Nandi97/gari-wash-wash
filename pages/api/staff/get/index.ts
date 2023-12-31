import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		try {
			const recordsPerPage: number = Number(req.query.records_per_page) || 20;
			const currentPage: number = Math.max(Number(req.query.page_number || 1), 1);

			const queryParameters: any = req.query;

			const whereClause: any = {
				carWashId: { equals: queryParameters.slug?.toString() },
			};

			if (queryParameters.searchParam) {
				whereClause.OR = [
					{ name: { contains: queryParameters.searchParam, mode: 'insensitive' } },
					{ email: { contains: queryParameters.searchParam, mode: 'insensitive' } },
					{
						designation: {
							name: { contains: queryParameters.searchParam, mode: 'insensitive' },
						},
					},
				];
			}

			const data = await prisma.staff.findMany({
				where: whereClause,
				orderBy: {
					createdAt: 'asc',
				},
				include: {
					designation: true,
				},
				take: recordsPerPage,
				skip: (currentPage - 1) * recordsPerPage,
			});

			const recordCount = await prisma.staff.count({
				where: whereClause,
			});

			return res.status(200).json({
				data: data,
				pagination: {
					current_page: currentPage,
					totalCount: recordCount,
					pageCount: Math.ceil(recordCount / recordsPerPage),
				},
			});
		} catch (err) {
			res.status(403).json({ err: 'Error has occurred while fetching Staff list' });
		}
	}
}
