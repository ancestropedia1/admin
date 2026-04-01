"use client";

import { useEffect, useState } from "react";
import { axiosInstance } from "@/config/axios";

const LabTab = ({ order, refreshOrder }) => {
  const [labs, setLabs] = useState([]);
  const [selectedLab, setSelectedLab] = useState("");
  const [loading, setLoading] = useState(false);

  /* ---------------- FETCH LABS ---------------- */
  const fetchLabs = async () => {
    try {
      const res = await axiosInstance.get("/api/labs");
      setLabs(res.data.data);
    } catch (err) {
      console.error("❌ Fetch labs failed:", err);
    }
  };

  useEffect(() => {
    fetchLabs();
  }, []);

  /* ✅ Sync selected lab */
  useEffect(() => {
    setSelectedLab(order.labAssigned || "");
  }, [order]);

  /* ---------------- ASSIGN LAB ---------------- */
  const handleAssignLab = async () => {
    if (!selectedLab) return alert("Please select a lab");

    try {
      setLoading(true);

      await axiosInstance.patch(
        `/admin/dna-orders/${order._id}/lab`,
        { labAssigned: selectedLab } // now sending labId
      );

      await refreshOrder();
    } catch (err) {
      console.error("❌ Assign Lab Failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-6">

      {/* LEFT */}
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

      {/* RIGHT */}
      <div className="rounded-xl overflow-hidden border">
        <div className="bg-[#265A46] text-white p-4 font-semibold text-lg">
          Select Lab
        </div>

        {labs.map((lab) => (
          <div
            key={lab._id}
            onClick={() =>
              lab.status !== "hold" && setSelectedLab(lab._id)
            }
            className={`px-6 py-4 border-t transition
              ${
                lab.status === "hold"
                  ? "bg-gray-200 cursor-not-allowed"
                  : "cursor-pointer hover:bg-gray-50"
              }
              ${
                selectedLab === lab._id
                  ? "bg-green-100 font-semibold"
                  : ""
              }`}
          >
            <p>{lab.name}</p>

            {/* OPTIONAL SMALL INFO */}
            <p className="text-sm text-gray-500">
              ₹ {lab.dnaPrice} • {lab.category}
            </p>

            {lab.status === "hold" && (
              <p className="text-red-500 text-sm">On Hold</p>
            )}
          </div>
        ))}

        {/* BUTTON */}
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