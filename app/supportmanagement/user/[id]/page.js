"use client";

import TicketTable from "@/component/support/userdetails/TicketTable";
import UserCard from "@/component/support/userdetails/UserCard";
import UserProfileCard from "@/component/support/userdetails/UserProfileCard";



export default function UserDetailsPage() {
  return (
    <div className="bg-[#F6F1E9] min-h-screen p-4 md:p-6 mt-16">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Profile */}
        <UserProfileCard />

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <UserCard title="Total Queries" value="27" />
          <UserCard title="Open Queries" value="03" />
          <UserCard title="Resolved" value="21" />
          <UserCard title="Pending" value="03" />
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3 justify-between bg-white p-4 rounded-lg shadow">
          <div className="flex gap-2 flex-wrap">
            <button className="px-3 py-1 bg-gray-100 rounded">By Date</button>
            <button className="px-3 py-1 bg-gray-100 rounded">By Status</button>
            <button className="px-3 py-1 bg-gray-100 rounded">By Category</button>
          </div>

          <input
            type="text"
            placeholder="Search ticket..."
            className="border px-3 py-1 rounded w-full md:w-64"
          />
        </div>

        {/* Table */}
        <TicketTable />

      </div>
    </div>
  );
}