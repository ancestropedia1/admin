"use client";

import React, { useState } from "react";
import { axiosInstance } from "@/config/axios";
import toast from "react-hot-toast";

export default function UpdateStatusTab({ order }) {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const timeline = order?.adminTimeline || [];

  const handleUpdate = async () => {
    if (!selectedStatus) return toast.error("Select status");

    try {
      setLoading(true);

      await axiosInstance.put(
        `/admin/wallart/orders/${order.orderId}/status`,
        { status: selectedStatus }
      );

      toast.success("Status updated");
    } catch (err) {
      toast.error("Failed to update");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">

      {/* LEFT: TIMELINE */}
      <div className="border rounded-xl p-5">
        <h3 className="text-lg font-semibold mb-4">
          Order Status Timeline
        </h3>

        {timeline.map((t, i) => (
          <div key={i} className="flex gap-3 mb-4">
            <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center">
              ✓
            </div>

            <div>
              <p className="font-medium capitalize">{t.status}</p>
              <p className="text-xs text-gray-400">
                {new Date(t.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT: STATUS SELECT */}
      <div className="border rounded-xl p-5">
        <h3 className="text-lg font-semibold mb-4">
          Select Status
        </h3>

        {["received", "preparing", "dispatched", "delivered"].map((s) => (
          <button
            key={s}
            onClick={() => setSelectedStatus(s)}
            className={`w-full py-3 mb-2 rounded border capitalize ${
              selectedStatus === s
                ? "bg-[#25543E] text-white"
                : "hover:bg-gray-50"
            }`}
          >
            {s}
          </button>
        ))}

        <button
          onClick={handleUpdate}
          disabled={loading}
          className="mt-4 w-full bg-[#25543E] text-white py-2 rounded"
        >
          Update Status
        </button>
      </div>
    </div>
  );
}