"use client";

import { useEffect, useState } from "react";
import { axiosInstance } from "@/config/axios";

import SupportHeader from "./SupportHeader";
import SupportStats from "./SupportStats";
import SupportFilters from "./SupportFilters";
import SupportTable from "./SupportTable";

export default function SupportManagement() {

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTickets = async () => {
    try {

      const res = await axiosInstance.get("/admin/tickets");

      // 🔥 map backend → UI format
      const formatted = res.data.tickets.map((t) => ({
        ticketId: "#" + t._id.slice(-4),
        userId: t.user?._id,
        userName: t.user?.name,
        category: t.category,
        status: t.status,
        createdAt: new Date(t.createdAt).toLocaleDateString(),
      }));

      setTickets(formatted);

    } catch (error) {

      console.error("Failed to fetch tickets", error);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="w-full min-h-screen">

      <SupportHeader />

      <SupportStats />

      <SupportFilters />

      {loading ? (
        <p className="p-6">Loading tickets...</p>
      ) : (
        <SupportTable tickets={tickets} />
      )}

    </div>
  );
}