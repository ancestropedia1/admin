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

  // 🔥 FETCH USER DATA (SAME AS WORKING PAGE)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get(`/admin/users/users/${id}`);

        console.log("USER:", res.data);

        // ✅ SIMPLE + CORRECT
        setUser(res.data.user);

      } catch (err) {
        console.error(
          "Error fetching user:",
          err.response?.data || err.message
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUser();
  }, [id]);

  // 🔄 LOADING
  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  // ❌ USER NOT FOUND
  if (!user) {
    return <p className="p-6">User not found</p>;
  }

  return (
    <div className="bg-[#EAF3EE] min-h-screen p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* ✅ USER PROFILE */}
        <UserProfileCard user={user} />

        {/* 🔥 KEEP THESE STATIC FOR NOW */}
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