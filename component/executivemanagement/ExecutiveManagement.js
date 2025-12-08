'use client'
import Card from "../Cards";
import React, { useState } from "react";
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



const ExecutiveManagement = () => {


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
                Executive Account Management
              </h1>

              <p
                className={`${lato.className} text-base md:text-lg text-gray-600 mt-3 max-w-lg`}
              >
                Manage all administrative users and assign appropriate roles and permissions.
              </p>
            </div>

            <button
              className="bg-[#265A46] text-white px-5 md:px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold shadow-md"
            >
              + Create Executive Account
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
      <div className="bg-white rounded-xl shadow-sm mt-10 overflow-x-auto">
        {/* Mobile card view for small screens */}
        <div className="md:hidden">
          {paginatedUsers.map((user, index) => (
            <div key={index} className="border-b p-4 last:border-none">
              {/* Mobile Card Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar}
                    className="w-12 h-12 rounded-full border"
                    alt={user.name}
                  />
                  <div>
                    <p className="font-medium text-gray-700">{user.name}</p>
                    <p className="text-xs text-gray-500">ID-{user.id}</p>
                    <p className="text-xs text-gray-500">#{user.ticketId}</p>
                  </div>
                </div>
                <span
                  className={`text-sm font-semibold ${
                    user.status === "Open"
                      ? "text-red-500"
                      : user.status === "In Progress"
                      ? "text-blue-500"
                      : "text-green-600"
                  }`}
                >
                  {user.status}
                </span>
              </div>
      
              {/* Mobile Card Details */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-500 text-xs">Category</p>
                  <p className="font-medium text-gray-700">{user.category}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Created</p>
                  <p className="font-medium text-gray-700">{user.date}</p>
                </div>
              </div>
      
              {/* Mobile Actions */}
              <div className="flex gap-2 mt-4">
                <button className="flex-1 px-4 py-2 bg-[#C5FFCD] text-[#1D7A48] rounded-md text-sm font-medium">
                  Resolve
                </button>
                <button className="flex-1 px-4 py-2 bg-[#E6D8FF] text-[#6B47DC] rounded-md text-sm font-medium">
                  Assign
                </button>
              </div>
            </div>
          ))}
        </div>
      
        {/* Desktop table view (hidden on mobile) */}
        <table className="w-full text-sm hidden md:table">
          <thead>
            <tr className="bg-[#FDF7EE] text-gray-700 border-b">
              <th className="p-4 md:p-6 text-left">User</th>
              <th className="p-4 md:p-6 text-left">Status</th>
              <th className="p-4 md:p-6 text-left">Category</th>
              <th className="p-4 md:p-6 text-left">Created</th>
              <th className="p-4 md:p-6 text-left">Action</th>
            </tr>
          </thead>
      
          <tbody>
            {paginatedUsers.map((user, index) => (
              <tr key={index} className="border-b last:border-none hover:bg-gray-50">
                {/* User Column */}
                <td className="p-3 md:p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar}
                      className="w-10 h-10 rounded-full border"
                      alt={user.name}
                    />
                    <div>
                      <p className="font-medium text-gray-700">{user.name}</p>
                      <p className="text-xs text-gray-500">ID-{user.id}</p>
                      <p className="text-xs text-gray-500">#{user.ticketId}</p>
                    </div>
                  </div>
                </td>
      
                {/* Status Column */}
                <td className="p-3 md:p-4">
                  <span
                    className={`font-semibold ${
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
                <td className="p-3 md:p-4 text-gray-700">{user.category}</td>
      
                {/* Created Date */}
                <td className="p-3 md:p-4 text-gray-700">{user.date}</td>
      
                {/* Actions */}
                <td className="p-3 md:p-4">
                  <div className="flex gap-2 flex-wrap">
                    <button className="px-3 py-1 md:px-4 md:py-1 bg-[#C5FFCD] text-[#1D7A48] rounded-md text-xs md:text-sm font-medium hover:opacity-90 transition-opacity">
                      Resolve
                    </button>
                    <button className="px-3 py-1 md:px-4 md:py-1 bg-[#E6D8FF] text-[#6B47DC] rounded-md text-xs md:text-sm font-medium hover:opacity-90 transition-opacity">
                      Assign
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      
        {/* Footer with pagination - Responsive */}
        <div className="border-t p-4">
          {/* Showing text */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
            <p className="text-gray-600 text-xs md:text-sm">
              Showing {(page - 1) * rowsPerPage + 1} to{" "}
              {Math.min(page * rowsPerPage, users.length)} of {users.length} Requests
            </p>
      
            {/* Pagination */}
            <div className="flex flex-wrap justify-center sm:justify-end gap-2 items-center">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="p-2 border rounded-md bg-white hover:bg-gray-100 disabled:opacity-40 transition-colors"
                aria-label="Previous page"
              >
                <ChevronLeft size={16} />
              </button>
      
              {/* Responsive page numbers */}
              <div className="flex gap-1 md:gap-2">
                {totalPages <= 5 ? (
                  // Show all pages for small total
                  [...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`px-2 md:px-3 py-1 rounded-md border text-sm ${
                        page === i + 1
                          ? "bg-[#1B5E20] text-white"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))
                ) : (
                  // Show limited pages for large total
                  <>
                    {page > 3 && (
                      <>
                        <button
                          onClick={() => setPage(1)}
                          className={`px-2 md:px-3 py-1 rounded-md border text-sm ${
                            page === 1
                              ? "bg-[#1B5E20] text-white"
                              : "bg-white text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          1
                        </button>
                        {page > 4 && <span className="px-2 py-1">...</span>}
                      </>
                    )}
      
                    {[...Array(Math.min(5, totalPages))].map((_, i) => {
                      let pageNum;
                      if (page <= 3) {
                        pageNum = i + 1;
                      } else if (page >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = page - 2 + i;
                      }
      
                      return (
                        pageNum <= totalPages && (
                          <button
                            key={i}
                            onClick={() => setPage(pageNum)}
                            className={`px-2 md:px-3 py-1 rounded-md border text-sm ${
                              page === pageNum
                                ? "bg-[#1B5E20] text-white"
                                : "bg-white text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            {pageNum}
                          </button>
                        )
                      );
                    })}
      
                    {page < totalPages - 2 && (
                      <>
                        {page < totalPages - 3 && (
                          <span className="px-2 py-1">...</span>
                        )}
                        <button
                          onClick={() => setPage(totalPages)}
                          className={`px-2 md:px-3 py-1 rounded-md border text-sm ${
                            page === totalPages
                              ? "bg-[#1B5E20] text-white"
                              : "bg-white text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {totalPages}
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
      
              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="p-2 border rounded-md bg-white hover:bg-gray-100 disabled:opacity-40 transition-colors"
                aria-label="Next page"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
        </div>
    </div>
  )
}

export default ExecutiveManagement