import mongoose, { Schema, Document, Model } from 'mongoose';


export interface IAuditLog extends Document {
    actorId: mongoose.Types.ObjectId;
    action: string;
    targetType: string;
    targetId: mongoose.Types.ObjectId;
    diff?: Record<string, any>;
    ip?: string;
    userAgent?: string;
    createdAt: Date;
}

const AuditLogSchema: Schema<IAuditLog> = new Schema<IAuditLog>(
  {
    actorId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', // Basically tells the ID belongs to a document from the User collection(for future implemetation)
        required: true,
    },
    action: { 
        type: String, 
        required: true, 
    },
    targetType: { 
        type: String, 
        required: true,
    },
    targetId: { 
        type: Schema.Types.ObjectId, 
        required: true, 
    },
    diff: { 
        type: Schema.Types.Mixed,
    }, 
    ip: { 
        type: String,
    },
    userAgent: { 
        type: String,
    },
    createdAt: { 
        type: Date,
        default: Date.now,
        index: true,
        expires: '2y',
    },
  }
);

const AuditLog: Model<IAuditLog> =
  mongoose.models.AuditLog || mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);

export default AuditLog;
