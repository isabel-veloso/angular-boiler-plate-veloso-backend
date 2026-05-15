export default async function sendEmail({ to, subject, html, from = 'onboarding@resend.dev' }: any) {
    const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ from, to, subject, html })
    });
    
    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Resend error: ${error}`);
    }
}