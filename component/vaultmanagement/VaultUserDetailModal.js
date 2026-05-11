"use client";

import { useState, useEffect } from "react";
import { axiosInstance } from "@/config/axios";
import { X } from "lucide-react";

export default function VaultUserDetailModal({ userId, onClose }) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axiosInstance.get(`/admin/vault/users/${userId}`);
        if (res.data.success) setData(res.data.data);
      } catch (err) {
        console.error("Failed to fetch user vault detail:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [userId]);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="flex justify-between items-center p-6 border-b bg-[#E9F6EE]">
          <h2 className="text-xl font-bold text-[#1B3B2F]">User Vault Detail</h2>
          <button onClick={onClose} className="hover:text-red-500 transition-colors">
            <X size={22} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {loading ? (
            <div className="space-y-4 animate-pulse">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-10 bg-gray-200 rounded" />
              ))}
            </div>
          ) : !data ? (
            <p className="text-center text-gray-500 py-8">Failed to load data</p>
          ) : (
            <div className="space-y-6">

              {/* USER INFO */}
              <div className="flex items-center gap-4">
                <img
                  src={data.user.avatar || "/avatar-placeholder.jpg"}
                  className="w-16 h-16 rounded-full border object-cover"
                  alt={data.user.name}
                />
                <div>
                  <h3 className="font-semibold text-lg">{data.user.name}</h3>
                  <p className="text-gray-500 text-sm">{data.user.email}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium mt-1 inline-block ${
                    data.user.plan === "Pro"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {data.user.plan}
                  </span>
                </div>
              </div>

              {/* STORAGE BAR */}
              <div className="bg-gray-50 rounded-xl p-4 border">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Storage Used</span>
                  <span className="text-gray-600">
                    {data.storage.usedGB} GB / {data.storage.limitGB} GB
                  </span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      data.storage.usedPct >= 80 ? "bg-red-500" : "bg-green-600"
                    }`}
                    style={{ width: `${data.storage.usedPct}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">{data.storage.usedPct}% used</p>
              </div>

              {/* STATS GRID */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-gray-50 rounded-xl p-4 border">
                  <p className="text-2xl font-bold text-[#1D7A48]">{data.files.total}</p>
                  <p className="text-xs text-gray-500 mt-1">Total Files</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border">
                  <p className="text-2xl font-bold text-[#4263EB]">{data.folders.total}</p>
                  <p className="text-xs text-gray-500 mt-1">Total Folders</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border">
                  <p className="text-2xl font-bold text-[#E67E22]">{data.user.tokens}</p>
                  <p className="text-xs text-gray-500 mt-1">Tokens</p>
                </div>
              </div>

              {/* RECENT FILES */}
              {data.recentFiles?.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Recent Files</h4>
                  <div className="space-y-2">
                    {data.recentFiles.map((file) => (
                      <div
                        key={file._id}
                        className="flex justify-between items-center text-sm bg-gray-50 border rounded-lg px-4 py-2"
                      >
                        <span className="text-gray-700 truncate max-w-[200px]">
                          {file.name}
                        </span>
                        <span className="text-gray-400 text-xs">
                          {(file.size / (1024 * 1024)).toFixed(1)} MB
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="p-4 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#1D7A48] text-white rounded-lg text-sm font-medium hover:bg-[#165d37] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}