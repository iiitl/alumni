import { NextRequest } from 'next/server';
import { Types } from 'mongoose';
import AuditLog from '@/models/AuditLog'; 

interface LogAuditParams {
  req: NextRequest | Request;
  action: string;
  targetType: string;
  targetId: Types.ObjectId | string;
  diff?: Record<string, unknown>;
}

/**
 * Helper function to create an Audit Log entry.
 */
export const logAudit = async ({
  req,
  action,
  targetType,
  targetId,
  diff,
}: LogAuditParams): Promise<void> => {
  try {
    const rawIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '';
    const ip = rawIp.split(',')[0].trim(); 

    const userAgent = req.headers.get('user-agent') || 'Unknown Device';

    const rawActorId = req.headers.get('x-user-id');
    const actorId = rawActorId ? new Types.ObjectId(rawActorId) : new Types.ObjectId(); 

    if (!rawActorId) {
      console.warn(`[AuditLog] Missing actorId for action: ${action}. Is the user authenticated?`);
    }

    // Save to database
    await AuditLog.create({
      actorId,
      action,
      targetType,
      targetId: new Types.ObjectId(targetId),
      diff,
      ip,
      userAgent,
    });

  } catch (error) {
    console.error('[AuditLog] Failed to create audit log:', error);
  }
};