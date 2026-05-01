"use client";

import React, { useState } from "react";

export default function UpdateStatusTab() {
  const [selectedStatus, setSelectedStatus] = useState("");

  return (
    <div className="grid md:grid-cols-2 gap-6">

      <div className="border p-5 rounded-xl">
        <h3 className="font-semibold mb-4">Select Status</h3>

        {["received", "preparing", "dispatched", "delivered"].map((s) => (
          <button
            key={s}
            onClick={() => setSelectedStatus(s)}
            className={`w-full py-2 mb-2 rounded border ${
              selectedStatus === s
                ? "bg-[#25543E] text-white"
                : ""
            }`}
          >
            {s}
          </button>
        ))}

        <button className="mt-4 w-full bg-[#25543E] text-white py-2 rounded">
          Update Status
        </button>
      </div>
    </div>
  );
}