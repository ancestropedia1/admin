"use client";

import { useState } from "react";
import { X, User } from "lucide-react";
import { axiosInstance } from "@/config/axios";

export default function EditUserModal({ user, onClose, onUpdate }) {
  const [form, setForm] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    gender: user.gender || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await axiosInstance.put(
        `/admin/users/users/${user._id}`,
        form
      );

      onUpdate(res.data.user);
      onClose();
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update user ❌");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[520px] rounded-xl p-6 shadow-lg relative">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Update Personal Info</h2>
          <X className="cursor-pointer" onClick={onClose} />
        </div>

        {/* PROFILE ICON SECTION */}
        <div className="bg-gray-100 border rounded-xl p-5 flex flex-col items-center mb-5">
          <div className="w-14 h-14 rounded-full border flex items-center justify-center bg-white">
            <User size={20} />
          </div>

          <div className="w-full mt-4">
            <label className="text-sm text-gray-600">
              Email
            </label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full border mt-1 p-2.5 rounded-lg text-sm"
            />
          </div>
        </div>

        {/* PERSONAL INFO SECTION */}
        <div className="bg-gray-100 border rounded-xl p-5">

          <h3 className="text-green-700 font-semibold flex items-center gap-2 mb-4">
            <User size={16} /> Personal Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="text-xs text-gray-500">
                First Name
              </label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="w-full border mt-1 p-2.5 rounded-lg text-sm"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500">
                Last Name
              </label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="w-full border mt-1 p-2.5 rounded-lg text-sm"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs text-gray-500">
                Gender
              </label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full border mt-1 p-2.5 rounded-lg text-sm"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-yellow-400 rounded-lg font-medium"
          >
            Save Changes →
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 border rounded-lg"
          >
            Cancel ✕
          </button>
        </div>

      </div>
    </div>
  );
}