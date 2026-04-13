"use client";

import Link from "next/link";
import {
  Search,
  Calendar,
  ChevronDown,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useEffect, useState } from "react";
import { axiosInstance, axiosInstanceLocal } from "@/config/axios";

export default function UserManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // PAGINATION STATE
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  // FETCH USERS (PAGINATED)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        const res = await axiosInstance.get(
          `/admin/users/users?page=${page}&limit=${limit}`
        );
        console.log("USERS API RESPONSE 👉", res.data);

        // ✅ SAFE DATA HANDLING
        setUsers(res.data.users || []);
        setTotalPages(res.data.pagination?.totalPages || 1);
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page]);

  if (loading) {
    return <div className="p-10">Loading users...</div>;
  }

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
    <div className="p-4 md:p-10 min-h-screen">
      {/* FILTER BOX */}
      <div className="bg-[#F6F1E9] p-6 rounded-xl shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center bg-white w-full rounded-lg px-4 py-3 shadow-sm border">
            <Search className="w-5 h-5 mr-3" />
            <input
              className="w-full outline-none text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              placeholder="Search User by name, User Id & email."
            />
          </div>

          <button className="bg-[#0A4D27] text-white px-8 py-3 rounded-lg text-sm shadow-md">
            Search User
          </button>
        </div>

        <div className="flex flex-wrap gap-3 items-center mt-5">
          <button className="bg-white px-4 py-2 rounded-lg shadow-sm border flex items-center gap-2 text-sm">
            Date of Birth <Calendar className="w-4 h-4" />
          </button>

          <button className="bg-white px-4 py-2 rounded-lg shadow-sm border flex items-center gap-2 text-sm">
            Gender <ChevronDown className="w-4 h-4" />
          </button>

          <button className="bg-white px-4 py-2 rounded-lg shadow-sm border flex items-center gap-2 text-sm">
            Birth City <ChevronDown className="w-4 h-4" />
          </button>

          <button className="bg-[#8B4B26] text-white px-6 py-2 rounded-lg flex items-center gap-2 text-sm shadow-md">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      {/* USER LIST */}
      <div className="bg-white rounded-xl mt-8 shadow-sm">
        <h2 className="text-lg border-b border-gray-300 font-semibold p-4 mb-6">
          User Lists
        </h2>

        <div className="hidden md:flex gap-6 p-4">
          {/* LEFT LIST */}
          <div className="bg-[#F6F1E9] rounded-xl p-4 shadow-sm w-[230px]">
            <div className="border-b border-gray-400 p-3 mb-4 font-semibold">
              Users
            </div>

            <div className="space-y-3 max-h-[300px]">
              {users.map((user) => (
                <Link
                  key={user._id}
                  href={`/user-management/${user._id}`}
                >
                  <div className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100">
                    <img
                      src={user.profilePicture || "/avatar-placeholder.png"}
                      className="w-10 h-10 rounded-full"
                      alt="profile"
                    />
                    <div className="text-sm font-medium">
                      {user.firstName} {user.lastName}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT TABLE */}
          <div className="flex-1 mt-5">
            <div className="grid grid-cols-12 border-b border-gray-400 p-3 mb-4 font-semibold text-sm">
              <div className="col-span-3">DOB</div>
              <div className="col-span-2">Gender</div>
              <div className="col-span-2">Birth City</div>
              <div className="col-span-2 text-right">Profession</div>
              <div className="col-span-2 text-right">Action</div>
            </div>

            <div className="space-y-3">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="grid grid-cols-12 items-center bg-[#F6F1E9] p-4 rounded-lg"
                >
                  <div className="col-span-3 text-sm">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </div>

                  <div className="col-span-2 text-sm">{user.gender || "—"}</div>
                  <div className="col-span-2 text-sm">—</div>

                  <div className="col-span-3 text-sm pl-8 font-semibold text-green-700">
                    —
                  </div>

                  <div className="col-span-2 flex justify-end gap-1">
                    <button className="text-xs font-bold border-b text-yellow-700">
                      Hold
                    </button>
                    <button className="text-xs font-bold border-b text-green-400">
                      Active
                    </button>
                    <button className="text-xs font-bold border-b text-gray-800">
                      Block
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* PAGINATION */}
      <div className="mt-6 flex justify-center items-center gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="disabled:opacity-40"
        >
          <ChevronLeft className="text-green-700" />
        </button>

        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .slice(
              Math.max(0, page - 3),
              Math.min(totalPages, page + 2)
            )
            .map((num) => (
              <button
                key={num}
                onClick={() => setPage(num)}
                className={`w-9 h-9 rounded-md border ${
                  num === page
                    ? "bg-[#0A4D27] text-white"
                    : "bg-white"
                }`}
              >
                {num}
              </button>
            ))}
        </div>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="disabled:opacity-40"
        >
          <ChevronRight className="text-green-700" />
        </button>
      </div>
    </div>
  );
}
