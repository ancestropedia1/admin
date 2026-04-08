"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { axiosInstance } from "@/config/axios"; // ✅ added

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

  // ✅ NOW CONNECTED TO BACKEND
  const handleSave = async () => {
    try {
      const res = await axiosInstance.put(
        `/admin/users/${user._id}`, // ✅ backend API
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
      <div className="bg-white w-[600px] rounded-xl p-6 shadow-lg relative">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Update Personal Info</h2>
          <X className="cursor-pointer" onClick={onClose} />
        </div>

        <div className="space-y-4">
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full border p-3 rounded-lg"
          />

          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full border p-3 rounded-lg"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border p-3 rounded-lg"
          />

          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-5 py-2 border rounded-lg">
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2 bg-yellow-400 rounded-lg font-medium"
          >
            Save Changes →
          </button>
        </div>
      </div>
    </div>
  );
}