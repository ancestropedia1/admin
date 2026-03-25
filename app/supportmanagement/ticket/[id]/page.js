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

export default function UserDetailPage() {
  const { id } = useParams();

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH TICKET DATA (NOT USER)
  const fetchTicket = async () => {
    try {
      const res = await axiosInstance.get(`/admin/tickets/${id}`);
      setTicket(res.data);
    } catch (err) {
      console.error("Error fetching ticket:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchTicket();
  }, [id]);

  return (
    <div className="bg-[#EAF3EE] min-h-screen p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* ✅ PROFILE (from ticket.user) */}
        {loading ? (
          <div className="h-32 bg-gray-200 animate-pulse rounded-xl" />
        ) : (
          <UserProfileCard user={ticket?.user} />
        )}

        <QueryCard ticket={ticket} />

        <div className="grid md:grid-cols-2 gap-6">
          <QueryDetails ticket={ticket} />
          <ChatSection ticket={ticket} />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <QueryHistory ticket={ticket} />
          <Attachments ticket={ticket} />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <QuickActions ticket={ticket} />
          <StatusManagement ticket={ticket} refresh={fetchTicket} />
        </div>

      </div>
    </div>
  );
}