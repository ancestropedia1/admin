"use client";

import { useEffect, useState } from "react";
import { axiosInstance } from "@/config/axios";

const LABS = [
  "JRP Genetic Lab",
  "IAL Pathlabs",
  "Aakash Genetic Lab",
  "DNA New Lab",
];

const LabTab = ({ order, refreshOrder }) => {
  const [selectedLab, setSelectedLab] = useState("");
  const [loading, setLoading] = useState(false);

  /* ✅ Sync when order changes */
  useEffect(() => {
    setSelectedLab(order.labAssigned || "");
  }, [order]);

  /* -------- ASSIGN LAB -------- */
  const handleAssignLab = async () => {
    if (!selectedLab) return alert("Please select a lab");

    try {
      setLoading(true);

      await axiosInstance.patch(
        `/admin/dna-orders/${order._id}/lab`,
        { labAssigned: selectedLab }
      );

      await refreshOrder(); // reload modal data
    } catch (err) {
      console.error("❌ Assign Lab Failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* LEFT : CURRENT INFO */}
      <div className="border rounded-xl p-6 bg-white">
        <h3 className="text-lg font-semibold mb-4">Current Assignment</h3>

        <p className="text-gray-600 mb-2">Assigned Lab</p>

        <p className="text-green-700 font-semibold text-lg">
          {order.labAssigned || "Not Assigned"}
        </p>

        <p className="text-sm text-gray-400 mt-2">
          Select a laboratory from the right to assign this order.
        </p>
      </div>

      {/* RIGHT : LAB SELECTION */}
      <div className="rounded-xl overflow-hidden border">
        <div className="bg-[#265A46] text-white p-4 font-semibold text-lg">
          Select Lab
        </div>

        {LABS.map((lab, i) => (
          <div
            key={i}
            onClick={() => setSelectedLab(lab)}
            className={`px-6 py-4 cursor-pointer border-t transition
              ${
                selectedLab === lab
                  ? "bg-green-100 font-semibold"
                  : "bg-white hover:bg-gray-50"
              }`}
          >
            {lab}
          </div>
        ))}

        {/* ASSIGN BUTTON */}
        <div className="p-4 border-t">
          <button
            onClick={handleAssignLab}
            disabled={loading}
            className="w-full bg-[#265A46] text-white py-3 rounded-md hover:bg-green-800 transition disabled:opacity-60"
          >
            {loading ? "Assigning..." : "Assign Lab"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LabTab;
