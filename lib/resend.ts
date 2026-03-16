import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
    console.warn('Missing RESEND_API_KEY. Email features will be disabled.');
}

export const resend = resendApiKey ? new Resend(resendApiKey) : null;
