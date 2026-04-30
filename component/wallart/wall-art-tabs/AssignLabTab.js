"use client";

import React, { useState } from "react";
import { axiosInstance } from "@/config/axios";
import toast from "react-hot-toast";

export default function AssignLabTab({ order }) {
  const [selectedLab, setSelectedLab] = useState("");
  const [loading, setLoading] = useState(false);

  const labs = [
    "YRS Printing Agency",
    "Bharti Painting Agency",
    "Alpha Painting House",
    "Astha Printing Lab",
  ];

  const handleAssign = async () => {
    if (!selectedLab) return toast.error("Select lab");

    try {
      setLoading(true);

      await axiosInstance.put(
        `/admin/wallart/orders/${order.orderId}/assign-lab`,
        {
          labId: selectedLab,
          labName: selectedLab,
        }
      );

      toast.success("Lab assigned");
    } catch (err) {
      toast.error("Failed to assign");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">

      {/* LEFT IMAGE */}
      <div className="border rounded-xl p-5">
        <img
          src="https://images.unsplash.com/photo-1581091215367-59ab6b6c6f53"
          className="rounded-md w-full h-56 object-cover"
        />
      </div>

      {/* RIGHT LAB SELECT */}
      <div className="border rounded-xl p-5">
        <h3 className="text-lg font-semibold mb-4">
          Assign Printing Agency
        </h3>

        {labs.map((lab) => (
          <div
            key={lab}
            onClick={() => setSelectedLab(lab)}
            className={`border p-3 mb-2 rounded cursor-pointer ${
              selectedLab === lab
                ? "bg-[#25543E] text-white"
                : "hover:bg-gray-50"
            }`}
          >
            {lab}
          </div>
        ))}

        <button
          onClick={handleAssign}
          disabled={loading}
          className="mt-4 w-full bg-[#25543E] text-white py-2 rounded"
        >
          Assign Agency
        </button>
      </div>
    </div>
  );
}