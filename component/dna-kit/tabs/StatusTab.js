"use client";

import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { axiosInstanceLocal } from "@/config/axios";

const STATUS_LIST = [
  { label: "Order Received", value: "new_order" },
  { label: "Sample Received", value: "sample_received" },
  { label: "Kit Delivered", value: "kit_delivered" },
  { label: "Report Ready", value: "report_ready" },
  { label: "Completed", value: "completed" },
];

const StatusTab = ({ order, refreshOrder }) => {
  const [loading, setLoading] = useState(false);

  const handleUpdateStatus = async (status) => {
    console.log("🔄 Updating Status →", status);

    try {
      setLoading(true);

      await axiosInstanceLocal.patch(
        `/admin/dna-orders/${order._id}/status`,
        { dnaStatus: status } // 🔥 backend expects dnaStatus
      );

      console.log("✅ Status Updated");

      refreshOrder(); // refetch order so timeline updates
    } catch (err) {
      console.error("❌ Status Update Failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* ================= LEFT : TIMELINE ================= */}
      <div className="border rounded-xl p-6 bg-white">
        <h3 className="text-lg font-semibold mb-6">Order Status Timeline</h3>

        {STATUS_LIST.map((step, i) => {
          const completed =
            STATUS_LIST.findIndex(s => s.value === order.dnaStatus) >= i;

          return (
            <div key={i} className="flex gap-4 mb-5 items-start">
              {completed ? (
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center">
                  <CheckCircle size={16} />
                </div>
              ) : (
                <div className="w-8 h-8 bg-gray-300 text-white rounded-full flex items-center justify-center">
                  <XCircle size={16} />
                </div>
              )}

              <div>
                <p className="font-semibold text-gray-800">{step.label}</p>
                {completed ? (
                  <p className="text-sm text-gray-500">
                    Completed
                  </p>
                ) : (
                  <p className="text-sm text-gray-400">
                    Not Yet Completed
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= RIGHT : SELECT STATUS ================= */}
      <div className="rounded-xl overflow-hidden border">
        <div className="bg-[#265A46] text-white p-4 font-semibold text-lg">
          Select Status
        </div>

        {STATUS_LIST.map((s, i) => {
          const active = order.dnaStatus === s.value;

          return (
            <div
              key={i}
              onClick={() => handleUpdateStatus(s.value)}
              className={`px-6 py-4 cursor-pointer border-t transition
                ${active ? "bg-green-100 font-semibold" : "bg-white hover:bg-gray-50"}
                ${loading && "pointer-events-none opacity-60"}
              `}
            >
              {s.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatusTab;
