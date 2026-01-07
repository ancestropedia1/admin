// components/ProfileButton.jsx
"use client";

import { useRouter } from "next/navigation";

export default function ProfileButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/admin/profile")}
      className="flex items-center gap-2 sm:gap-3"
    >
     
        <img
        src="https://i.pravatar.cc/40"
        alt="Profile"
        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full cursor-pointer border border-gray-300"
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
