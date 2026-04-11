import FormData from 'form-data';
import Mailgun from 'mailgun.js';
import EmailLog from '../../models/EmailLog';
import { connectDB } from '../db';

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

function validateMailgunEnvVars(): boolean {
  const requiredVars = ['MAILGUN_API_KEY', 'MAILGUN_DOMAIN'];
  const missingVars = requiredVars.filter((varName) => !process.env[varName]);

  if (missingVars.length > 0) {
    console.warn(`Missing Mailgun environment variables: ${missingVars.join(', ')}`);
    return false;
  }
  return true;
}

let mailgunClient: ReturnType<Mailgun['client']> | null = null;

function getMailgunClient() {
  if (!mailgunClient && validateMailgunEnvVars()) {
    const mailgun = new Mailgun(FormData);
    mailgunClient = mailgun.client({
      username: 'api',
      key: process.env.MAILGUN_API_KEY || '',
      url: process.env.MAILGUN_URL || 'https://api.mailgun.net', // allows EU domains
    });
  }
  return mailgunClient;
}

export async function sendEmail({ to, subject, text, html }: EmailOptions): Promise<boolean> {
  const mg = getMailgunClient();

  if (!mg || !process.env.MAILGUN_DOMAIN) {
    console.error('Mailgun client not initialized or domain missing');
    return false;
  }

  // Ensure from address is in proper format
  const fromAddress = process.env.EMAIL_FROM || `no-reply@${process.env.MAILGUN_DOMAIN}`;

  try {
    const data = await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: fromAddress,
      to: [to],
      subject,
      text,
      html: html || text,
    });

    console.log('Email sent successfully via Mailgun:', data.id);
    await logEmail(to, subject, 'sent', data.id);
    return true;
  } catch (error: unknown) {
    const err = error as { message?: string };
    console.error('Mailgun error details:', err?.message);
    await logEmail(to, subject, 'failed', undefined, err?.message);
    return false;
  }
}

async function logEmail(
  to: string,
  subject: string,
  status: 'sent' | 'failed',
  messageId?: string,
  errorDetails?: string
) {
  try {
    await connectDB();
    await EmailLog.create({
      to,
      subject,
      status,
      messageId,
      errorDetails,
    });
  } catch (dbError) {
    console.error('Failed to log email to database:', dbError);
  }
}
