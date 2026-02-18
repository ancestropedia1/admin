"use client";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { axiosInstanceLocal, axiosInstance } from "@/config/axios";

import OverviewTab from "./tabs/OverviewTab";
import StatusTab from "./tabs/StatusTab";
import LabTab from "./tabs/LabTab";
import ReportTab from "./tabs/ReportTab";

const OrderDetailsModal = ({ orderId, onClose }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log("📦 Opening Order:", orderId);

  /* -------- FETCH ORDER -------- */
  const fetchOrder = async () => {
    if (!orderId) return;

    try {
      setLoading(true);

      const res = await axiosInstance.get(
        `/admin/dna-orders/${orderId}`
      );

      console.log("✅ Single Order:", res.data);

      setOrder(res.data.order);
    } catch (err) {
      console.error("❌ Fetch Order Failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[1000px] rounded-xl p-6 relative">
        {/* ================= HEADER ================= */}
        <div className="flex justify-between items-center border-b pb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold">
              Order #{order.orderId || order._id.slice(-5)}
            </h2>

            {/* Status Badge (Figma) */}
            <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded">
              Uploaded
            </span>
          </div>

          <X className="cursor-pointer" onClick={onClose} />
        </div>

        {/* ================= TABS (FIGMA STYLE) ================= */}
        <div className="flex gap-3 mt-6 border-b pb-4">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-5 py-2 rounded-md border transition text-sm font-medium
              ${
                activeTab === "overview"
                  ? "bg-[#265A46] text-white border-[#265A46]"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
          >
            Order Overview
          </button>

          <button
            onClick={() => setActiveTab("status")}
            className={`px-5 py-2 rounded-md border transition text-sm font-medium
              ${
                activeTab === "status"
                  ? "bg-[#265A46] text-white border-[#265A46]"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
          >
            Update Status
          </button>

          <button
            onClick={() => setActiveTab("lab")}
            className={`px-5 py-2 rounded-md border transition text-sm font-medium
              ${
                activeTab === "lab"
                  ? "bg-[#265A46] text-white border-[#265A46]"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
          >
            Assigned Lab
          </button>

          <button
            onClick={() => setActiveTab("report")}
            className={`px-5 py-2 rounded-md border transition text-sm font-medium
              ${
                activeTab === "report"
                  ? "bg-[#265A46] text-white border-[#265A46]"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
          >
            Manage Report
          </button>
        </div>

        {/* ================= TAB CONTENT ================= */}
        <div className="mt-6">
          {loading && <p>Loading...</p>}

          {activeTab === "overview" && <OverviewTab order={order} />}

          {activeTab === "status" && (
            <StatusTab order={order} refreshOrder={fetchOrder} />
          )}

          {activeTab === "lab" && (
            <LabTab order={order} refreshOrder={fetchOrder} />
          )}

          {activeTab === "report" && (
            <ReportTab order={order} refreshOrder={fetchOrder} />
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
