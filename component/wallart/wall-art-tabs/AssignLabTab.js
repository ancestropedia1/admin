"use client";

import React, { useState } from "react";
import { axiosInstance } from "@/config/axios";
import toast from "react-hot-toast";

export default function AssignLabTab({ order, refreshOrder }) {
  const [labId, setLabId] = useState(order?.assignedLab?.labId || "");
  const [labName, setLabName] = useState(order?.assignedLab?.labName || "");
  const [loading, setLoading] = useState(false);

  const isAssigned = !!order?.assignedLab?.labId;

  const handleAssign = async () => {
    if (!labId.trim() || !labName.trim()) {
      return toast.error("Both Lab ID and Lab Name are required");
    }

    try {
      setLoading(true);

      await axiosInstance.put(
        `/admin/wallart/orders/${order.orderId}/assign-lab`,
        { labId: labId.trim(), labName: labName.trim() }
      );

      toast.success("Lab assigned successfully");

      if (refreshOrder) await refreshOrder();
    } catch (err) {
      console.error(err);
      toast.error("Failed to assign lab");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">

      {/* ================= LEFT: CURRENT ASSIGNMENT ================= */}
      <div className="border rounded-xl p-5">
        <h3 className="text-lg font-semibold mb-5">Current Assignment</h3>

        {isAssigned ? (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-xs text-green-600 font-medium mb-1 uppercase tracking-wide">
                Assigned Lab
              </p>
              <p className="text-lg font-bold text-green-800">
                {order.assignedLab.labName}
              </p>
              <p className="text-sm text-green-600 mt-1">
                ID: {order.assignedLab.labId}
              </p>
            </div>

            <p className="text-xs text-gray-400">
              You can reassign by entering new lab details below.
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-center text-gray-400 gap-2">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl">
              🏭
            </div>
            <p className="text-sm">No lab assigned yet</p>
          </div>
        )}

        {/* ORDER REFERENCE */}
        <div className="mt-6 pt-4 border-t text-sm space-y-2">
          <div className="flex justify-between text-gray-500">
            <span>Order ID</span>
            <span className="font-medium text-gray-700">{order.orderId}</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>Customer</span>
            <span className="font-medium text-gray-700">
              {order.userId?.name || "-"}
            </span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>Status</span>
            <span className="capitalize font-medium text-gray-700">
              {order.adminStatus}
            </span>
          </div>
        </div>
      </div>

      {/* ================= RIGHT: ASSIGN FORM ================= */}
      <div className="border rounded-xl overflow-hidden flex flex-col">

        {/* HEADER */}
        <div className="bg-[#25543E] text-white text-center py-3 font-semibold text-lg">
          {isAssigned ? "Reassign Lab" : "Assign Lab"}
        </div>

        <div className="p-5 flex-1 space-y-4">

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Lab ID <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={labId}
              onChange={(e) => setLabId(e.target.value)}
              placeholder="e.g. LAB-001"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#25543E]/40"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Lab Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={labName}
              onChange={(e) => setLabName(e.target.value)}
              placeholder="e.g. Mumbai Print House"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#25543E]/40"
            />
          </div>

        </div>

        {/* BUTTON */}
        <div className="p-4 border-t">
          <button
            onClick={handleAssign}
            disabled={loading || !labId.trim() || !labName.trim()}
            className="w-full bg-[#25543E] text-white py-2 rounded-lg font-medium disabled:opacity-40 transition-opacity"
          >
            {loading ? "Assigning..." : isAssigned ? "Reassign Lab" : "Assign Lab"}
          </button>
        </div>

      </div>

    </div>
  );
}