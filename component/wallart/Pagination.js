"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  page,
  setPage,
  totalPages = 1,
  total = 0,
  limit = 10,
}) {
  if (totalPages <= 1) return null;

  // 🔥 Generate page numbers (with dots like 1 2 3 ... 10)
  const getPages = () => {
    let pages = [];

    if (totalPages <= 6) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (page > 3) pages.push("...");

    for (
      let i = Math.max(2, page - 1);
      i <= Math.min(totalPages - 1, page + 1);
      i++
    ) {
      pages.push(i);
    }

    if (page < totalPages - 2) pages.push("...");

    pages.push(totalPages);

    return pages;
  };

  const pages = getPages();

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white">

      {/* 🔥 LEFT TEXT */}
      <p className="text-sm text-gray-500">
        Showing {(page - 1) * limit + 1} to{" "}
        {Math.min(page * limit, total)} of {total} Requests
      </p>

      {/* 🔥 PAGINATION */}
      <div className="flex gap-2 items-center">

        {/* PREV */}
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="p-1 disabled:opacity-40"
        >
          <ChevronLeft size={18} />
        </button>

        {/* PAGE NUMBERS */}
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={i} className="px-2 text-gray-400">
              ...
            </span>
          ) : (
            <button
              key={i}
              onClick={() => setPage(p)}
              className={`w-8 h-8 rounded border text-sm ${
                page === p
                  ? "bg-[#25543E] text-white border-[#25543E]"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {p}
            </button>
          )
        )}

        {/* NEXT */}
        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="p-1 disabled:opacity-40"
        >
          <ChevronRight size={18} />
        </button>

      </div>
    </div>
  );
}