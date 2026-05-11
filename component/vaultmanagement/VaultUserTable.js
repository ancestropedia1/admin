"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function VaultUserTable({
  users, loading, page, setPage, pagination, onManage,
}) {
  if (loading) {
    return (
      <div className="bg-[#E9F6EE] rounded-xl border-2 border-gray-300 p-6">
        <div className="space-y-4 animate-pulse">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#E9F6EE] rounded-xl border-2 border-gray-300 shadow-sm overflow-hidden">
      <h3 className="text-lg font-bold p-4 text-[#1B3B2F]">
        User Storage Management
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-[#D9D9D9]">
            <tr>
              <th className="p-3 text-sm">User</th>
              <th className="p-3 text-sm">Plan</th>
              <th className="p-3 text-sm">Storage Usage</th>
              <th className="p-3 text-sm">Files</th>
              <th className="p-3 text-sm">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t bg-[#E9F6EE] hover:bg-[#d8f0e4]">

                {/* USER */}
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar || "/avatar-placeholder.jpg"}
                      alt={user.name}
                      className="w-10 h-10 rounded-full border object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-700 text-sm">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </td>

                {/* PLAN */}
                <td className="p-3">
                  <span className={`px-3 py-1 rounded-md text-xs font-medium ${
                    user.plan === "Pro"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {user.plan}
                  </span>
                </td>

                {/* STORAGE */}
                <td className="p-3">
                  <p className="text-xs text-gray-600 mb-1">
                    {user.storageUsedGB} GB of {user.storageLimitGB} GB
                  </p>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden w-32">
                    <div
                      className={`h-full rounded-full transition-all ${
                        user.storageUsedPct >= 80 ? "bg-red-500" : "bg-green-600"
                      }`}
                      style={{ width: `${user.storageUsedPct}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {user.storageUsedPct}% used
                  </p>
                </td>

                {/* FILES */}
                <td className="p-3 text-gray-700 text-sm">
                  {user.filesCount}
                </td>

                {/* ACTION */}
                <td className="p-3">
                  <button
                    onClick={() => onManage(user)}
                    className="px-4 py-1.5 bg-[#E6ECFF] text-[#4A63C0] rounded-md text-xs font-medium hover:bg-[#dce3ff] transition-colors"
                  >
                    Manage
                  </button>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {pagination.pages > 1 && (
        <div className="flex justify-end items-center gap-2 p-4 border-t">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="p-2 border rounded-md bg-white hover:bg-gray-100 disabled:opacity-40"
          >
            <ChevronLeft size={16} />
          </button>

          {Array.from({ length: pagination.pages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`w-8 h-8 rounded-md text-sm font-medium transition-colors ${
                page === i + 1
                  ? "bg-[#1D7A48] text-white"
                  : "bg-white border hover:bg-gray-50 text-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={page === pagination.pages}
            onClick={() => setPage(page + 1)}
            className="p-2 border rounded-md bg-white hover:bg-gray-100 disabled:opacity-40"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}