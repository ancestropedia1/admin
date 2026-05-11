"use client";

import { useState } from "react";
import { CalendarDays } from "lucide-react";

export default function VaultAnalysis({ stats }) {
  const [fromDate, setFromDate] = useState("");
  const [toDate,   setToDate]   = useState("");

  const analysis = stats?.analysis;

  const analysisCards = [
    {
      title: "Storage Used",
      content: (
        <>
          <p className="text-xs text-gray-500 mt-1">
            {stats?.totalStorageGB || 0} GB of 5 PB
          </p>
          <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#1D7A48] transition-all"
              style={{ width: `${analysis?.storageUsedPct || 0}%` }}
            />
          </div>
          <p className="text-[#1D7A48] font-semibold mt-1 text-sm">
            {analysis?.storageUsedPct || 0}%
          </p>
        </>
      ),
    },
    {
      title: "Total Files Created",
      content: (
        <>
          <p className="text-[#4263EB] text-xl font-bold mt-2">
            {analysis?.totalFiles?.toLocaleString() || "847K"}
          </p>
          <p className="text-green-600 text-xs font-medium">+12% this Year</p>
        </>
      ),
    },
    {
      title: "Storage Use Type",
      content: (
        <ul className="text-xs text-gray-600 mt-2 space-y-1">
          <li>Photo — {analysis?.typePercentage?.photo || 60}%</li>
          <li>Video — {analysis?.typePercentage?.video || 20}%</li>
          <li>Audio — {analysis?.typePercentage?.audio || 15}%</li>
          <li>Doc   — {analysis?.typePercentage?.doc   || 5}%</li>
        </ul>
      ),
    },
    {
      title: "Plan Sold",
      content: (
        <ul className="text-xs text-gray-600 mt-2 space-y-1">
          <li>Standard — 430K</li>
          <li>Pro — 320K</li>
        </ul>
      ),
    },
    {
      title: "Total Users",
      content: (
        <>
          <p className="text-[#E67E22] text-xl font-bold mt-2">
            {stats?.totalUsers?.toLocaleString() || "4K"}
          </p>
          <p className="text-green-600 text-xs font-medium">
            +6% Growth this month
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="bg-[#E9F6EE] p-6 rounded-xl border-2 border-gray-300 shadow-sm">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
        <h2 className="text-xl font-semibold text-[#1B3B2F]">
          Vault Usage Analysis
        </h2>

        <div className="flex gap-3 items-center">
          <span className="text-sm font-semibold">Time:</span>
          <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-md shadow-sm text-sm">
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="outline-none text-sm"
            />
            <CalendarDays size={14} />
          </div>
          <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-md shadow-sm text-sm">
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="outline-none text-sm"
            />
            <CalendarDays size={14} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {analysisCards.map((card, i) => (
          <div key={i} className="bg-white p-4 border shadow-sm rounded-lg">
            <p className="text-sm font-semibold text-gray-700">{card.title}</p>
            {card.content}
          </div>
        ))}
      </div>
    </div>
  );
}