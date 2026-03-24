"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/config/axios";

import UserProfileCard from "@/component/support/usersupportdetails/UserProfileCard";

export default function UserDetailPage() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH USER ONLY (LIKE YOUR WORKING PAGE)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get(`/admin/users/users/${id}`);

        console.log("USER:", res.data);

        // ✅ SAME AS WORKING PAGE
       setUser(userRes.data.user);

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
  if (loading) return <p className="p-6">Loading...</p>;

  // ❌ USER NOT FOUND
  if (!user) return <p className="p-6">User not found</p>;

  return (
    <div className="bg-[#EAF3EE] min-h-screen p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* ✅ ONLY THIS FOR NOW */}
        <UserProfileCard user={user} />

      </div>
    </div>
  );
}