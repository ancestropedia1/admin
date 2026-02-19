"use client";

import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { axiosInstance } from "@/config/axios";

/* ✅ REAL STATUS FLOW (SHARED WITH CLIENT) */
const STATUS_LIST = [
  { label: "Order Confirmed", value: "order_confirmed" },
  { label: "Order Dispatched", value: "order_dispatched" },
  { label: "Order Picked Up", value: "order_pickedup" },
  { label: "Out For Delivery", value: "out_for_delivery" },
  { label: "Delivered", value: "delivered" },
];

const StatusTab = ({ order, refreshOrder }) => {
  const [loading, setLoading] = useState(false);

  /* ---------------- UPDATE STATUS ---------------- */
  const handleUpdateStatus = async (status) => {
    try {
      setLoading(true);

      await axiosInstance.patch(
        `/admin/dna-orders/${order._id}/status`,
        { status } // ✅ IMPORTANT (NOT dnaStatus)
      );

      await refreshOrder(); // refetch updated order
    } catch (err) {
      console.error("❌ Status Update Failed", err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- FIND CURRENT STEP ---------------- */
  const currentIndex = STATUS_LIST.findIndex(
    (s) => s.value === order.status
  );

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* ================= LEFT : TIMELINE ================= */}
      <div className="border rounded-xl p-6 bg-white">
        <h3 className="text-lg font-semibold mb-6">Order Status Timeline</h3>

        {STATUS_LIST.map((step, i) => {
          const completed = i <= currentIndex;

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
                <p className="text-sm text-gray-500">
                  {completed ? "Completed" : "Pending"}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= RIGHT : SELECT STATUS ================= */}
      <div className="rounded-xl overflow-hidden border">
        <div className="bg-[#265A46] text-white p-4 font-semibold text-lg">
          Update Status
        </div>

        {STATUS_LIST.map((s, i) => {
          const active = order.status === s.value;

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
