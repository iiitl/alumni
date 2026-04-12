// import { connectDB } from "./db";

interface AuditLogParams {
  severity: 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';
  event: string;
  target: string;
  message: string;
}

export async function logToAudit(params: AuditLogParams) {
    try {
        // Establish/reuse the MongoDB connection
        // await connectDB();

        // Perform your database operation
        // Have to create model for AuditLog first
        // await AuditLog.create({
        //   severity: params.severity,
        //   event: params.event,
        //   target: params.target,
        //   message: params.message,
        //   timestamp: new Date(),
        // });

        console.log("[AuditLog]", params.message);

    } catch (error) {
        console.error("Failed to write to audit log:", error);
    }
}