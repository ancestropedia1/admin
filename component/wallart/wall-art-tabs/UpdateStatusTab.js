"use client";

import React, { useState } from "react";
import { axiosInstance } from "@/config/axios";
import toast from "react-hot-toast";

export default function UpdateStatusTab({ order, refreshOrder }) {
  // ✅ FIX: Pre-select the current adminStatus so admin sees where order is
  const [selectedStatus, setSelectedStatus] = useState(order?.adminStatus || "");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const timeline = order?.adminTimeline || [];

  const statuses = [
    { label: "Order Received", value: "received" },
    { label: "Preparing",      value: "preparing" },
    { label: "Dispatched",     value: "dispatched" },
    { label: "Delivered",      value: "delivered" },
  ];

  // ✅ FIX: Map status to step number for progress comparison
  const statusStep = {
    received:   1,
    preparing:  2,
    dispatched: 3,
    delivered:  4,
  };

  const currentStep  = statusStep[order?.adminStatus] || 0;
  const selectedStep = statusStep[selectedStatus] || 0;

  const handleUpdateStatus = async () => {
    if (!selectedStatus) return toast.error("Please select a status");

    // ✅ FIX: Warn if admin tries to go backwards
    if (selectedStep < currentStep) {
      toast.error("Cannot set status to a previous step");
      return;
    }

    // ✅ FIX: Warn if same status selected
    if (selectedStatus === order?.adminStatus) {
      toast.error("Order is already in this status");
      return;
    }

    try {
      setLoading(true);

      await axiosInstance.put(
        `/admin/wallart/orders/${order.orderId}/status`,
        { status: selectedStatus, note }
      );

      toast.success("Status updated successfully");

      if (refreshOrder) await refreshOrder();

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
        <h3 className="text-lg font-semibold mb-5">Order Status Timeline</h3>

        <div className="space-y-6">
          {timeline.length > 0 ? (
            timeline.map((t, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs ${
                    i === 0 ? "bg-green-600" : "bg-gray-300"
                  }`}>
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
                    <p className="text-xs text-gray-500 italic mt-0.5">{t.note}</p>
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
          {statuses.map((status) => {
            const isCurrentStatus = status.value === order?.adminStatus;
            const isSelected      = status.value === selectedStatus;
            const isPast          = statusStep[status.value] < currentStep;

            
            return (
              <div
                key={status.value}
                onClick={() => !isPast && setSelectedStatus(status.value)}
                className={`py-4 px-4 flex items-center justify-between transition-colors ${
                  isPast
                    // ✅ Past steps: greyed out, not clickable
                    ? "bg-gray-50 text-gray-300 cursor-not-allowed"
                    : isSelected && isCurrentStatus
                    // ✅ Currently active status selected
                    ? "bg-green-50 text-green-800 font-semibold cursor-pointer"
                    : isSelected
                    // ✅ New status selected (different from current)
                    ? "bg-blue-50 text-blue-800 font-semibold cursor-pointer"
                    : "hover:bg-gray-50 text-gray-700 cursor-pointer"
                }`}
              >
                <span>{status.label}</span>

                <span className="flex items-center gap-2 text-xs">
                  {/* ✅ Badge showing current active status */}
                  {isCurrentStatus && (
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                      Current
                    </span>
                  )}
                  {/* ✅ Badge showing newly selected status */}
                  {isSelected && !isCurrentStatus && (
                    <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                      Selected
                    </span>
                  )}
                  {/* ✅ Checkmark for past completed steps */}
                  {isPast && (
                    <span className="text-gray-300">✓ Done</span>
                  )}
                </span>
              </div>
            );
          })}
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
            disabled={
              loading ||
              !selectedStatus ||
              selectedStatus === order?.adminStatus ||
              selectedStep < currentStep
            }
            className="w-full bg-[#25543E] text-white py-2 rounded-lg font-medium disabled:opacity-40 transition-opacity"
          >
            {loading ? "Updating..." : `Move to ${
              statuses.find(s => s.value === selectedStatus)?.label || "..."
            }`}
          </button>
        </div>

      </div>
    </div>
  );
}