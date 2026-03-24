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

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH USER DATA
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get(`/admin/users/users/${id}`);
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUser();
  }, [id]);

  return (
    <div className="bg-[#EAF3EE] min-h-screen p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* ✅ USER PROFILE CARD */}
        {loading ? (
          <div className="h-32 bg-gray-200 animate-pulse rounded-xl" />
        ) : (
          <UserProfileCard user={user} />
        )}

        <QueryCard />

        <div className="grid md:grid-cols-2 gap-6">
          <QueryDetails />
          <ChatSection />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <QueryHistory />
          <Attachments />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <QuickActions />
          <StatusManagement />
        </div>

      </div>
    </div>
  );
}