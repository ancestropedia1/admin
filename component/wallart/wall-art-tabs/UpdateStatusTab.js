"use client";

import React, { useState } from "react";
import { axiosInstance } from "@/config/axios";
import toast from "react-hot-toast";

export default function UpdateStatusTab({ order, refreshOrder }) {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const timeline = order?.adminTimeline || [];

  // 🔥 MUST MATCH BACKEND
  const statuses = [
    { label: "Order Received", value: "received" },
    { label: "Preparing", value: "preparing" },
    { label: "Dispatched", value: "dispatched" },
    { label: "Delivered", value: "delivered" },
  ];

  // 🔥 API CALL
  const handleUpdateStatus = async () => {
    if (!selectedStatus) return toast.error("Please select status");

    try {
      setLoading(true);

      await axiosInstance.put(
        `/admin/wallart/orders/${order.orderId}/status`,
        {
          status: selectedStatus,
        }
      );

      toast.success("Status updated");

      // 🔥 refresh modal data
      if (refreshOrder) refreshOrder();

      setSelectedStatus("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">

      {/* ================= LEFT: TIMELINE ================= */}
      <div className="border rounded-xl p-5">
        <h3 className="text-lg font-semibold mb-5">
          Order Status Timeline
        </h3>

        <div className="space-y-6">
          {timeline.length > 0 ? (
            timeline.map((t, i) => (
              <div key={i} className="flex gap-4">

                <div className="flex flex-col items-center">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs ${
                      i === 0 ? "bg-gray-400" : "bg-green-600"
                    }`}
                  >
                    ✓
                  </div>

                  {i !== timeline.length - 1 && (
                    <div className="w-[2px] h-10 bg-gray-300 mt-1" />
                  )}
                </div>

                <div>
                  <p className="font-medium text-gray-800 capitalize">
                    {t.status.replaceAll("_", " ")}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(t.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No timeline</p>
          )}
        </div>
      </div>

      {/* ================= RIGHT: STATUS SELECT ================= */}
      <div className="border rounded-xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-[#25543E] text-white text-center py-3 font-semibold text-lg">
          Select Status
        </div>

        {/* OPTIONS */}
        <div className="divide-y">
          {statuses.map((status) => (
            <div
              key={status.value}
              onClick={() => setSelectedStatus(status.value)}
              className={`py-4 text-center cursor-pointer transition ${
                selectedStatus === status.value
                  ? "bg-gray-200 font-semibold"
                  : "hover:bg-gray-50"
              }`}
            >
              {status.label}
            </div>
          ))}
        </div>

        {/* BUTTON */}
        <div className="p-4">
          <button
            onClick={handleUpdateStatus}
            disabled={loading}
            className="w-full bg-[#25543E] text-white py-2 rounded disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Status"}
          </button>
        </div>
      </div>
    </div>
  );
}