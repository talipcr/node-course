const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
	sgMail.send({
		to: email,
		from: 'talip.cesur+sendgrid@gmail.com',
		subject: 'Welcome to Task Manager',
		text: `Welcome to Task Manager ${name}`,
		html: `<strong>Welcome to Task Manager ${name}</strong>`,
	});
};

const sendCancelationEmail = (email, name) => {
	sgMail.send({
		to: email,
		from: 'talip.cesur+sendgrid@gmail.com',
		subject: 'Sorry to see you go',
		text: `Goodbye ${name}`,
		html: `<strong>Goodbye ${name}</strong>`,
	});
};

module.exports = {
	sendWelcomeEmail,
	sendCancelationEmail,
};
