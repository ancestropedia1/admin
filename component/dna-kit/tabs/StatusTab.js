"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { axiosInstance } from "@/config/axios";

/* -------- STATUS FLOW -------- */
const STATUS_LIST = [
  { label: "Order Received", value: "order_confirmed" },
  { label: "Kit Dispatched", value: "order_dispatched" },
  { label: "Kit Delivered", value: "order_pickedup" },
  { label: "Sample Return", value: "out_for_delivery" },
  { label: "Sample Received", value: "delivered" },
  { label: "Report", value: "report_ready" },
];

const StatusTab = ({ order, refreshOrder }) => {
  const [loading, setLoading] = useState(false);

  const handleUpdateStatus = async (status) => {
    try {
      setLoading(true);
      await axiosInstance.patch(`/admin/dna-orders/${order._id}/status`, {
        status,
      });
      await refreshOrder();
    } catch (err) {
      console.error("Status update failed", err);
    } finally {
      setLoading(false);
    }
  };

  const currentIndex = STATUS_LIST.findIndex(
    (s) => s.value === order.status
  );

  return (
    <div className="grid grid-cols-2 gap-8 bg-[#F3F4F1] p-6 rounded-xl">
      {/* ================= LEFT : TIMELINE ================= */}
      <div className="bg-white border border-[#E4E6E2] rounded-xl p-8">
        <h3 className="text-[22px] font-semibold text-[#2F3A2F] mb-8">
          Order Status Timeline
        </h3>

        <div className="relative">
          {/* vertical line */}
          <div className="absolute left-[15px] top-0 bottom-0 w-[2px] bg-[#D9DBD6]" />

          {STATUS_LIST.map((step, i) => {
            const completed = i <= currentIndex;

            return (
              <div key={i} className="flex gap-4 mb-8 relative">
                {/* circle */}
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center z-10
                    ${
                      completed
                        ? "bg-[#4C8C6B]"
                        : "bg-[#C9CCC6]"
                    }
                  `}
                >
                  {completed ? (
                    <Check size={16} className="text-white" />
                  ) : (
                    <X size={14} className="text-white" />
                  )}
                </div>

                {/* text */}
                <div>
                  <p className="text-[16px] font-semibold text-[#2F3A2F]">
                    {step.label}
                  </p>
                  <p className="text-sm text-[#7A7D74]">
                    {completed ? "Completed" : "Not Yet Completed"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= RIGHT : STATUS SELECT ================= */}
      <div className="bg-white border border-[#E4E6E2] rounded-xl overflow-hidden">
        <div className="bg-[#2F5D50] text-white text-center py-5 text-[20px] font-semibold">
          Select Status
        </div>

        {STATUS_LIST.map((s, i) => {
          const active = order.status === s.value;

          return (
            <div
              key={i}
              onClick={() => handleUpdateStatus(s.value)}
              className={`
                text-center py-5 text-[17px] border-t border-[#E4E6E2]
                transition-all duration-150
                ${
                  active
                    ? "bg-[#EEF3F0] text-[#2F5D50] font-semibold"
                    : "text-[#2F3A2F] hover:bg-[#F7F8F6]"
                }
                ${loading && "pointer-events-none opacity-50"}
                cursor-pointer
              `}
            >
              {s.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatusTab;
