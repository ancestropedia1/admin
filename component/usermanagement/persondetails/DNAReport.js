"use client";

import { useEffect, useState } from "react";
import { Dna } from "lucide-react";
import { axiosInstance } from "@/config/axios";

export default function DNAReport({ userId }) {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axiosInstance.get(
          `/admin/users/users/${userId}`
        );

        setReports(res.data.user?.dnaReports || []);
      } catch (error) {
        console.error("Failed to load DNA reports", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [userId]);

  if (loading) return <div className="mt-6">Loading...</div>;

  return (
    <div className="bg-[#F6F1E9] rounded-xl p-6 mt-6 shadow-sm">
      <h2 className="text-lg font-semibold text-green-800 flex items-center gap-2 mb-6">
        <Dna size={18} /> DNA Report
      </h2>

      {reports.length === 0 ? (
        <p className="text-sm text-gray-500">No DNA reports found</p>
      ) : (
        <div className="space-y-4">
          {reports.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-4 border flex flex-col md:flex-row justify-between gap-4"
            >
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-gray-500">
                  {item.date || "—"}
                </p>
              </div>

              <span className="px-3 py-1 h-fit rounded-full bg-green-100 text-green-700 text-sm">
                {item.status || "Completed"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}