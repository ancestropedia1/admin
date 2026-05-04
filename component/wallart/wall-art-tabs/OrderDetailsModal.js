"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { axiosInstance } from "@/config/axios";

import OverviewTab from "./OverviewTab";
import UpdateStatusTab from "./UpdateStatusTab";
import AssignLabTab from "./printingAgency";
import Tabs from "./Tabs";
import AssignPrintingAgencyTab from "./printingAgency";

export default function OrderDetailsModal({ open, setOpen, order }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [currentOrder, setCurrentOrder] = useState(null);
  const [loadingOrder, setLoadingOrder] = useState(false);

  // ✅ FIX: Always fetch full order details when modal opens.
  // The `order` prop from the table only has summary fields
  // (orderId, name, email, price, status, date).
  // We need the full order with address, timeline, assignedLab, etc.
  const fetchOrder = async (orderId) => {
    try {
      setLoadingOrder(true);
      const res = await axiosInstance.get(`/admin/wallart/orders/${orderId}`);
      setCurrentOrder(res.data.data);
    } catch (err) {
      console.error("Failed to fetch order details", err);
    } finally {
      setLoadingOrder(false);
    }
  };

  // ✅ Reset tab + fetch fresh order whenever modal opens
  useEffect(() => {
    if (open && order?.orderId) {
      setActiveTab("overview");
      fetchOrder(order.orderId);
    }

    // Cleanup when modal closes
    if (!open) {
      setCurrentOrder(null);
    }
  }, [open, order?.orderId]);

  // 🔥 Used by child tabs after mutations (status update, lab assign)
  const refreshOrder = async () => {
    if (currentOrder?.orderId) {
      await fetchOrder(currentOrder.orderId);
    }
  };

  if (!open) return null;

  const tabs = [
    { id: "overview", label: "Order Overview" },
    { id: "status", label: "Update Status" },
    { id: "lab", label: "Printing Agency" },
  ];

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-start p-8 overflow-auto">
      <div className="bg-white rounded-xl w-full max-w-5xl shadow-xl">

        {/* HEADER */}
        <div className="flex justify-between items-center border-b px-6 py-4">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold">
              Order #{order?.orderId}
            </h2>

            {currentOrder && (
              <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-md capitalize">
                {currentOrder.adminStatus}
              </span>
            )}
          </div>

          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        {/* TABS */}
        <div className="px-6 py-4 border-b">
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        {/* CONTENT */}
        <div className="p-6">
          {loadingOrder ? (
            <div className="flex items-center justify-center py-16 text-gray-400">
              Loading order details...
            </div>
          ) : !currentOrder ? (
            <div className="flex items-center justify-center py-16 text-red-400">
              Failed to load order
            </div>
          ) : (
            <>
              {activeTab === "overview" && (
                // ✅ FIX: Pass full `order` object (not just orderId)
                <OverviewTab order={currentOrder} />
              )}

              {activeTab === "status" && (
                <UpdateStatusTab
                  order={currentOrder}
                  refreshOrder={refreshOrder}
                />
              )}

              {activeTab === "lab" && (
                <AssignPrintingAgencyTab
                  order={currentOrder}
                  refreshOrder={refreshOrder}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}