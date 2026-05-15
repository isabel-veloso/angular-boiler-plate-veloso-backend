export default async function sendEmail({ to, subject, html, from = 'mave.veloso@swu.phinma.edu.ph' }: any) {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            personalizations: [{ to: [{ email: to }] }],
            from: { email: from },
            subject,
            content: [{ type: 'text/html', value: html }]
        })
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`SendGrid error: ${error}`);
    }
}