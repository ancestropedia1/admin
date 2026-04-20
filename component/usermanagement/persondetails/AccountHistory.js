"use client";

import { useEffect, useState } from "react";
import { History } from "lucide-react";
import { axiosInstance } from "@/config/axios";

export default function AccountHistory({ userId }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axiosInstance.get(
          `/admin/users/users/${userId}`
        );

        const user = res.data.user;

        const defaultHistory = [
          {
            action: "Account Created",
            date: user.createdAt,
          },
          {
            action: "Last Updated",
            date: user.updatedAt,
          },
        ];

        setHistory(user.history || defaultHistory);
      } catch (error) {
        console.error("Failed to load history", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [userId]);

  if (loading) return <div className="mt-6">Loading...</div>;

  return (
    <div className="bg-[#F6F1E9] rounded-xl p-6 mt-6 shadow-sm">
      <h2 className="text-lg font-semibold text-green-800 flex items-center gap-2 mb-6">
        <History size={18} /> Account History
      </h2>

      <div className="space-y-4">
        {history.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-4 border flex justify-between items-center"
          >
            <span className="font-medium text-sm">
              {item.action}
            </span>

            <span className="text-xs text-gray-500">
              {item.date
                ? new Date(item.date).toLocaleDateString()
                : "—"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}