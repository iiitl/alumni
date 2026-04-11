import FormData from 'form-data';
import Mailgun from 'mailgun.js';
import EmailLog from '../../models/EmailLog';
import { connectDB } from '../db';

/**
 * Options required to send an email via Mailgun.
 */
interface EmailOptions {
  /** The recipient's email address. */
  to: string;
  /** The subject line of the email. */
  subject: string;
  /** The plain text body of the email. */
  text: string;
  /** The HTML encoded body of the email (optional, defaults to plain text if not provided). */
  html?: string;
}

/**
 * Validates the presence of required Mailgun environment variables.
 * 
 * @returns {boolean} True if all required environment variables are present, otherwise false.
 */
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

/**
 * Initializes and returns a singleton instance of the Mailgun client.
 * 
 * The client is configured using the `MAILGUN_API_KEY` and `MAILGUN_URL`
 * environment variables. It caches the instance to avoid re-initialization on subsequent calls.
 * 
 * @returns {ReturnType<Mailgun['client']> | null} The authenticated Mailgun client instance, or null if initialization fails.
 */
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

/**
 * Sends an email using the Mailgun API and logs the attempt to the database.
 * 
 * This function ensures the Mailgun client is properly configured and constructs 
 * the 'From' address using environment variables. It logs both successful sends 
 * and failed attempts to the `EmailLog` database collection.
 *
 * @param {EmailOptions} options - The configuration object for the email to be sent.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the email was successfully sent, or `false` if it failed.
 */
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
    void logEmail(to, subject, 'sent', data.id);
    return true;
  } catch (error: unknown) {
    const err = error as { message?: string };
    const safeErrorDetails = (err?.message ?? '').slice(0, 1000);
    console.error('Mailgun error details:', safeErrorDetails);
    void logEmail(to, subject, 'failed', undefined, safeErrorDetails);
    return false;
  }
}

/**
 * Logs an email delivery attempt to the MongoDB database.
 * 
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject line of the email.
 * @param {'sent' | 'failed'} status - The delivery outcome status.
 * @param {string} [messageId] - The Mailgun message ID (applicable if successful).
 * @param {string} [errorDetails] - The error message details (applicable if failed).
 * @returns {Promise<void>}
 */
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
