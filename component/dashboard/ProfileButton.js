"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/config/axios"; // ✅ MISSING IMPORT

export default function ProfileButton() {
  const [profileImage, setProfileImage] = useState("");
  const router = useRouter();

  const fetchProfile = async () => {
    try {
      const res = await axiosInstance.get(
        "/admin/profile/myprofile",
        { withCredentials: true }
      );

      setProfileImage(res.data.data?.profileImage || "");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProfile();

    // ✅ This makes it refresh when page becomes active again
    window.addEventListener("focus", fetchProfile);

    return () => {
      window.removeEventListener("focus", fetchProfile);
    };
  }, []);

  return (
    <button
      onClick={() => router.push("/admin/profile")}
      className="flex items-center gap-2 sm:gap-3"
    >
      <img
        src={
          profileImage
            ? profileImage
            : "https://i.pravatar.cc/40"
        }
        alt="Profile"
        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full cursor-pointer border border-gray-300 object-cover"
      />

      <div className="hidden sm:block text-left">
        <div className="text-sm font-medium text-gray-800">
          Divyanshu
        </div>
        <div className="text-xs text-gray-500">
          Admin
        </div>
      </div>
    </button>
  );
}