import nodemailer = require('nodemailer');

export default async function sendEmail({ to, subject, html, from = process.env.EMAIL_FROM }: any) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
        },
    });
    await transporter.sendMail({ from, to, subject, html });
}