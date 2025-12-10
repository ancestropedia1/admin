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


    // ⭐ DYNAMIC USER TABLE DATA
      // ----------------------------
      const [users, setUsers] = useState([
        {
          id: "813764",
          name: "Gaurav Singh",
          plan: "Standard",
          used: 7,
          total: 10,
          files: 400,
          avatar: "/avatar-placeholder.jpg",
        },
        {
          id: "813765",
          name: "Aarav Sharma",
          plan: "Pro",
          used: 6,
          total: 10,
          files: 600,
          avatar: "/avatar-placeholder.jpg",
        },
        {
          id: "813766",
          name: "Kunal Verma",
          plan: "Standard",
          used: 8,
          total: 10,
          files: 800,
          avatar: "/avatar-placeholder.jpg",
        },
        {
          id: "813767",
          name: "Rahul Singh",
          plan: "Pro",
          used: 9,
          total: 10,
          files: 1000,
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
    
      const totalPages = Math.ceil(users.length / rowsPerPage)

  return (
    <div className='w-full min-h-screen'>
        {/* ---------------------------------- HEADER ---------------------------------- */}
        <div className="bg-[#F6F1E9] border border-gray-400 p-8 mt-10 rounded-xl shadow-sm w-full">
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
      <div className="bg-white rounded-xl border-2 border-gray-300 shadow-sm mt-10 overflow-x-auto">
        <div className="bg-[#F6F1E9]">

          <h3 className="text-lg font-bold Created p-3 md:text-xl  text-[#1B3B2F]">
                Executive List
              </h3>
        </div>
              
      
              <div className="overflow-x-auto">
                <table className="w-full font-light text-left">
                <thead className="bg-[#F6F1E9] border-t-2">
                  <tr>
                    
                    <th className="text-left text-gray-70 p-3">Executive</th>
                    <th className="text-left text-gray-70  p-3">Assignment</th>
                    <th className="text-left text-gray-70  p-3">Status</th>
                    <th className="text-left text-gray-70 p-3">Created</th>
                    <th className="text-left text-gray-70 p-3">Action</th>
                    
                    
                  </tr>
                </thead>
      
                <tbody>
                  {paginatedUsers.map((user) => {
                    const percent = (user.used / user.total) * 100;
      
                    return (
                      <tr key={user.id} className="border-b bg-white">
                        <td className="p-3 flex items-center gap-3">
                          <img
                            src={user.avatar}
                            className="w-10 h-10 rounded-full border"
                          />
                          <div>
                            <p className="font-medium text-gray-700">{user.name}</p>
                            <p className="text-xs text-gray-500">ID-{user.id}</p>
                          </div>
                        </td>
      
                        <td className="p-3">
                          <span
                            className={`px-3 py-1 rounded-md text-xs font-medium 
                              ${
                                user.plan === "Standard"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-blue-100 text-blue-700"
                              }`}
                          >
                            {user.plan}
                          </span>
                        </td>
      
                        <td className="p-3">
                          <div className="text-xs text-gray-600 mb-1">
                            {user.used} GB of {user.total} GB
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-600"
                              style={{ width: `${percent}%` }}
                            ></div>
                          </div>
                        </td>
      
                        <td className="p-3 text-gray-700">{user.files}</td>
      
                        <td className="p-3">
                          <button className="px-4 py-1 bg-[#E6ECFF] text-[#4A63C0] rounded-md text-xs font-medium hover:bg-[#dce3ff]">
                            Manage
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
      
              </div>
              
              {/* --------------------------- */}
              {/* PAGINATION */}
              {/* --------------------------- */}
              <div className="flex justify-end mt-4 gap-2 text-sm items-center p-4">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="p-2 border rounded-md bg-white hover:bg-gray-100 disabled:opacity-40"
                >
                  <ChevronLeft size={16} />
                </button>
      
                <span className="px-3 py-1 bg-[#1D7A48] text-white rounded-md">
                  {page}
                </span>
      
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
  )
}

export default ExecutiveManagement