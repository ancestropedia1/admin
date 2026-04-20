"use client";

import React from "react";

export default function Tabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "orders", label: "Orders" },
    { id: "reports", label: "Reports" },
  ];

  return (
    <div className="flex gap-3">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-6 py-3 rounded-lg font-medium border transition ${
            activeTab === tab.id
              ? "bg-[#25543E] text-white"
              : "bg-white hover:bg-gray-50"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}