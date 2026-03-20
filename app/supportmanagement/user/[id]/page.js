"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { axiosInstance } from "@/config/axios";

import TicketTable from "@/component/support/userdetails/TicketTable";
import UserCard from "@/component/support/userdetails/UserCard";
import UserProfileCard from "@/component/support/userdetails/UserProfileCard";

export default function UserDetailsPage() {

  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH USER + TICKETS
  const fetchData = async () => {
    try {

      const [userRes, ticketRes] = await Promise.all([
        axiosInstance.get(`/admin/users/users/${id}`),
        axiosInstance.get(`/admin/tickets/user/${id}`)
      ]);

      console.log("USER:", userRes.data);   // 🔥 debug
    console.log("TICKETS:", ticketRes.data);

      setUser(userRes.data.user);
      setTickets(ticketRes.data.tickets);

    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  // 🔄 LOADING
  if (loading) return <p className="p-6">Loading...</p>;

  if (!user) return <p className="p-6">User not found</p>;

  // 📊 STATS
  const total = tickets.length;
  const open = tickets.filter(t => t.status === "Open").length;
  const resolved = tickets.filter(t => t.status === "Resolved").length;
  const pending = tickets.filter(t => t.status === "In Progress").length;

  return (
    <div className="bg-[#F6F1E9] min-h-screen p-4 md:p-6 mt-16">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* ✅ PROFILE */}
        <UserProfileCard user={user} />

        {/* ✅ STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <UserCard title="Total Queries" value={total} />
          <UserCard title="Open Queries" value={open} />
          <UserCard title="Resolved" value={resolved} />
          <UserCard title="Pending" value={pending} />
        </div>

        {/* ✅ FILTERS */}
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

        {/* ✅ TABLE */}
        <TicketTable tickets={tickets} />

      </div>
    </div>
  );
}