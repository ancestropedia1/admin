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

      <div className="border p-5 rounded-xl">
        <img
          src="https://images.unsplash.com/photo-1581091215367-59ab6b6c6f53"
          className="w-full h-56 object-cover rounded"
        />
      </div>

      <div className="border p-5 rounded-xl">
        <h3 className="font-semibold mb-4">Assign Lab</h3>

        {labs.map((lab) => (
          <div
            key={lab}
            onClick={() => setSelectedLab(lab)}
            className={`border p-3 mb-2 rounded cursor-pointer ${
              selectedLab === lab
                ? "bg-[#25543E] text-white"
                : ""
            }`}
          >
            {lab}
          </div>
        ))}

        <button className="mt-4 w-full bg-[#25543E] text-white py-2 rounded">
          Assign Lab
        </button>
      </div>
    </div>
  );
}