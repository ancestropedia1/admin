"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/config/axios";

import UserProfileCard from "@/component/support/usersupportdetails/UserProfileCard";
import QueryCard from "@/component/support/usersupportdetails/QueryCard";
import QueryDetails from "@/component/support/usersupportdetails/QueryDetails";
import ChatSection from "@/component/support/usersupportdetails/ChatSection";
import QueryHistory from "@/component/support/usersupportdetails/QueryHistory";
import Attachments from "@/component/support/usersupportdetails/Attachments";
import QuickActions from "@/component/support/usersupportdetails/QuickActions";
import StatusManagement from "@/component/support/usersupportdetails/StatusManagement";

export default function UserSupportDetailPage() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH DATA (same style as your previous page)
  const fetchData = async () => {
    try {
      const [userRes, ticketRes] = await Promise.all([
        axiosInstance.get(`/admin/users/users/${id}`),
        axiosInstance.get(`/admin/tickets/${id}`) // 👈 single ticket
      ]);

      console.log("USER:", userRes.data);
      console.log("TICKET:", ticketRes.data);

      setUser(userRes.data.user);
      setTicket(ticketRes.data.ticket);

    } catch (error) {
      console.error("Error fetching support details", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  // 🔄 LOADING
  if (loading) return <p className="p-6">Loading...</p>;

  if (!user || !ticket) return <p className="p-6">Data not found</p>;

  return (
    <div className="bg-[#EAF3EE] min-h-screen p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* ✅ USER */}
        <UserProfileCard user={user} />

        {/* ✅ QUERY CARD */}
        <QueryCard ticket={ticket} />

        <div className="grid md:grid-cols-2 gap-6">
          <QueryDetails ticket={ticket} />
          <ChatSection messages={ticket.messages} />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <QueryHistory history={ticket.history} />
          <Attachments files={ticket.attachments} />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <QuickActions ticket={ticket} />
          <StatusManagement ticket={ticket} />
        </div>

      </div>
    </div>
  );
}