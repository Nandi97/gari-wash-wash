import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

interface QueryParameters {
	recordsPerPage?: number;
	pageNumber?: number;
	slug?: string;
	searchParam?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		try {
			const recordsPerPage: number = Number(req.query.records_per_page) || 20;
			const currentPage: number = Math.max(Number(req.query.page_number || 1), 1);

			let recordCount;

			const options = {
				take: recordsPerPage,
				skip: (currentPage - 1) * recordsPerPage,
				orderBy: { id: 'desc' },
			};

			options.include = {
				role: true,
			};

			const countOptions = {};

			const queryParameters: QueryParameters = req.query;

			// console.log(queryParameters?.searchParam);

			if (queryParameters.slug) {
				const carWashId: string = queryParameters.slug.toString();

				options.where = {
					carWashId: { equals: carWashId },
				};

				countOptions.where = options.where;
			}

			if (queryParameters.searchParam) {
				options.where = {
					user: {
						OR: [
							{
								firstName: {
									contains: queryParameters.searchParam,
									mode: 'insensitive',
								},
							},
							{
								lastName: {
									contains: queryParameters.searchParam,
									mode: 'insensitive',
								},
							},
							{
								email: {
									contains: queryParameters.searchParam,
									mode: 'insensitive',
								},
							},
							{
								role: {
									name: {
										contains: queryParameters.searchParam,
										mode: 'insensitive',
									},
								},
							},
						],
					},
				};

				countOptions.where = options.where;
			}

			let staff = await prisma.user.findMany(options);

			recordCount = await prisma.user.count(countOptions);

			// console.log(staff);

			return res.status(200).json({
				data: staff,
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
