"use client";

import { useState, useEffect } from "react";
import { axiosInstanceLocal } from "@/config/axios";
import { Mail, Phone, Clock } from "lucide-react";

export default function AdminProfilePage() {
  const adminId =
    typeof window !== "undefined"
      ? localStorage.getItem("adminId")
      : null;

  /* ================= STATES ================= */
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");

  const [profileLoading, setProfileLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  /* ================= FETCH PROFILE ================= */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstanceLocal.get(
          `/admin/${adminId}`
        );

        const data = res.data.data;

        setFullName(data.fullName || "");
        setGender(data.gender || "");
        setCity(data.city || "");
        setEmail(data.email || "");
        setContact(data.contact || "");

        // Format date for input type="date"
        if (data.dateOfBirth) {
          const formattedDate = new Date(data.dateOfBirth)
            .toISOString()
            .split("T")[0];
          setDateOfBirth(formattedDate);
        }
      } catch (error) {
        alert("Failed to load profile");
      } finally {
        setInitialLoading(false);
      }
    };

    if (!adminId) {
    setInitialLoading(false); // 👈 ADD THIS
    return;
  }

  fetchProfile();
}, [adminId]);

 /* ================= UPDATE PROFILE ================= */
const handleProfileUpdate = async () => {
  try {
    setProfileLoading(true);

    const adminId = localStorage.getItem("adminId");

    console.log("Admin ID:", adminId); // 👈 Check if null

    if (!adminId) {
      console.error("Admin ID is missing in localStorage");
      alert("Admin ID not found. Please login again.");
      return;
    }

    console.log("Sending Data:", {
      fullName,
      gender,
      dateOfBirth,
      city,
      email,
      contact,
    });

    const res = await axiosInstanceLocal.put(
      `/admin/profile/${adminId}`,
      {
        fullName,
        gender,
        dateOfBirth,
        city,
        email,
        contact,
      }
    );

    console.log("Response:", res.data); // 👈 Check backend response

    alert(res.data.message);
  } catch (error) {
    console.error("Update Error:", error); // 👈 Full error
    console.error("Error Response:", error?.response);

    alert(
      error?.response?.data?.message ||
        "Failed to update profile"
    );
  } finally {
    setProfileLoading(false);
  }
};

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-[#F8F6E7] min-h-screen">
      {/* HEADER */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold">{fullName}</h2>
        <div className="flex gap-4 text-sm text-gray-600 mt-2">
          <span className="flex items-center gap-1">
            <Mail size={14} /> {email}
          </span>
          <span className="flex items-center gap-1">
            <Phone size={14} /> {contact}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} /> Active
          </span>
        </div>
      </div>

      {/* PROFILE FORM */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="font-semibold mb-4">
          Profile Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />

          {/* Gender Dropdown */}
          <div>
            <label className="text-xs text-gray-500">
              Gender
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full mt-1 border rounded-md px-3 py-2 text-sm"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <Input
            label="Date of Birth"
            type="date"
            value={dateOfBirth}
            onChange={(e) =>
              setDateOfBirth(e.target.value)
            }
          />

          <Input label="City" value={city} onChange={(e) => setCity(e.target.value)} />
          <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input label="Contact" value={contact} onChange={(e) => setContact(e.target.value)} />
        </div>

        <button
          onClick={handleProfileUpdate}
          disabled={profileLoading}
          className="mt-5 bg-green-700 text-white px-5 py-2 rounded-md disabled:opacity-50"
        >
          {profileLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

/* ================= REUSABLE INPUT ================= */
function Input({ label, value = "", type = "text", onChange }) {
  return (
    <div>
      <label className="text-xs text-gray-500">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full mt-1 border rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-green-600"
      />
    </div>
  );
}