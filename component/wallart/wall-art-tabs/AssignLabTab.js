"use client";

import React, { useState } from "react";
import { axiosInstance } from "@/config/axios";
import toast from "react-hot-toast";

const agencies = [
  { id: "1", name: "YRS Printing Agency" },
  { id: "2", name: "Bharti Painting Agency" },
  { id: "3", name: "Alpha Painting House" },
  { id: "4", name: "Astha Printing Lab" },
];

export default function AssignPrintingAgencyTab({ order, refreshOrder }) {
  const [selectedAgency, setSelectedAgency] = useState(
    order?.printingAgency?.agencyId || ""
  );
  const [loading, setLoading] = useState(false);

  const isAssigned = !!order?.printingAgency?.agencyId;

  const handleAssign = async () => {
    if (!selectedAgency) {
      return toast.error("Please select an agency");
    }

    const agency = agencies.find((a) => a.id === selectedAgency);

    try {
      setLoading(true);

      await axiosInstance.put(
        `/admin/wallart/orders/${order.orderId}/assign-PrintingAgency`,
        {
          agencyId: agency.id,
          agencyName: agency.name,
        }
      );

      toast.success("Printing agency assigned");

      if (refreshOrder) await refreshOrder();
    } catch (err) {
      console.error(err);
      toast.error("Failed to assign agency");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* TITLE */}
      <h2 className="text-lg font-semibold">Order Status Timeline</h2>

      <div className="grid md:grid-cols-2 gap-6">

        {/* LEFT IMAGE */}
        <div className="rounded-xl overflow-hidden border">
          <img
            src="https://images.unsplash.com/photo-1581092335397-9583eb92d232"
            alt="printing"
            className="w-full h-full object-cover"
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-4">

          {/* CURRENT */}
          {isAssigned && (
            <div className="bg-green-50 border border-green-200 p-3 rounded-lg text-sm">
              Assigned:{" "}
              <span className="font-semibold">
                {order.printingAgency?.agencyName}
              </span>
            </div>
          )}

          {/* AGENCY LIST */}
          <div className="space-y-3">
            {agencies.map((agency) => (
              <label
                key={agency.id}
                className={`flex items-center justify-between border rounded-lg px-4 py-2 cursor-pointer transition ${
                  selectedAgency === agency.id
                    ? "border-green-600 bg-green-50"
                    : "border-gray-300"
                }`}
              >
                <span className="text-sm font-medium">
                  {agency.name}
                </span>

                <input
                  type="radio"
                  name="agency"
                  checked={selectedAgency === agency.id}
                  onChange={() => setSelectedAgency(agency.id)}
                  className="accent-green-700"
                />
              </label>
            ))}
          </div>

          {/* BUTTON */}
          <button
            onClick={handleAssign}
            disabled={loading}
            className="bg-[#25543E] text-white px-5 py-2 rounded-lg mt-2 disabled:opacity-50"
          >
            {loading ? "Assigning..." : "Assign Agency"}
          </button>
        </div>
      </div>
    </div>
  );
}