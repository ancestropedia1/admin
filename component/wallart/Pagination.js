"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination() {
  const pages = [1, 2, 3, "...", 9, 10];

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white">
      <p className="text-sm text-gray-500">
        Showing 1 to 5 of 120 Requests
      </p>

      <div className="flex gap-2 items-center">
        <ChevronLeft size={18} className="cursor-pointer" />

        {pages.map((page, i) => (
          <button
            key={i}
            className={`w-8 h-8 rounded border text-sm ${
              page === 1
                ? "bg-[#25543E] text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {page}
          </button>
        ))}

        <ChevronRight size={18} className="cursor-pointer" />
      </div>
    </div>
  );
}