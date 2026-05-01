"use client";

import React, { useState } from "react";

export default function AssignLabTab() {
  const [selectedLab, setSelectedLab] = useState("");

  const labs = [
    "YRS Printing Agency",
    "Bharti Painting Agency",
    "Alpha Painting House",
    "Astha Printing Lab",
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">

      {/* ================= LEFT IMAGE ================= */}
      <div className="rounded-xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1581091215367-59ab6b6c6f53"
          className="w-full h-56 object-cover rounded-xl"
        />
      </div>

      {/* ================= RIGHT LAB SELECT ================= */}
      <div className="border rounded-xl p-5">
        <h3 className="text-lg font-semibold mb-4">
          Assign Printing Agency
        </h3>

        <div className="space-y-2">
          {labs.map((lab) => (
            <div
              key={lab}
              onClick={() => setSelectedLab(lab)}
              className={`flex justify-between items-center border rounded-md px-4 py-2 cursor-pointer transition ${
                selectedLab === lab
                  ? "border-[#25543E] bg-green-50"
                  : "hover:bg-gray-50"
              }`}
            >
              <span className="text-sm">{lab}</span>

              {/* RADIO ICON */}
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  selectedLab === lab
                    ? "border-[#25543E]"
                    : "border-gray-400"
                }`}
              >
                {selectedLab === lab && (
                  <div className="w-2 h-2 bg-[#25543E] rounded-full" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* BUTTON */}
        <button className="mt-5 bg-[#25543E] text-white px-4 py-2 rounded-md text-sm">
          Assign Agency
        </button>
      </div>
    </div>
  );
}