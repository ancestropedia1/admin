"use client";

import React, { useEffect, useState } from "react";
import CreateExecutive from "./CreateExecutive";
import { axiosInstance, axiosInstanceLocal } from "@/config/axios";
import { useRouter } from "next/navigation";
import { Lato, Playfair_Display } from "next/font/google";
import {
  Users,
  CalendarDays,
  ChevronDown,
  Search,
  CheckCircle,
  XCircle,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

/* ---------------- FONTS ---------------- */
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const ExecutiveManagement = () => {
  const router = useRouter();

  /* ---------------- MODAL ---------------- */
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  /* ---------------- DATA ---------------- */
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- STATS ---------------- */
  const [stats, setStats] = useState({
    totalExecutives: 0,
    activeExecutives: 0,
    disabledExecutives: 0,
    performancePercent: 0,
  });

  /* ---------------- PAGINATION ---------------- */
  const [page, setPage] = useState(1);
  const rowsPerPage = 4;

  const [pagination, setPagination] = useState({
    totalExecutives: 0,
    totalPages: 1,
    currentPage: 1,
  });

  /* ---------------- FETCH EXECUTIVES (PAGINATED) ---------------- */
  const fetchExecutives = async (pageNumber = 1) => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/admin/executive", {
        params: {
          page: pageNumber,
          limit: rowsPerPage,
        },
      });

      setUsers(res.data.data || []);
      setPagination(res.data.pagination);
      setPage(pageNumber);
    } catch (error) {
      console.error("Failed to fetch executives", error);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- FETCH STATS ---------------- */
  const fetchExecutiveStats = async () => {
    try {
      const res = await axiosInstanceLocal.get("/admin/executive/stats");
      setStats(res.data.data);
    } catch (error) {
      console.error("Failed to fetch stats", error);
    }
  };

  /* ---------------- INITIAL LOAD ---------------- */
  useEffect(() => {
    fetchExecutives(1);
    fetchExecutiveStats();
  }, []);


  const filteredUsers = users.filter((user) => {
  if (!searchQuery) return true;

  const q = searchQuery.toLowerCase();

  return (
    user.fullName?.toLowerCase().includes(q) ||
    user.email?.toLowerCase().includes(q) ||
    user.role?.toLowerCase().includes(q) ||
    user.permissions?.join(" ").toLowerCase().includes(q) ||
    user._id?.toLowerCase().includes(q) ||
    (q === "active" && user.isActive) ||
    (q === "disabled" && !user.isActive)
  );
});


  return (
    <div className="w-full min-h-screen">
      {/* ---------------- HEADER ---------------- */}
      <div className="bg-[#F6F1E9] border border-gray-300 p-8 mt-10 rounded-xl shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <h1 className={`${playfair.className} text-4xl font-extrabold`}>
              Executive Account Management
            </h1>
            <p className={`${lato.className} text-gray-600 mt-2`}>
              Manage all administrative users and assign appropriate roles.
            </p>
          </div>

          <button
            onClick={() => setIsCreateOpen(true)}
            className="bg-[#265A46] text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
          >
            + Create Executive Account
          </button>
        </div>
      </div>

      {/* ---------------- STATS ---------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <StatCard
          icon={<Users className="text-yellow-600" />}
          bg="bg-yellow-100"
          value={stats.totalExecutives}
          label="Total Executives"
        />
        <StatCard
          icon={<CheckCircle className="text-green-600" />}
          bg="bg-green-100"
          value={stats.activeExecutives}
          label="Active Executives"
        />
        <StatCard
          icon={<XCircle className="text-orange-600" />}
          bg="bg-orange-100"
          value={stats.disabledExecutives}
          label="Disabled Executives"
        />
        <StatCard
          icon={<ChevronRight className="text-purple-600" />}
          bg="bg-purple-100"
          value={`↑ ${stats.performancePercent}%`}
          label="Executive Performance"
        />
      </div>

      {/* ---------------- FILTER BAR ---------------- */}
      <div className="bg-[#F6F1E9] border border-gray-300 p-4 rounded-md shadow mt-6 flex flex-col md:flex-row justify-between gap-4">
        <div className="flex gap-2">
          <button className="flex gap-2 bg-white px-4 py-2 rounded-md shadow-sm">
            By Date <CalendarDays size={18} />
          </button>
          <button className="flex gap-2 bg-white px-4 py-2 rounded-md shadow-sm">
            By Status <ChevronDown size={18} />
          </button>
          <button className="flex gap-2 bg-white px-4 py-2 rounded-md shadow-sm">
            By Category <ChevronDown size={18} />
          </button>
        </div>

        <div className="flex bg-white rounded-md px-3 py-2 w-full md:w-1/3 shadow-sm">
          <Search className="text-gray-500" />
          <input
            type="text"
            placeholder="Search executive..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full ml-2 outline-none"
          />
        </div>
      </div>

      {/* ---------------- TABLE ---------------- */}

      {/* ---------------- TABLE ---------------- */}
      <div className="bg-white rounded-lg mt-10 shadow-lg border-2 border-gray-200">
        <div className="px-6 py-4 rounded-lg  bg-[#F6F1E9]">
          <h2 className={`${playfair.className} text-xl font-semibold`}>
            Executive List
          </h2>
        </div>

        {loading && (
          <p className="p-6 text-center text-gray-500">Loading executives...</p>
        )}

        {!loading && users.length === 0 && (
          <p className="p-6 text-center text-gray-500">No executives found</p>
        )}

        {!loading && users.length > 0 && (
          <>
            {/* DESKTOP TABLE */}
            <div className="hidden md:block">
              <table className="w-full border-t-2">
                <thead className="bg-[#F6F1E9]">
                  <tr>
                    <th className="p-4 text-left">Executive</th>
                    <th className="p-4 text-left">Assignment</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Created</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user._id} className="border-b">
                      <td className="p-4 flex gap-3 items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold">
                          {user.fullName?.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{user.fullName}</p>
                          <p className="text-xs text-gray-500">ID-{user._id}</p>
                        </div>
                      </td>

                      <td className="p-4 text-sm">
                        {user.permissions?.join(", ") || "—"}
                      </td>

                      <td className="p-4">
                        {user.isActive ? (
                          <span className="text-green-600">Active</span>
                        ) : (
                          <span className="text-red-500">Disabled</span>
                        )}
                      </td>

                      <td className="p-4 text-sm">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>

                      <td className="p-4">
                        <div className="flex gap-2">
                          <button className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded">
                            {" "}
                            Assign{" "}
                          </button>
                          <button
                            onClick={() =>
                              router.push(`/executive-management/${user._id}`)
                            }
                            className="px-3 py-1 text-xs bg-indigo-100 text-indigo-700 rounded"
                          >
                            View
                          </button>

                          <button className="px-3 py-1 text-xs bg-red-100 text-red-600 rounded">
                            Disable
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* MOBILE CARDS */}
            <div className="md:hidden p-4 space-y-4">
              {users.map((user) => (
                <div key={user._id} className="border rounded-xl p-4 shadow-sm">
                  <p className="font-semibold">{user.fullName}</p>
                  <p className="text-xs text-gray-500 mb-2">ID-{user._id}</p>
                  <p className="text-sm">
                    Status: {user.isActive ? "Active" : "Disabled"}
                  </p>
                  <button
                    onClick={() =>
                      router.push(`/executive-management/${user._id}`)
                    }
                    className="mt-3 w-full bg-indigo-100 text-indigo-700 py-2 rounded"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>

            {/* ---------------- PAGINATION ---------------- */}
            <div className="flex justify-between items-center p-4">
              <p className="text-xs text-gray-500">
                Showing {(pagination.currentPage - 1) * rowsPerPage + 1} to{" "}
                {Math.min(
                  pagination.currentPage * rowsPerPage,
                  pagination.totalExecutives
                )}{" "}
                of {pagination.totalExecutives} executives
              </p>

              <div className="flex gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => fetchExecutives(page - 1)}
                  className="p-1 border rounded disabled:opacity-40"
                >
                  <ChevronLeft />
                </button>

                <span className="px-3 py-1 bg-[#265A46] text-white rounded">
                  {page}
                </span>

                <button
                  disabled={page === pagination.totalPages}
                  onClick={() => fetchExecutives(page + 1)}
                  className="p-1 border rounded disabled:opacity-40"
                >
                  <ChevronRight />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ---------------- CREATE MODAL ---------------- */}
      {isCreateOpen && (
        <CreateExecutive onClose={() => setIsCreateOpen(false)} />
      )}
    </div>
  );
};

/* ---------------- STAT CARD ---------------- */
const StatCard = ({ icon, bg, value, label }) => (
  <div className="bg-white border rounded-xl p-5 flex items-center gap-4 shadow-sm">
    <div className={`${bg} p-3 rounded-lg`}>{icon}</div>
    <div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  </div>
);

export default ExecutiveManagement;
