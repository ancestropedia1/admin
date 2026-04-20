"use client";

import React from "react";
import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="bg-[#F4EFE8] border rounded-xl p-4 flex justify-end">
      <div className="relative w-full max-w-md">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search by order id, user id, Sample id..."
          className="w-full border rounded-lg pl-10 pr-4 py-2 bg-white outline-none"
        />
      </div>
    </div>
  );
}