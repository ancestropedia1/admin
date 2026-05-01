"use client";

import React, { useState } from "react";

export default function UpdateStatusTab({ order }) {
  const [selectedStatus, setSelectedStatus] = useState("");

  const timeline = order?.adminTimeline || [];

  const statuses = [
    "order received",
    "preparing",
    "dispatched",
    "delivered",
  ];

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

                {/* DOT + LINE */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs ${
                      i === 0
                        ? "bg-gray-400"
                        : "bg-green-600"
                    }`}
                  >
                    ✓
                  </div>

                  {i !== timeline.length - 1 && (
                    <div className="w-[2px] h-10 bg-gray-300 mt-1" />
                  )}
                </div>

                {/* TEXT */}
                <div>
                  <p className="font-medium text-gray-800 capitalize">
                    {t.status}
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
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`py-4 text-center cursor-pointer transition capitalize ${
                selectedStatus === status
                  ? "bg-gray-200 font-semibold"
                  : "hover:bg-gray-50"
              }`}
            >
              {status}
            </div>
          ))}
        </div>

        {/* BUTTON */}
        <div className="p-4">
          <button className="w-full bg-[#25543E] text-white py-2 rounded">
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
}