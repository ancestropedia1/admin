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

  // ✅ ADDED: reusable formatter (NO CHANGE to your logic)
  const formatTickets = (ticketsData) => {
    return ticketsData.map((t) => {
      const fullName = `${t.user?.firstName || ""} ${t.user?.lastName || ""}`.trim();

      return {
        ticketId: "#" + t._id.slice(-4),
        userId: t.user?._id,
        userName: t.name || fullName || "N/A",
        email: t.email || t.user?.email,
        profilePicture: t.user?.profilePicture,
        category: t.category,
        status: t.status,
        createdAt: new Date(t.createdAt).toLocaleDateString(),
      };
    });
  };

  const fetchTickets = async () => {
    try {

      const res = await axiosInstance.get("/admin/tickets");

      // ✅ replaced map with formatter (same logic)
      const formatted = formatTickets(res.data.tickets);

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

      {/* ✅ ONLY CHANGE: pass formatTickets */}
      <SupportFilters 
        setTickets={setTickets} 
        formatTickets={formatTickets} 
      />

      {loading ? (
        <p className="p-6">Loading tickets...</p>
      ) : (
        <SupportTable tickets={tickets} />
      )}

    </div>
  );
}