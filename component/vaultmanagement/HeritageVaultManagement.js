"use client";
import PlanCard from "../PlanCards";

import React, { useState } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  ChevronDown,
} from "lucide-react";

export default function HeritageVaultManagement() {
  // ----------------------------
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

  const totalPages = Math.ceil(users.length / rowsPerPage);

  return (
    <div className="min-h-screen bg-[#FEFBF7] p-4 md:p-6 lg:p-10">
      {/* --------------------------- */}
      {/* PAGE HEADING */}
      {/* --------------------------- */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-[#213327]">
          Heritage Vault Management
        </h1>
        <p className="text-gray-600 mt-1 text-sm md:text-base max-w-xl">
          Securely manage storage, user vaults, and heritage content with
          advanced encryption and access controls.
        </p>
      </div>

      {/* --------------------------- */}
      {/* TOP STATUS CARDS */}
      {/* --------------------------- */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-15 mb-8">
        <div className="bg-[#D3E7FF] border border-[#000ACC] p-4 shadow-sm">
          <p className="text-sm font-bold text-[#000ACC]">Storage Capacity</p>
          <p className="text-xs text-[#000ACC] mt-1">Total: 4PB used of 6 PB</p>
        </div>

        <div className="bg-[#FEF2F2] border border-[#D32F2F] p-4 shadow-sm">
          <p className="text-sm font-medium text-[#D32F2F]">Storage Alert</p>
          <p className="text-xs text-[#D32F2F] mt-1">
            12 Users nearing storage limits
          </p>
        </div>

        <div className="bg-[#FFF5D3] border border-[#FFC300] p-4 shadow-sm">
          <p className="text-sm font-medium text-[#FFC300]">Backup Reminder</p>
          <p className="text-xs text-[#FFC300] mt-1">
            10 Users have not backed up their data
          </p>
        </div>

        <div className="bg-[#FEF2F2] border border-[#D32F2F] p-4 shadow-sm">
          <p className="text-sm font-medium text-[#D32F2F]">Access Denied</p>
          <p className="text-xs text-[#D32F2F] mt-1">
            5 Users reported access issues
          </p>
        </div>
      </div>

      {/* --------------------------- */}
      {/* VAULT USAGE ANALYSIS */}
      {/* --------------------------- */}
      <div className="bg-[#E9F6EE] p-6 rounded-xl border-2 border-gray-300 shadow-sm mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base sm:text-sm md:text-xl font-semibold text-[#1B3B2F">
            Vault Usage Analysis
          </h2>

          <div className="flex gap-3 items-center">
  {/* Label */}
  <div className="text-lg font-semibold">Time:</div>

  {/* From */}
  <button className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-md shadow-sm text-sm">
    From <CalendarDays size={16} />
  </button>

  {/* To */}
  <button className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-md shadow-sm text-sm">
    To <CalendarDays size={16} />
  </button>
</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white p-4 border shadow-sm">
            <p className="text-sm font-semibold text-gray-700">Storage Used</p>
            <p className="text-xs text-gray-500 mt-1">2.3 PB of 5 PB</p>
            <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#1D7A48]"
                style={{ width: "73%" }}
              ></div>
            </div>
            <p className="text-[#1D7A48] font-semibold mt-1 text-sm">73%</p>
          </div>

          <div className="bg-white p-4 border shadow-sm">
            <p className="text-sm font-semibold text-gray-700">
              Total Files Created
            </p>
            <p className="text-[#4263EB] text-xl font-bold mt-2">847K</p>
            <p className="text-green-600 text-xs font-medium">+12% this Year</p>
          </div>

          <div className="bg-white p-4 border shadow-sm">
            <p className="text-sm font-semibold text-gray-700">
              Storage Use Type
            </p>
            <ul className="text-xs text-gray-600 mt-2 space-y-1">
              <li>Photo — 60%</li>
              <li>Video — 20%</li>
              <li>Audio — 15%</li>
              <li>Doc — 5%</li>
            </ul>
          </div>

          <div className="bg-white p-4 border shadow-sm">
            <p className="text-sm font-semibold text-gray-700">Plan Sold</p>
            <ul className="text-xs text-gray-600 mt-2 space-y-1">
              <li>Standard — 430K</li>
              <li>Pro — 320K</li>
            </ul>
          </div>

          <div className="bg-white p-4 border shadow-sm">
            <p className="text-sm font-semibold text-gray-700">New Users</p>
            <p className="text-[#E67E22] text-xl font-bold mt-2">4K</p>
            <p className="text-green-600 text-xs font-medium">
              +6% Growth this month
            </p>
          </div>
        </div>
      </div>

      {/* ---------- FILTERS ---------- */}
      <div className="bg-[#D9D9D9] border-2 border-gray-300 p-4 rounded-md shadow mt-8 flex flex-col md:flex-row justify-between  gap-4">
        {/* Date Filter */}
        <div className="flex justify-center gap-2">
          <button className="flex   gap-2 bg-white  px-4 py-2 rounded-md shadow-sm">
            By Date <CalendarDays size={18} className="mt-1" />
          </button>

          {/* Status Filter */}
          <button className="flex  bg-white  px-4 py-2 rounded-md shadow-sm">
            By Status <ChevronDown size={18} className="mt-1" />
          </button>
        </div>

        {/* Search */}
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
      {/* ⭐ DYNAMIC TABLE */}
      {/* --------------------------- */}
      <div className="bg-[#E9F6EE] rounded-xl border-2 border-gray-300 shadow-sm mt-10 overflow-x-auto">

        <h3 className="text-lg font-bold p-3 md:text-xl  text-[#1B3B2F]">
          User Storage Management
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
          <thead className="bg-[#D9D9D9]">
            <tr>
              
              <th className="text-left p-3">User</th>
              <th className="text-left p-3">Plan</th>
              <th className="text-left p-3">Storage Usage</th>
              <th className="text-left p-3">Files</th>
              <th className="text-left p-3">Action</th>
              
              
            </tr>
          </thead>

          <tbody>
            {paginatedUsers.map((user) => {
              const percent = (user.used / user.total) * 100;

              return (
                <tr key={user.id} className="border-t bg-[#E9F6EE]">
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
        <div className="flex justify-end mt-4 gap-2 text-sm items-center border-t p-4">
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
      {/* ---------- TOKEN PLANS ---------- */}

      <div className="mt-12 grid  bg-[#F6F1E9] gap-5 p-5 rounded-md border-2 border-gray-300">
        <h2 className="text-2xl font-bold mb-4">Public Plan Allocation</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <PlanCard
            title="Standard Plan"
            tokens="1200 tokens"
            color="bg-white"
          />

          <PlanCard
            title="Pro Plan"
            tokens="2500 Tokens"
            color="bg-[#FCEAC0]"
          />

          <PlanCard
            title="Free Plan"
            tokens="200 Tokens"
            color="bg-[#D3E4FB]"
          />
        </div>
      </div>

      <div className="mt-12 grid  bg-[#F6F1E9] gap-5 p-5 rounded-md border-2 border-gray-300">
        <h2 className="text-2xl font-bold mb-4">
          Private Storage Plan Allocation
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <PlanCard
            title="Standard Plan"
            tokens="1200 tokens"
            color="bg-white"
          />

          <PlanCard
            title="Pro Plan"
            tokens="2500 Tokens"
            color="bg-[#FCEAC0]"
          />

          <PlanCard
            title="Free Plan"
            tokens="200 Tokens"
            color="bg-[#D3E4FB]"
          />
        </div>
      </div>
    </div>
  );
}

