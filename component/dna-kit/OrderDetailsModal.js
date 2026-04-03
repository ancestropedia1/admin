"use client";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { axiosInstance } from "@/config/axios";

import OverviewTab from "./tabs/OverviewTab";
import StatusTab from "./tabs/StatusTab";
import LabTab from "./tabs/LabTab";
import ReportTab from "./tabs/ReportTab";

/* ================= STATUS BADGE STYLE ================= */
const getStatusStyle = (status) => {
  switch (status) {
    case "order_confirmed":
      return "bg-yellow-100 text-yellow-700";
    case "order_dispatched":
      return "bg-blue-100 text-blue-700";
    case "order_pickedup":
      return "bg-purple-100 text-purple-700";
    case "out_for_delivery":
      return "bg-orange-100 text-orange-700";
    case "delivered":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const OrderDetailsModal = ({ orderId, onClose }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchOrder = async () => {
    if (!orderId) return;

    try {
      setLoading(true);

      const res = await axiosInstance.get(
        `/admin/dna-orders/${orderId}`,
        { headers: { "Cache-Control": "no-cache" } }
      );

      setOrder(res.data.order);
    } catch (err) {
      console.error("❌ Fetch Order Failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) fetchOrder();
  }, [orderId]);

  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-3">
      
      {/* ✅ RESPONSIVE MODAL */}
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-lg shadow-lg flex flex-col">
        
        {/* ================= HEADER ================= */}
        <div className="flex justify-between items-center border-b px-4 py-3">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-[16px] font-semibold">
              Order #{order.orderId || order._id.slice(-5)}
            </h2>

            <span
              className={`text-[11px] px-2 py-1 rounded capitalize ${getStatusStyle(order.status)}`}
            >
              {order.status.replaceAll("_", " ")}
            </span>
          </div>

          <X
            size={18}
            className="cursor-pointer text-gray-600 hover:text-black"
            onClick={onClose}
          />
        </div>

        {/* ================= TABS ================= */}
        <div className="flex flex-wrap gap-2 px-4 py-3 border-b">
          {[
            { key: "overview", label: "Overview" },
            { key: "status", label: "Status" },
            { key: "lab", label: "Lab" },
            { key: "report", label: "Report" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 py-1.5 text-[13px] rounded border transition
                ${
                  activeTab === tab.key
                    ? "bg-[#265A46] text-white border-[#265A46]"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ================= CONTENT (SCROLLABLE) ================= */}
        <div className="flex-1 overflow-y-auto p-4 text-sm">
          {loading && <p className="text-gray-500">Loading...</p>}

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