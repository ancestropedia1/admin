"use client";

import React, { useState } from "react";
import { axiosInstance } from "@/config/axios";
import toast from "react-hot-toast";

export default function UpdateStatusTab({ order, refreshOrder }) {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Timeline sorted latest-first from backend
  const timeline = order?.adminTimeline || [];

  const statuses = [
    { label: "Order Received", value: "received" },
    { label: "Preparing",      value: "preparing" },
    { label: "Dispatched",     value: "dispatched" },
    { label: "Delivered",      value: "delivered" },
  ];

  const handleUpdateStatus = async () => {
    if (!selectedStatus) return toast.error("Please select a status");

    try {
      setLoading(true);

      await axiosInstance.put(
        `/admin/wallart/orders/${order.orderId}/status`,
        { status: selectedStatus, note }
      );

      toast.success("Status updated successfully");

      // 🔥 Refresh parent modal data
      if (refreshOrder) await refreshOrder();

      setSelectedStatus("");
      setNote("");
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
                  {/* ✅ FIX: i === 0 is LATEST → GREEN */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs ${
                      i === 0 ? "bg-green-600" : "bg-gray-300"
                    }`}
                  >
                    ✓
                  </div>

                  {i !== timeline.length - 1 && (
                    <div className="w-[2px] h-10 bg-gray-300 mt-1" />
                  )}
                </div>

                <div>
                  <p className={`font-medium capitalize ${
                    i === 0 ? "text-gray-900" : "text-gray-400"
                  }`}>
                    {t.status.replaceAll("_", " ")}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(t.updatedAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  {t.note && (
                    <p className="text-xs text-gray-500 italic mt-0.5">
                      {t.note}
                    </p>
                  )}
                </div>

              </div>
            ))
          ) : (
            <p className="text-gray-400">No timeline entries yet</p>
          )}
        </div>
      </div>

      {/* ================= RIGHT: STATUS SELECT ================= */}
      <div className="border rounded-xl overflow-hidden flex flex-col">

        {/* HEADER */}
        <div className="bg-[#25543E] text-white text-center py-3 font-semibold text-lg">
          Select Status
        </div>

        {/* OPTIONS */}
        <div className="divide-y flex-1">
          {statuses.map((status) => (
            <div
              key={status.value}
              onClick={() => setSelectedStatus(status.value)}
              className={`py-4 text-center cursor-pointer transition-colors ${
                selectedStatus === status.value
                  ? "bg-green-50 text-green-800 font-semibold"
                  : "hover:bg-gray-50 text-gray-700"
              }`}
            >
              {status.label}
            </div>
          ))}
        </div>

        {/* OPTIONAL NOTE */}
        <div className="px-4 pt-3">
          <textarea
            rows={2}
            placeholder="Optional note (e.g. tracking ID, lab info)..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#25543E]/40"
          />
        </div>

        {/* BUTTON */}
        <div className="p-4">
          <button
            onClick={handleUpdateStatus}
            disabled={loading || !selectedStatus}
            className="w-full bg-[#25543E] text-white py-2 rounded-lg font-medium disabled:opacity-40 transition-opacity"
          >
            {loading ? "Updating..." : "Update Status"}
          </button>
        </div>

      </div>
    </div>
  );
}