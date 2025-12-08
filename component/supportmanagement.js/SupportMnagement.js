'use client'
import React, { useState } from "react";
import Card from '../Cards';
import { Lato, Playfair_Display } from "next/font/google";
import {
  CalendarDays,
  ChevronDown,
  Search,
  Coins,
  Clock4,
  CheckCircle,
  XCircle,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";


const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
});


const SupportManagement = () => {

  const [users, setUsers] = useState([
  {
    id: "813764",
    ticketId: "8384",
    name: "Gaurav Singh",
    status: "Open",
    category: "DNA Kit",
    date: "18/08/2025",
    avatar: "/avatar-placeholder.jpg",
  },
  {
    id: "813765",
    ticketId: "8385",
    name: "Aarav Sharma",
    status: "In Progress",
    category: "Heritage Vault",
    date: "05/03/2025",
    avatar: "/avatar-placeholder.jpg",
  },
  {
    id: "813766",
    ticketId: "8386",
    name: "Kunal Verma",
    status: "Resolved",
    category: "Wall Art",
    date: "27/04/2025",
    avatar: "/avatar-placeholder.jpg",
  },
  {
    id: "813767",
    ticketId: "8387",
    name: "Rahul Singh",
    status: "In Progress",
    category: "Token",
    date: "13/02/2025",
    avatar: "/avatar-placeholder.jpg",
  },
]);


    // ----------------------------
      // ⭐ PAGINATION STATES
      // ----------------------------
      const [page, setPage] = useState(1);
      const rowsPerPage = 4;
    
      const paginatedUsers = users.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
      );
    
      const totalPages = Math.ceil(users.length / rowsPerPage);
  return (
    <div className='w-full min-h-screen'>
  
  {/* ---------------------------------- HEADER ---------------------------------- */}
        <div className="bg-[#F6F1E9] border mt-4 border-gray-400 p-8 rounded-xl shadow-sm w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex-1">
              <h1
                className={`${playfair.className} text-4xl font-extrabold text-gray-800`}
              >
                Support Tickets
              </h1>

              <p
                className={`${lato.className} text-base md:text-lg text-gray-600 mt-3 max-w-lg`}
              >
                Manage, track and resolve user queries efficiently
              </p>
            </div>
            <button
             
              className="bg-white text-black px-5 md:px-6 py-3 rounded-sm hover:bg-green-700 transition font-semibold"
            >
              KPI By Date
            </button>

            <button
              className="bg-[#265A46] text-white px-5 md:px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold shadow-md"
            >
              + Create Ticket
            </button>
          </div>
    </div>


    {/* ---------- TOP STATS CARDS ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4 p-2">
  <Card icon={<Coins className="w-7 h-7 text-yellow-600" />} value="120" label="Total Token Request" />
  <Card icon={<Clock4 className="w-7 h-7 text-orange-500" />} value="45" label="Pending Requests" />
  <Card icon={<CheckCircle className="w-7 h-7 text-green-600" />} value="68" label="Approved Request" />
  <Card icon={<XCircle className="w-7 h-7 text-red-500" />} value="7" label="Declined Request" />
</div>

      {/* ---------- FILTERS UI (unchanged) ---------- */}
      <div className="bg-[#F6F1E9] border border-gray-400 p-4 rounded-md shadow mt-4 flex flex-col md:flex-row justify-between gap-4">
        <div className="flex justify-center gap-2">
          <button className="flex gap-2 bg-white px-4 py-2 rounded-md shadow-sm">
            By Date <CalendarDays size={18} className="mt-1" />
          </button>

          <button className="flex bg-white px-4 py-2 rounded-md shadow-sm">
            By Status <ChevronDown size={18} className="mt-1" />
          </button>

          <button className="flex bg-white px-4 py-2 rounded-md shadow-sm">
           By Category <ChevronDown size={18} className="mt-1" />
          </button>
        </div>

        <div className="flex bg-white rounded-md px-3 py-2 w-full md:w-1/3 shadow-sm">
          <Search className="text-gray-500" />
          <input
            type="text"
            placeholder="Search added user..."
            className="w-full ml-2 outline-none"
          />
        </div>
      </div>
      
       {/* --------------------------- */}
{/* ⭐ SUPPORT TICKETS TABLE (Figma Exact) */}
{/* --------------------------- */}
<div className="bg-white rounded-xl   shadow-sm mt-10">
  <table className="w-full text-sm">
    <thead>
      <tr className="bg-[#FDF7EE] text-gray-700 border-b p-6">
        <th className="p-6 text-left">User</th>
        <th className="p-6 text-left">Status</th>
        <th className="p-6 text-left">Category</th>
        <th className="p-6 text-left">Created</th>
        <th className="p-6 text-left">Action</th>
      </tr>
    </thead>

    <tbody>
      {paginatedUsers.map((user, index) => (
        <tr key={index} className="border-b last:border-none">
          {/* User Column */}
          <td className="p-3 flex items-center gap-3">
            <img
              src={user.avatar}
              className="w-10 h-10 rounded-full border"
            />
            <div>
              <p className="font-medium text-gray-700">{user.name}</p>
              <p className="text-xs text-gray-500">ID-{user.id}</p>
              <p className="text-xs text-gray-500">#{user.ticketId}</p>
            </div>
          </td>

          {/* Status Column */}
          <td className="p-3 font-semibold">
            <span
              className={`${
                user.status === "Open"
                  ? "text-red-500"
                  : user.status === "In Progress"
                  ? "text-blue-500"
                  : "text-green-600"
              }`}
            >
              {user.status}
            </span>
          </td>

          {/* Category */}
          <td className="p-3 text-gray-700">{user.category}</td>

          {/* Created Date */}
          <td className="p-3 text-gray-700">{user.date}</td>

          {/* Actions */}
          <td className="p-3 flex gap-2">
            <button className="px-4 py-1 bg-[#C5FFCD] text-[#1D7A48] rounded-md text-xs font-medium">
              Resolve
            </button>

            <button className="px-4 py-1 bg-[#E6D8FF] text-[#6B47DC] rounded-md text-xs font-medium">
              Assign
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  {/* FOOTER TEXT */}
  <div className="border-t">
    <p className="text-gray-600 text-xs">
    Showing {page} to {rowsPerPage} of {users.length} Requests
  </p>

  {/* PAGINATION (same as FIGMA) */}
  <div className="flex justify-end gap-2 p-4 text-sm items-center">
    <button
      disabled={page === 1}
      onClick={() => setPage(page - 1)}
      className="p-2 border rounded-md bg-white hover:bg-gray-100 disabled:opacity-40"
    >
      <ChevronLeft size={16} />
    </button>

    {/* PAGE NUMBERS */}
    {[1, 2, 3, "...", totalPages].map((num, i) => (
      <button
        key={i}
        onClick={() => typeof num === "number" && setPage(num)}
        className={`px-3 py-1 rounded-md border ${
          page === num
            ? "bg-[#1B5E20] text-white"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
        disabled={num === "..."}
      >
        {num}
      </button>
    ))}

    <button
      disabled={page === totalPages}
      onClick={() => setPage(page + 1)}
      className="p-2 border rounded-md bg-white hover:bg-gray-100 disabled:opacity-40"
    >
      <ChevronRight size={16} />
    </button>
  </div>
  </div>
</div>
    </div>
  )
}




export default SupportManagement