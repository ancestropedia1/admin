"use client";

import React from "react";
import { CalendarDays, ChevronDown } from "lucide-react";

export default function FilterBar() {
  const FilterBtn = ({ title, icon }) => (
    <button className="bg-white border px-4 py-2 rounded-md flex items-center gap-2 text-sm shadow-sm">
      {title}
      {icon}
    </button>
  );

  return (
    <div className="bg-[#F4EFE8] border rounded-xl p-4 flex justify-between items-center flex-wrap gap-4">
      <div className="flex gap-3 flex-wrap">
        <FilterBtn title="By Date" icon={<CalendarDays size={16} />} />
        <FilterBtn title="By Status" icon={<ChevronDown size={16} />} />
        <FilterBtn title="By Received" icon={<ChevronDown size={16} />} />
        <FilterBtn title="By Category" icon={<ChevronDown size={16} />} />
      </div>

      <button className="bg-[#A45B32] hover:bg-[#8c4c28] text-white px-6 py-2 rounded-md">
        Apply Filter
      </button>
    </div>
  );
}