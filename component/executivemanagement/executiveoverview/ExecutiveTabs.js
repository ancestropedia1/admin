"use client";

import { useState } from "react";
import PermissionsSection from "./PermissionsSection";
import StatsCards from "./StatsCards";
import ResponsibilitiesTable from "./ResponsibilitiesTable";


export default function ExecutiveTabs() {
  const tabs = ["Overview", "Permissions", "Performances", "Activity Logs"];
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div>
      {/* 🔹 TAB HEADER */}
      <div className="flex gap-6 mt-6 border-b">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 transition-all ${
              activeTab === tab
                ? "border-b-2 border-[#8B4513] font-semibold text-[#8B4513]"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 🔹 TAB CONTENT */}
      <div className="mt-6 space-y-6">
        {/* 🔸 PERMISSIONS TAB (ONLY THIS SHOWS) */}
        {activeTab === "Permissions" && <PermissionsSection />}

        {/* 🔸 ALL OTHER TABS */}
        {activeTab !== "Permissions" && (
          <>

        
           <ResponsibilitiesTable />
            <StatsCards />
            {/* {activeTab === "Performances" && <PerformanceSection />}

            {activeTab === "Activity Logs" && <ActivityLogs />} */}
          </>
        )}
      </div>
    </div>
  );
}
