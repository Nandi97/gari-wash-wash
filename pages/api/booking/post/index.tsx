import { NextApiRequest, NextApiResponse } from 'next';
import { sendMail } from '@/services/mailService';
import { Email } from '../../../../components/email-templates/ClientBookingConfirmation';
import prisma from '@/lib/prisma';
import { Resend } from 'resend';

interface FormData {
	customer: { name: string; email: string; phoneNumber: string };
	carWashId: string;
	carTypeId: string;
	totalCost: number;
	bookingDate: string;
	bookingTime: string;
	bookingService: { serviceId: string }[];
}

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		try {
			const formData: FormData = req.body;

			// Check if formData is available
			if (!formData) {
				return res.status(400).json({ error: 'Missing formData in the request.' });
			}

			const res1 = await prisma.carWash.findUnique({
				where: { id: formData.carWashId },
				select: {
					name: true,
					landmark: true,
					lat: true,
					long: true,
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

			// Check if res1 is available
			if (!res1) {
				return res.status(400).json({ error: 'Car wash data not found.' });
			}

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

			const subject = `Booking Confirmed for ${res1?.name}`;
			const toEmail = ['cartezalvin@gmail.com'];
			const emailHtml = Email({ data: formData, carWash: res1 });
			const text = `Thank you ! ${formData?.customer?.name}. You're booking at ${res1?.name} has been confirmed`;
			const data = await resend.emails.send({
				from: 'onboarding@resend.dev',
				to: toEmail,
				subject: subject,
				text: text,
				react: emailHtml,
			});

			res.status(200).json(result);
		} catch (err: any) {
			console.log('Error when creating Booking', err.message);
			res.status(403).json({ err: 'Error has occurred while creating booking' });
		}
	}
}
