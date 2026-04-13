import { NextRequest, NextResponse } from "next/server";
import { logAudit } from "@/utils/auditLogger";
import { connectDB } from "@/lib/db";

export async function POST(req: NextRequest) {
  await connectDB();

  // updating a user role
  const targetUserId = "60c72b2f9b1d8e1a4c8e4d3a"; // Mock target ID

  // Call the audit logger at the end
  await logAudit({
    req,
    action: "UPDATE_USER_ROLE", 
    targetType: "User",         
    targetId: targetUserId,     
    diff: {                     
      oldRole: "member", 
      newRole: "moderator" 
    },
  });

  return NextResponse.json({ success: true });
}
