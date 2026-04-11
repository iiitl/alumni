import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEmailLog extends Document {
  to: string;
  subject: string;
  status: 'sent' | 'failed';
  messageId?: string;
  errorDetails?: string;
  createdAt: Date;
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
