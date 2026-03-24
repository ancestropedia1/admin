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

  const fetchData = async () => {
    try {
      const [userRes, ticketRes] = await Promise.all([
        axiosInstance.get(`/admin/users/users/${id}`),
        axiosInstance.get(`/admin/tickets/user/${id}`)
      ]);

      console.log("USER:", userRes.data);
      console.log("TICKETS:", ticketRes.data);

      // ✅ SAFE USER SET
      const userData =
        userRes.data.user ||
        userRes.data.data ||
        userRes.data;

      setUser(userData);

      // ✅ SAFE TICKET SET
      const tickets = ticketRes.data.tickets;

      if (tickets?.length > 0) {
        setTicket(tickets[0]);
      } else {
        setTicket(null);
      }

    } catch (error) {
      console.error(
        "Error fetching support details:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  // 🔄 LOADING
  if (loading) return <p className="p-6">Loading...</p>;

  // ❌ ONLY CHECK USER (IMPORTANT FIX)
  if (!user) return <p className="p-6">User not found</p>;

  return (
    <div className="bg-[#EAF3EE] min-h-screen p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* ✅ USER */}
        <UserProfileCard user={user} />

        {/* ✅ ONLY RENDER IF TICKET EXISTS */}
        {ticket ? (
          <>
            <QueryCard ticket={ticket} />

            <div className="grid md:grid-cols-2 gap-6">
              <QueryDetails ticket={ticket} />
              <ChatSection messages={ticket?.messages || []} />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <QueryHistory history={ticket?.history || []} />
              <Attachments files={ticket?.attachments || []} />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <QuickActions ticket={ticket} />
              <StatusManagement ticket={ticket} />
            </div>
          </>
        ) : (
          <div className="bg-white p-6 rounded-xl shadow text-center">
            No tickets found for this user
          </div>
        )}

      </div>
    </div>
  );
}