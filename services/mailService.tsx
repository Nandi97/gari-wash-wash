import nodemailer from 'nodemailer';

interface MailerServiceProps {
	toEmail: string;
	subject: string;
	htmlContent: string;
	optText: any;
}
//-----------------------------------------------------------------------------
export const sendMail = async ({ toEmail, subject, htmlContent, optText }: MailerServiceProps) => {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.NODEMAILER_EMAIL,
			pass: process.env.NODEMAILER_PW,
		},
	});

	const options = {
		from: process.env.NODEMAILER_EMAIL,
		to: toEmail,
		subject: subject,
		text: optText,
		// attachments: [
		// 	{
		// 		filename: 'Gari Wash Wash Logo',
		// 		path: '/assets/images/gari_was_wash_logo.png',
		// 		cid: 'logo',
		// 	},
		// ],
		html: htmlContent,
	};

	try {
		// console.log('Mail Options', options);
		const info = await transporter.sendMail(options);
		// console.log('Email Sent:', info);
		return true;
	} catch (error: any) {
		console.error('Email Error:', error);
		throw new Error(error.message || 'Failed to send email');
	}
};
