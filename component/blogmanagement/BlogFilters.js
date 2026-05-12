"use client";

import { useState } from "react";
import { Search, CalendarDays, ChevronDown } from "lucide-react";

export default function BlogFilters({
  searchQuery, setSearchQuery,
  selectedAuthor, setSelectedAuthor,
  showFeatured, setShowFeatured,
  postDate, setPostDate,
  allAuthors,
}) {
  const [showDateInput,   setShowDateInput]   = useState(false);
  const [showAuthorFilter,setShowAuthorFilter] = useState(false);

  return (
    <div className="bg-[#F6F1E9] border p-4 rounded-xl shadow mt-6 flex flex-col md:flex-row justify-between gap-4">
      <div className="flex flex-wrap gap-3">

        {/* DATE */}
        <div className="relative">
          <button
            onClick={() => setShowDateInput(!showDateInput)}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm"
          >
            {postDate || "By Date"}
            <CalendarDays size={18} />
          </button>
          {showDateInput && (
            <input
              type="date"
              onChange={(e) => {
                setPostDate(e.target.value);
                setShowDateInput(false);
              }}
              className="absolute mt-2 left-0 border p-2 rounded-lg bg-white shadow-md z-20"
            />
          )}
        </div>

        {/* AUTHOR */}
        <div className="relative">
          <button
            onClick={() => setShowAuthorFilter(!showAuthorFilter)}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm"
          >
            {selectedAuthor || "By Author"}
            <ChevronDown size={18} />
          </button>
          {showAuthorFilter && (
            <div className="absolute mt-2 bg-white border rounded-xl shadow-md z-20 w-40">
              <div
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => { setSelectedAuthor(null); setShowAuthorFilter(false); }}
              >
                All Authors
              </div>
              {allAuthors.map((author, i) => (
                <div
                  key={i}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => { setSelectedAuthor(author); setShowAuthorFilter(false); }}
                >
                  {author}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FEATURED */}
        <button
          onClick={() => setShowFeatured(!showFeatured)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm ${
            showFeatured ? "bg-[#265A46] text-white" : "bg-white"
          }`}
        >
          Featured <ChevronDown size={18} />
        </button>
      </div>

      {/* SEARCH */}
      <div className="flex bg-white rounded-lg px-4 py-3 shadow-sm w-full md:w-1/3">
        <Search className="text-gray-500 mt-1" size={18} />
        <input
          type="text"
          placeholder="Search blog..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full ml-2 outline-none"
        />
      </div>
    </div>
  );
}