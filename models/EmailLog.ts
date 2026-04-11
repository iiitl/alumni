import mongoose, { Schema, Document, Model } from 'mongoose';

/**
 * Represents a logged email delivery attempt in the database.
 */
export interface IEmailLog extends Document {
  /** The recipient's email address. */
  to: string;
  /** The subject line of the email. */
  subject: string;
  /** The delivery status of the email. */
  status: 'sent' | 'failed';
  /** The unique message ID returned by Mailgun upon successful send (optional). */
  messageId?: string;
  /** Detailed error message if the email attempt failed (optional). */
  errorDetails?: string;
  /** Automatically generated timestamp of when the log was created. */
  createdAt: Date;
  /** Automatically generated timestamp of when the log was last updated. */
  updatedAt: Date;
}

const EmailLogSchema: Schema<IEmailLog> = new Schema<IEmailLog>(
  {
    to: {
      type: String,
      required: [true, 'Recipient email is required'],
    },
    subject: {
      type: String,
      required: [true, 'Email subject is required'],
    },
    status: {
      type: String,
      enum: ['sent', 'failed'],
      required: [true, 'Email status is required'],
    },
    messageId: {
      type: String,
    },
    errorDetails: {
      type: String,
    },
  },
  { timestamps: true }
);

const EmailLog: Model<IEmailLog> =
  mongoose.models.EmailLog || mongoose.model<IEmailLog>('EmailLog', EmailLogSchema);

export default EmailLog;
