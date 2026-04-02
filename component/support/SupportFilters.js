"use client";

import { CalendarDays, ChevronDown, Search } from "lucide-react";
import { useState } from "react";
import { axiosInstance } from "@/config/axios";

export default function SupportFilters({ setTickets, formatTickets }) {

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const [showStatus, setShowStatus] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [showDate, setShowDate] = useState(false);

  // ✅ API CALL
  const fetchTickets = async (updatedFilters = {}) => {
    try {
      const res = await axiosInstance.get("/admin/tickets", {
        params: {
          search,
          status,
          category,
          date,
          ...updatedFilters,
        },
      });

      // ✅ use formatter from parent
      setTickets(formatTickets(res.data.tickets));

    } catch (err) {
      console.log(err);
    }
  };

  return (

    <div className="bg-[#F6F1E9] border p-4 rounded-md shadow mt-4 flex justify-between relative">

      <div className="flex gap-2 relative">

        {/* DATE */}
        <div className="relative">
          <button
            onClick={() => setShowDate(!showDate)}
            className="flex gap-2 bg-white px-4 py-2 rounded-md"
          >
            By Date <CalendarDays size={18}/>
          </button>

          {showDate && (
            <input
              type="date"
              className="absolute top-12 left-0 bg-white border p-2 rounded-md shadow"
              onChange={(e) => {
                setDate(e.target.value);
                fetchTickets({ date: e.target.value });
                setShowDate(false);
              }}
            />
          )}
        </div>

        {/* STATUS */}
        <div className="relative">
          <button
            onClick={() => setShowStatus(!showStatus)}
            className="flex bg-white px-4 py-2 rounded-md"
          >
            By Status <ChevronDown size={18}/>
          </button>

          {showStatus && (
            <div className="absolute top-12 left-0 bg-white border rounded-md shadow w-40">
              {["Open", "In Progress", "Resolved"].map((s) => (
                <p
                  key={s}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setStatus(s);
                    fetchTickets({ status: s });
                    setShowStatus(false);
                  }}
                >
                  {s}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* CATEGORY */}
        <div className="relative">
          <button
            onClick={() => setShowCategory(!showCategory)}
            className="flex bg-white px-4 py-2 rounded-md"
          >
            By Category <ChevronDown size={18}/>
          </button>

          {showCategory && (
            <div className="absolute top-12 left-0 bg-white border rounded-md shadow w-40">
              {["Payment", "Technical", "General"].map((c) => (
                <p
                  key={c}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setCategory(c);
                    fetchTickets({ category: c });
                    setShowCategory(false);
                  }}
                >
                  {c}
                </p>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* SEARCH */}
      <div className="flex bg-white rounded-md px-3 py-2 w-1/3">

        <Search className="text-gray-500"/>

        <input
          placeholder="Search ticket..."
          className="w-full ml-2 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchTickets();
            }
          }}
        />

      </div>

    </div>

  );
}