import { connectDB } from "@/lib/db";
import AuditLog from "@/models/AuditLog";
import { headers } from "next/headers";

// Force Next.js to dynamically render this page on every request
export const dynamic = "force-dynamic";

export default async function AuditLogPage() {
  // 1. Superadmin Authorization Check
  // In a real application, you would use next-auth's `getServerSession` or similar here.
  // For now, we mock the auth check by looking for a specific request header.
  const headersList = await headers();
  const userRole = headersList.get("x-user-role");

  // If the user isn't a superadmin, deny access
  if (userRole !== "superadmin") {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="p-8 text-center bg-red-50 dark:bg-red-950/20 rounded-xl border border-red-200 dark:border-red-900">
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">403 - Forbidden</h1>
          <p className="text-red-800 dark:text-red-300">
            You must be a superadmin to view the audit logs.
          </p>
        </div>
      </div>
    );
  }

  // 2. Fetch Data
  await connectDB();
  
  // Fetch the latest 100 audit logs
  const logs = await AuditLog.find({})
    .sort({ createdAt: -1 })
    .limit(100)
    .lean();

  // 3. Render Table UI
  return (
    <main className="p-8 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">System Audit Logs</h1>
        <span className="bg-red-100 text-red-800 text-xs font-semibold px-3 py-1 rounded border border-red-200 uppercase">
          Superadmin Only
        </span>
      </div>

      <div className="overflow-x-auto border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900/50 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800">
            <tr>
              <th scope="col" className="px-4 py-4">Timestamp</th>
              <th scope="col" className="px-4 py-4">Action</th>
              <th scope="col" className="px-4 py-4">Actor ID</th>
              <th scope="col" className="px-4 py-4">Target</th>
              <th scope="col" className="px-4 py-4">Diff / Changes</th>
              <th scope="col" className="px-4 py-4">IP & Device</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr 
                key={log._id.toString()} 
                className="bg-white border-b dark:bg-black/20 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
              >
                <td className="px-4 py-3 whitespace-nowrap text-gray-500 dark:text-gray-400">
                  {new Date(log.createdAt).toLocaleString()}
                </td>
                <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
                  {log.action}
                </td>
                <td className="px-4 py-3 font-mono text-xs text-gray-500">
                  {log.actorId?.toString() || 'System'}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-col gap-1">
                    <span className="w-fit bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-[10px] font-semibold px-2 py-0.5 rounded">
                      {log.targetType}
                    </span>
                    <span className="font-mono text-xs text-gray-500">
                      {log.targetId?.toString()}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  {log.diff && Object.keys(log.diff).length > 0 ? (
                    <pre className="text-[10px] bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 p-2 rounded max-w-xs overflow-x-auto whitespace-pre-wrap">
                      {JSON.stringify(log.diff, null, 2)}
                    </pre>
                  ) : (
                    <span className="text-gray-400 dark:text-gray-600 italic">No changes recorded</span>
                  )}
                </td>
                <td className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400">
                  <div className="font-mono mb-1">{log.ip}</div>
                  <div className="truncate max-w-[200px]" title={log.userAgent}>
                    {log.userAgent}
                  </div>
                </td>
              </tr>
            ))}
            
            {logs.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-gray-500">
                  No audit logs found in the database.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
