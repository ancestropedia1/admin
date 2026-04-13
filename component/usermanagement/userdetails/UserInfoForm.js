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
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [activeFirstTab, setActiveFirstTab] = useState("User Management");
  const [activeTab, setActiveTab] = useState("User Information");

  const [showEdit, setShowEdit] = useState(false);

  // ✅ FETCH USER
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

  if (loading) {
    return <div className="p-10">Loading user information...</div>;
  }

  if (!user) {
    return <div className="p-10">User not found</div>;
  }

  const firsttab = [
    "User Management",
    "Vault Management",
    "Orders",
    "DNA Report",
    "Token Request",
    "Support Queries",
  ];

  const tabs = [
    "User Information",
    "Person Information",
    "Parent’s Information",
    "Spouse Information",
    "Children’s Information",
    "DNA Report",
    "Account History",
  ];

  return (
    <div className="p-6 w-full">
      {/* BREADCRUMB */}
      <p className="text-sm text-gray-600 mb-4">
        User Management /{" "}
        <span className="text-green-700">
          {user.firstName} {user.lastName}
        </span>
      </p>

      {/* TOP TABS */}
      <div className="flex bg-[#F6F1E9] overflow-x-auto gap-6 border-b py-4 mt-9 text-sm">
        {firsttab.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFirstTab(tab)}
            className={`pb-2 whitespace-nowrap transition-all ${
              activeFirstTab === tab
                ? "text-green-700 border-b-2 border-green-700 font-semibold"
                : "text-gray-600 hover:text-green-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* PROFILE HEADER */}
      <div className="bg-green-100 p-6 rounded-xl shadow-sm mt-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex gap-4">
            <img
              src={user.profilePicture || "/avatar-placeholder.png"}
              alt="profile"
              className="w-24 h-24 rounded-xl object-cover"
            />

            <div>
              <h1 className="text-2xl font-semibold">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-gray-700">ID - {user._id}</p>

              <div className="flex flex-wrap gap-4 text-sm text-gray-700 mt-2">
                <span>
                  Joined:{" "}
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>

                <span className="flex items-center gap-1">
                  <MapPin size={16} /> —
                </span>

                <span className="flex items-center gap-1">
                  <User size={16} /> {user.gender || "—"}
                </span>
              </div>

              <div className="flex gap-2 mt-3 text-xs">
                <span className="px-3 py-1 bg-green-600 text-white rounded">
                  {user.verified ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          </div>

          <button className="mt-4 md:mt-0 bg-orange-600 text-white px-4 py-2 rounded-lg">
            Token Balance: {user.tokens || 0}
          </button>
        </div>
      </div>

      {/* SECONDARY TABS */}
      <div className="flex overflow-x-auto gap-6 border-b py-4 mt-4 text-sm">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 whitespace-nowrap transition-all ${
              activeTab === tab
                ? "text-green-700 border-b-2 border-green-700 font-semibold"
                : "text-gray-600 hover:text-green-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      <div className="bg-white p-6 rounded-xl shadow-sm mt-4 relative">
        <button
          onClick={() => setShowEdit(true)}
          className="absolute top-4 right-4 border px-4 py-1.5 rounded-md text-sm font-medium hover:bg-gray-100 transition"
        >
          ✏️ Edit
        </button>

        {activeTab === "User Information" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-4">
            <div className="space-y-2">
              <Info label="First Name" value={user.firstName} />
              <Info label="Last Name" value={user.lastName} />
              <Info label="Email" value={user.email} />
              <Info label="Gender" value={user.gender || "—"} />
            </div>

            <div className="space-y-2">
              <Info
                label="Joined"
                value={new Date(user.createdAt).toLocaleDateString()}
              />
              <Info
                label="Verified"
                value={user.verified ? "Yes" : "No"}
              />
              <Info label="Tokens" value={user.tokens || 0} />
            </div>
          </div>

        ) : activeTab === "Person Information" ? (
          <PersonInfo userId={id} />

        ) : activeTab === "Parent’s Information" ? (
          <ParentsInfo userId={id} />

        ) : activeTab === "Spouse Information" ? (
          <SpouseInfo userId={id} />

        ) : activeTab === "Children’s Information" ? (
          <ChildrenInfo userId={id} />

        ) : (
          <TabPlaceholder title={activeTab} />
        )}
      </div>

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

/* INFO COMPONENT */
function Info({ label, value }) {
  return (
    <p className="text-sm text-gray-700">
      <b className="text-gray-900">{label}:</b> {value}
    </p>
  );
}

/* PLACEHOLDER */
function TabPlaceholder({ title }) {
  return (
    <>
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">
        Data for <b>{title}</b> will be shown here.
      </p>
    </>
  );
}