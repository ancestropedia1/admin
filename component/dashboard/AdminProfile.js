"use client";

import { useState } from "react";
import { axiosInstanceLocal } from "@/config/axios";
import { Mail, Phone, Clock } from "lucide-react";

export default function AdminProfilePage() {
  /* ================= PASSWORD STATES ================= */
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  /* ================= PROFILE STATES ================= */
  const [fullName, setFullName] = useState("Divyanshu Bansal");
  const [gender, setGender] = useState("Male");
  const [dateOfBirth, setDateOfBirth] = useState("1987-06-24");
  const [city, setCity] = useState("Mathura, UP");
  const [email, setEmail] = useState("divyanshu@gmail.com");
  const [contact, setContact] = useState("+91-8990847642");
  const [profileLoading, setProfileLoading] = useState(false);

  /* ================= CHANGE PASSWORD ================= */
  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("All password fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    try {
      setPasswordLoading(true);
      const adminId = localStorage.getItem("adminId");

      const res = await axiosInstanceLocal.put(
        "/admin/login/change-password",
        {
          adminId,
          currentPassword,
          newPassword,
          confirmPassword,
        }
      );

      alert(res.data.message);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          "Failed to update password"
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  /* ================= UPDATE PROFILE ================= */
  const handleProfileUpdate = async () => {
    try {
      setProfileLoading(true);
      const adminId = localStorage.getItem("adminId");

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

      alert(res.data.message);
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          "Failed to update profile"
      );
    } finally {
      setProfileLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-[#F8F6E7] min-h-screen">
      {/* ================= HEADER CARD ================= */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="h-36 bg-gradient-to-r from-red-900 to-red-700 relative">
          <img
            src="https://i.pravatar.cc/150"
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-white absolute -bottom-14 left-6"
          />
        </div>

        <div className="pt-16 px-6 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">
              {fullName}
            </h2>
            <p className="text-sm text-gray-500">
              Super Admin
            </p>

            <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Mail size={14} /> {email}
              </span>
              <span className="flex items-center gap-1">
                <Phone size={14} /> {contact}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={14} /> Last login: 18 Oct 2025
              </span>
            </div>
          </div>

          <span className="text-green-600 font-medium text-sm">
            ● Active
          </span>
        </div>
      </div>

      {/* ================= GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* ================= PROFILE FORM ================= */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-semibold mb-4">
            Security & Authentication
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <Input label="Gender" value={gender} onChange={(e) => setGender(e.target.value)} />
            <Input label="Date of Birth" type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
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

        {/* ================= PASSWORD ================= */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-semibold mb-4">
            Change Password
          </h3>

          <div className="space-y-3">
            <Input
              label="Current Password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <Input
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Input
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleChangePassword}
            disabled={passwordLoading}
            className="mt-4 bg-green-700 text-white w-full py-2 rounded-md disabled:opacity-50"
          >
            {passwordLoading ? "Updating..." : "Update Now"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= REUSABLE INPUT ================= */
function Input({ label, value = "", type = "text", onChange }) {
  return (
    <div>
      <label className="text-xs text-gray-500">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full mt-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
      />
    </div>
  );
}
