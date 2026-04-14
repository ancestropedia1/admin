"use client";

import { useEffect, useState } from "react";
import { User } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { axiosInstance } from "@/config/axios";

import EditUserModal from "./edituserdetails/EditUserForm";
import PersonInfo from "../persondetails/PersonInfo";
import ParentsInfo from "../persondetails/ParentsInfo";
import SpouseInfo from "../persondetails/SpouseInfo";
import ChildrenInfo from "../persondetails/ChildrenInfo";

export default function UserInfoForm() {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("User Information");
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get(
          `/admin/users/users/${id}`
        );
        setUser(res.data.user);
      } catch (error) {
        console.error("Failed to fetch user", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <div className="p-6 md:p-10">Loading...</div>;
  if (!user) return <div className="p-6 md:p-10">User not found</div>;

  const tabs = [
    "User Information",
    "Person Information",
    "Parent’s Information",
    "Spouse Information",
    "Children’s Information",
  ];

  return (
    <div className="p-4 md:p-6 w-full">

      {/* ✅ HEADER CARD */}
      <div className="bg-[#BFE6D8] p-4 md:p-6 rounded-xl shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

        {/* LEFT */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full">

          <img
            src={user.profilePicture || "/avatar-placeholder.png"}
            className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover border-2 border-orange-500"
          />

          <div className="w-full">
            <h1 className="text-lg md:text-2xl font-semibold text-green-900">
              {user.firstName} {user.lastName}
            </h1>

            <p className="text-xs md:text-sm text-gray-700 mt-1">
              ID - {user._id}
            </p>

            {/* INFO */}
            <div className="flex flex-wrap gap-3 text-[11px] md:text-xs text-gray-700 mt-2">
              <span>📅 Born: —</span>
              <span>📍 —</span>
              <span>💼 —</span>
            </div>

            {/* STATUS */}
            <div className="flex flex-wrap gap-2 mt-3 text-[11px] md:text-xs">
              <span className="px-2 md:px-3 py-1 bg-green-600 text-white rounded">
                Active
              </span>
              <span className="px-2 md:px-3 py-1 bg-gray-200 rounded">
                Block
              </span>
              <span className="px-2 md:px-3 py-1 bg-gray-200 rounded">
                Hold
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT BUTTON */}
        <button className="bg-orange-600 text-white px-4 py-2 rounded-lg text-xs md:text-sm w-full md:w-auto">
          Token Balance: {user.tokens || 0}
        </button>
      </div>

      {/* ✅ TABS (SCROLLABLE) */}
      <div className="flex gap-6 border-b mt-6 text-xs md:text-sm overflow-x-auto whitespace-nowrap">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 flex-shrink-0 ${
              activeTab === tab
                ? "border-b-2 border-green-700 text-green-700 font-semibold"
                : "text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ✅ USER INFO */}
      {activeTab === "User Information" && (
        <div className="bg-[#F6F1E9] rounded-xl p-4 md:p-6 mt-6 shadow-sm">

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
            <h2 className="text-base md:text-lg font-semibold text-green-800 flex items-center gap-2">
              <User size={16} /> User Information
            </h2>

            <button
              onClick={() => setShowEdit(true)}
              className="border px-3 md:px-4 py-1.5 rounded-md text-xs md:text-sm hover:bg-gray-100"
            >
              ✏️ Edit
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 text-sm">

            <div className="space-y-3 md:space-y-4">
              <Field label="First Name" value={user.firstName} />
              <Field label="Last Name" value={user.lastName} />
            </div>

            <div className="space-y-3 md:space-y-4">
              <Field label="Email" value={user.email} />
              <Field label="Gender" value={user.gender} />
            </div>

          </div>
        </div>
      )}

      {/* ✅ OTHER TABS */}
      {activeTab === "Person Information" && (
        <PersonInfo userId={id} />
      )}

      {activeTab === "Parent’s Information" && (
        <ParentsInfo userId={id} />
      )}

      {activeTab === "Spouse Information" && (
        <SpouseInfo userId={id} />
      )}

      {activeTab === "Children’s Information" && (
        <ChildrenInfo userId={id} />
      )}

      {/* ✅ MODAL */}
      {showEdit && (
        <EditUserModal
          user={user}
          onClose={() => setShowEdit(false)}
          onUpdate={(updatedUser) => setUser(updatedUser)}
        />
      )}
    </div>
  );
}

/* FIELD */
function Field({ label, value }) {
  return (
    <div>
      <p className="text-gray-500 text-[11px] md:text-xs">{label}</p>
      <p className="text-gray-900 font-medium text-sm">
        {value || "—"}
      </p>
    </div>
  );
}