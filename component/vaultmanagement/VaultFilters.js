"use client";

import { Search, CalendarDays, ChevronDown } from "lucide-react";

export default function VaultFilters({ search, onSearch, onPageReset }) {
  return (
    <div className="bg-[#D9D9D9] border-2 border-gray-300 p-4 rounded-md shadow flex flex-col md:flex-row justify-between gap-4">
      <div className="flex gap-2">
        <button className="flex gap-2 bg-white px-4 py-2 rounded-md shadow-sm text-sm">
          By Date <CalendarDays size={16} className="mt-0.5" />
        </button>
        <button className="flex gap-2 bg-white px-4 py-2 rounded-md shadow-sm text-sm">
          By Status <ChevronDown size={16} className="mt-0.5" />
        </button>
      </div>

      <div className="flex bg-white rounded-md px-3 py-2 w-full md:w-1/3 shadow-sm items-center gap-2">
        <Search className="text-gray-500" size={18} />
        <input
          type="text"
          value={search}
          onChange={(e) => {
            onSearch(e.target.value);
            onPageReset();
          }}
          placeholder="Search user..."
          className="w-full outline-none text-sm"
        />
      </div>
    </div>
  );
}