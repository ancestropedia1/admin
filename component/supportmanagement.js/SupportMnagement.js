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

  // Example Ticket Data (replace with your API data)
const tickets = [
  {
    ticketId: "88384",
    title: "Issue with DNA report",
    category: "DNA Kit",
    status: "Open",
    date: "18/08/2025",
    agent: "Divyanshu",
  },
  {
    ticketId: "88384",
    title: "Token Balance Updating",
    category: "Heritage Vault",
    status: "In Progress",
    date: "05/03/2025",
    agent: "Divyanshu",
  },
  {
    ticketId: "88384",
    title: "Vault Space Issue",
    category: "Wall Art",
    status: "Resolved",
    date: "27/04/2025",
    agent: "Divyanshu",
  },
  {
    ticketId: "88384",
    title: "Billing Inquiry Premium",
    category: "Token",
    status: "In Progress",
    date: "13/02/2025",
    agent: "Divyanshu",
  },
  {
    ticketId: "88384",
    title: "Wall Art Disorder",
    category: "Family tree",
    status: "Open",
    date: "23/09/2025",
    agent: "Divyanshu",
  },
];



    const [page, setPage] = useState(1);
const rowsPerPage = 5;

const totalPages = Math.ceil(tickets.length / rowsPerPage);

// Slice for current page
const paginatedTickets = tickets.slice(
  (page - 1) * rowsPerPage,
  page * rowsPerPage
);

  return (
    <div className='w-full min-h-screen'>
  
  {/* ---------------------------------- HEADER ---------------------------------- */}
        <div className="bg-[#F6F1E9] mt-10 border border-gray-400 p-8 rounded-xl shadow-sm w-full">
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
{/* ⭐ SUPPORT TICKETS TABLE – FIGMA EXACT UI */} 
<div className="bg-white rounded-xl shadow-sm mt-10 overflow-x-auto border">

  {/* Section Header */}
  <div className="bg-[#F6F1E9] border-b p-4 text-xl font-bold text-gray-800">
    Ticket ID
  </div>

  {/* DESKTOP TABLE */}
  <table className="w-full hidden md:table">
    <thead>
      <tr className="bg-[#F6F1E9] border-b">
        <th className="text-left p-5 font-semibold text-gray-700">Ticket ID</th>
        <th className="text-left p-5 font-semibold text-gray-700">User</th>
        <th className="text-left p-5 font-semibold text-gray-700">Category</th>
        <th className="text-left p-5 font-semibold text-gray-700">Status</th>
        <th className="text-left p-5 font-semibold text-gray-700">Created</th>
        <th className="text-left p-5 font-semibold text-gray-700">Action</th>
      </tr>
    </thead>

    <tbody>
      {paginatedTickets.map((item, index) => (
        <tr
          key={index}
          className="border-b last:border-none hover:bg-gray-50 transition"
        >
          {/* TICKET ID */}
          <td className="p-5 text-gray-700">#{item.ticketId}</td>

          {/* USER COLUMN – Image + Name + ID */}
          <td className="p-5">
            <div className=" gap-3">
              <img
                src={item.avatar}
                className="w-10 h-10 rounded-full object-cover"
                alt="User"
              />
              <div className="flex">
                <p className="text-gray-800 font-medium">{item.name}</p>
                <p className="text-xs text-gray-500">ID-{item.userId}</p>
              </div>
            </div>
          </td>

          {/* CATEGORY */}
          <td className="p-5 text-gray-700">{item.category}</td>

          {/* STATUS */}
          <td className="p-5">
            <span
              className={`font-medium ${
                item.status === "Open"
                  ? "text-[#E56A34]"
                  : item.status === "In Progress"
                  ? "text-[#4A6FF3]"
                  : "text-[#1E7E34]"
              }`}
            >
              {item.status}
            </span>
          </td>

          {/* CREATED DATE */}
          <td className="p-5 text-gray-700">{item.date}</td>

          {/* ACTION BUTTONS */}
          <td className="p-5">
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-[#C5FFCD] text-[#1D7A48] rounded-md text-xs font-medium">
                Resolve
              </button>
              <button className="px-3 py-1 bg-[#E6D8FF] text-[#6B47DC] rounded-md text-xs font-medium">
                Assign
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  {/* MOBILE CARD VIEW */}
  <div className="md:hidden p-3">
    {paginatedTickets.map((item, index) => (
      <div key={index} className="border rounded-lg p-4 mb-4 bg-white shadow-sm">

        {/* Top Row */}
        <div className="flex justify-between mb-3">
          <p className="font-semibold text-gray-800">#{item.ticketId}</p>
          <span
            className={`text-sm font-semibold ${
              item.status === "Open"
                ? "text-[#E56A34]"
                : item.status === "In Progress"
                ? "text-[#4A6FF3]"
                : "text-[#1E7E34]"
            }`}
          >
            {item.status}
          </span>
        </div>

        {/* User */}
        <div className="flex items-center gap-3 mb-3">
          <img src={item.avatar} className="w-12 h-12 rounded-full" />
        </div>

        <div>
            <p className="font-medium text-gray-700">{item.name}</p>
            <p className="text-xs text-gray-500">ID-{item.userId}</p>
          </div>

        {/* Category + Date */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-gray-500 text-xs">Category</p>
            <p className="font-medium text-gray-700">{item.category}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Created</p>
            <p className="font-medium text-gray-700">{item.date}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <button className="w-full px-4 py-2 bg-[#C5FFCD] text-[#1D7A48] rounded-md text-sm">
            Resolve
          </button>
          <button className="w-full px-4 py-2 bg-[#E6D8FF] text-[#6B47DC] rounded-md text-sm">
            Assign
          </button>
        </div>
      </div>
    ))}
  </div>

  {/* FOOTER PAGINATION */}
  <div className="border-t p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
    <p className="text-gray-600 text-sm">
      Showing {(page - 1) * rowsPerPage + 1}–
      {Math.min(page * rowsPerPage, tickets.length)} of {tickets.length} Requests
    </p>

    <div className="flex gap-2">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="p-2 border rounded-md bg-white disabled:opacity-40"
      >
        <ChevronLeft size={16} />
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          onClick={() => setPage(i + 1)}
          className={`px-3 py-1 border rounded-md ${
            page === i + 1
              ? "bg-green-700 text-white"
              : "bg-white text-gray-700"
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="p-2 border rounded-md bg-white disabled:opacity-40"
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