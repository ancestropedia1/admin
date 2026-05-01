"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

import OverviewTab from "./OverviewTab";
import UpdateStatusTab from "./UpdateStatusTab";
import AssignLabTab from "./AssignLabTab";
import Tabs from "./Tabs";

export default function OrderDetailsModal({ open, setOpen, order }) {
  const [activeTab, setActiveTab] = useState("overview");

  if (!open || !order) return null;

  const tabs = [
    { id: "overview", label: "Order Overview" },
    { id: "status", label: "Update Status" },
    { id: "lab", label: "Assigned Lab" },
  ];

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-start p-8 overflow-auto">
      <div className="bg-white rounded-xl w-full max-w-5xl shadow-xl">

        {/* HEADER */}
        <div className="flex justify-between items-center border-b px-6 py-4">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold">
              Order #{order.orderId}
            </h2>

            <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-md capitalize">
              {order.adminStatus}
            </span>
          </div>

          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        {/* 🔥 TABS COMPONENT */}
        <div className="px-6 py-4 border-b">
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        {/* 🔥 CONTENT SWITCH */}
        <div className="p-6">

          {activeTab === "overview" && (
            <OverviewTab order={order} />
          )}

          {activeTab === "status" && (
            <UpdateStatusTab order={order} />
          )}

          {activeTab === "lab" && (
            <AssignLabTab order={order} />
          )}

        </div>
      </div>
    </div>
  );
}