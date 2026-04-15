"use client";

import Link from "next/link";
import {
  Search,
  ChevronDown,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useEffect, useState } from "react";
import { axiosInstance } from "@/config/axios";

export default function UserManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ FILTER STATES
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");
  const [birthCity, setBirthCity] = useState("");

  // PAGINATION STATE
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  // ✅ FETCH USERS FUNCTION
  const fetchUsers = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams({
        page,
        limit,
        search: searchQuery,
        gender,
        date,
        birthCity,
      });

      const res = await axiosInstance.get(
        `/admin/users/users?${params.toString()}`
      );

      setUsers(res.data.users || []);
      setTotalPages(res.data.pagination?.totalPages || 1);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  // INITIAL LOAD + PAGE CHANGE
  useEffect(() => {
    fetchUsers();
  }, [page]);

  if (loading) {
    return <div className="p-10">Loading users...</div>;
  }

  return (
    <div className="p-4 md:p-10 min-h-screen bg-[#F9FAFB]">

      {/* FILTER */}
      <div className="bg-[#F6F1E9] p-5 rounded-xl shadow-sm">

        <div className="flex gap-3 flex-col sm:flex-row">
          <div className="flex items-center bg-white w-full rounded-lg px-4 py-2 border">
            <Search className="w-4 h-4 mr-2 text-gray-500" />

            <input
              className="w-full outline-none text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search User by name, user id & email"
            />
          </div>

          {/* SEARCH BUTTON */}
          <button
            onClick={() => {
              setPage(1);
              fetchUsers();
            }}
            className="bg-[#0A4D27] text-white px-6 py-2 rounded-lg text-sm"
          >
            Search User
          </button>
        </div>

        {/* FILTERS */}
        <div className="flex gap-3 mt-4 flex-wrap">

          {/* DATE */}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-white px-3 py-1.5 rounded-lg border text-sm"
          />

          {/* GENDER */}
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="bg-white px-3 py-1.5 rounded-lg border text-sm"
          >
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="others">Others</option>
          </select>

          {/* BIRTH CITY */}
          <input
            type="text"
            value={birthCity}
            onChange={(e) => setBirthCity(e.target.value)}
            placeholder="Birth City"
            className="bg-white px-3 py-1.5 rounded-lg border text-sm"
          />

          {/* FILTER BUTTON */}
          <button
            onClick={() => {
              setPage(1);
              fetchUsers();
            }}
            className="bg-[#8B4B26] text-white px-4 py-1.5 rounded-lg flex items-center gap-1 text-sm"
          >
            <Filter size={14} /> Filter
          </button>

          {/* RESET */}
          <button
            onClick={() => {
              setSearchQuery("");
              setGender("");
              setDate("");
              setBirthCity("");
              setPage(1);

              setTimeout(() => {
                fetchUsers();
              }, 0);
            }}
            className="bg-gray-200 px-4 py-1.5 rounded-lg text-sm"
          >
            Reset
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div className="bg-white rounded-xl mt-8 shadow-sm p-4">
        <h2 className="text-lg font-semibold border-b pb-3 mb-4">
          User Lists
        </h2>

        <div className="flex gap-6 flex-col lg:flex-row">

          {/* LEFT */}
          <div className="bg-[#F6F1E9] rounded-xl p-4 shadow-sm w-full lg:w-[250px]">
            <div className="border-b border-gray-300 pb-3 mb-4 font-semibold text-gray-700">
              Users
            </div>

            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
              {users.map((user) => (
                <Link
                  key={user._id}
                  href={`/user-management/${user._id}`}
                >
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white cursor-pointer transition">
                    <img
                      src={user.profilePicture || "/avatar-placeholder.png"}
                      className="w-9 h-9 rounded-full object-cover"
                      alt="profile"
                    />

                    <div className="text-sm font-medium text-gray-800">
                      {user.firstName} {user.lastName}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT TABLE */}
          <div className="flex-1 overflow-x-auto">

            <div className="min-w-[700px]">

              {/* HEADER */}
              <div className="grid grid-cols-12 text-sm font-semibold text-gray-600 border-b pb-2 px-2">
                <div className="col-span-3">DOB</div>
                <div className="col-span-2">Gender</div>
                <div className="col-span-2">Birth City</div>
                <div className="col-span-3 text-right">Profession</div>
                <div className="col-span-2 text-right">Action</div>
              </div>

              {/* ROWS */}
              <div className="space-y-3 mt-4">
                {users.map((user, i) => {
                  const bg =
                    i % 3 === 0
                      ? "bg-green-50"
                      : i % 3 === 1
                      ? "bg-red-50"
                      : "bg-yellow-50";

                  return (
                    <div
                      key={user._id}
                      className={`grid grid-cols-12 items-center p-3 rounded-lg ${bg}`}
                    >
                      <div className="col-span-3 text-sm">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </div>

                      <div className="col-span-2 text-sm">
                        {user.gender || "—"}
                      </div>

                      <div className="col-span-2 text-sm">
                        {user.birthCity || "—"}
                      </div>

                      <div className="col-span-3 text-sm text-right font-semibold text-green-700">
                        {user.profession || "—"}
                      </div>

                      <div className="col-span-2 flex justify-end gap-2 text-xs">
                        <span className="px-2 py-1 bg-gray-200 rounded">
                          Hold
                        </span>

                        <span className="px-2 py-1 bg-green-200 text-green-700 rounded">
                          Active
                        </span>

                        <span className="px-2 py-1 bg-gray-300 rounded">
                          Block
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* PAGINATION */}
      <div className="mt-8 flex justify-center items-center gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          <ChevronLeft />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .slice(Math.max(0, page - 2), Math.min(totalPages, page + 2))
          .map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={`w-8 h-8 rounded ${
                num === page
                  ? "bg-green-800 text-white"
                  : "bg-white border"
              }`}
            >
              {num}
            </button>
          ))}

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}