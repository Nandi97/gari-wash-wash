var nodemailer = require('nodemailer');
//-----------------------------------------------------------------------------
export async function sendMail(subject, toEmail, otpText, htmlContent) {
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.NODEMAILER_EMAIL,
			pass: process.env.NODEMAILER_PW,
		},
	});

	var mailOptions = {
		from: process.env.NODEMAILER_EMAIL,
		to: toEmail,
		subject: subject,
		// attachments: [
		// 	{
		// 		filename: 'oco_ab_and_david.png',
		// 		path: './public/assets/images/oco_ab_and_david.png',
		// 		cid: 'logo',
		// 	},
		// ],
		html: htmlContent,
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			throw new Error(error);
		} else {
			console.log('Email Sent');
			return true;
		}
	});
}
