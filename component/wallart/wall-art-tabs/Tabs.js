"use client";

import React from "react";

export default function Tabs({ tabs, activeTab, setActiveTab }) {
  return (
    <div className="flex gap-3">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition ${
            activeTab === tab.id
              ? "bg-[#25543E] text-white"
              : "border bg-white hover:bg-gray-50"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}