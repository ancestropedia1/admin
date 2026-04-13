"use client";

import { useEffect, useState } from "react";
import { MapPin, User } from "lucide-react";
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

  if (loading) return <div className="p-10">Loading...</div>;
  if (!user) return <div className="p-10">User not found</div>;

  const tabs = [
    "User Information",
    "Person Information",
    "Parent’s Information",
    "Spouse Information",
    "Children’s Information",
  ];

  return (
    <div className="p-6 w-full">

      {/* HEADER CARD (FIGMA STYLE) */}
      <div className="bg-[#BFE6D8] p-6 rounded-xl shadow-md flex flex-col md:flex-row justify-between items-center">

        <div className="flex gap-4 items-center">
          <img
            src={user.profilePicture || "/avatar-placeholder.png"}
            className="w-24 h-24 rounded-xl object-cover border-2 border-orange-500"
          />

          <div>
            <h1 className="text-2xl font-semibold text-green-900">
              {user.firstName} {user.lastName}
            </h1>

            <p className="text-sm text-gray-700 mt-1">
              ID - {user._id}
            </p>

            <div className="flex gap-4 text-xs text-gray-700 mt-2">
              <span>📅 Born: —</span>
              <span>📍 —</span>
              <span>💼 —</span>
            </div>

            <div className="flex gap-2 mt-3 text-xs">
              <span className="px-3 py-1 bg-green-600 text-white rounded">
                Active
              </span>
              <span className="px-3 py-1 bg-gray-200 rounded">
                Block
              </span>
              <span className="px-3 py-1 bg-gray-200 rounded">
                Hold
              </span>
            </div>
          </div>
        </div>

        <button className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm mt-4 md:mt-0">
          Token Balance: {user.tokens || 0}
        </button>
      </div>

      {/* TABS */}
      <div className="flex gap-6 border-b mt-6 text-sm">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 ${
              activeTab === tab
                ? "border-b-2 border-green-700 text-green-700 font-semibold"
                : "text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* USER INFO SECTION */}
      {activeTab === "User Information" && (
        <div className="bg-[#F6F1E9] rounded-xl p-6 mt-6 shadow-sm">

  <div className="flex justify-between items-center mb-6">
    <h2 className="text-lg font-semibold text-green-800 flex items-center gap-2">
      <User size={18} /> User Information
    </h2>

    <button
      onClick={() => setShowEdit(true)}
      className="border px-4 py-1.5 rounded-md text-sm hover:bg-gray-100"
    >
      ✏️ Edit
    </button>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-sm">

    {/* LEFT */}
    <div className="space-y-4">
      <Field label="First Name" value={user.firstName} />
      <Field label="Last Name" value={user.lastName} />
    </div>

    {/* RIGHT */}
    <div className="space-y-4">
      <Field label="Email" value={user.email} />
      <Field label="Gender" value={user.gender} />
    </div>

  </div>
</div>
      )}

      {/* OTHER TABS */}
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

      {/* MODAL */}
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

/* FIELD COMPONENT */
function Field({ label, value }) {
  return (
    <div>
      <p className="text-gray-500 text-xs">{label}</p>
      <p className="text-gray-900 font-medium">{value || "—"}</p>
    </div>
  );
}