"use client";

import { useState } from "react";
import { X, User } from "lucide-react";
import { axiosInstance } from "@/config/axios";

export default function EditChildModal({
  child,
  userId,
  onClose,
  onUpdate,
}) {
  const [form, setForm] = useState({
    firstName: child?.firstName || "",
    lastName: child?.lastName || "",
    gender: child?.gender || "",
    birthDate: child?.birthDate || "",
    birthCity: child?.birthCity || "",
    occupation: child?.occupation || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await axiosInstance.put(
        `/admin/person/${child._id}`, // ✅ update child person
        form
      );

      onUpdate(res.data.person);
      onClose();
    } catch (error) {
      console.error("Child update failed", error);
      alert("Failed ❌");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[450px] rounded-lg p-4 shadow-md">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-base font-semibold">Edit Child</h2>
          <X size={18} className="cursor-pointer" onClick={onClose} />
        </div>

        {/* PROFILE ICON */}
        <div className="flex justify-center mb-3">
          <div className="w-12 h-12 rounded-full border flex items-center justify-center">
            <User size={18} />
          </div>
        </div>

        {/* FORM */}
        <div className="grid grid-cols-2 gap-3">

          <Input
            label="First Name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
          />

          <Input
            label="Last Name"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
          />

          <Select
            label="Gender"
            name="gender"
            value={form.gender}
            onChange={handleChange}
          />

          <Input
            label="Birth Date"
            name="birthDate"
            type="date"
            value={form.birthDate}
            onChange={handleChange}
          />

          <Input
            label="Birth City"
            name="birthCity"
            value={form.birthCity}
            onChange={handleChange}
          />

          <Input
            label="Occupation"
            name="occupation"
            value={form.occupation}
            onChange={handleChange}
          />

        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={handleSave}
            className="px-4 py-1.5 bg-yellow-400 rounded-md text-sm font-medium"
          >
            Save
          </button>

          <button
            onClick={onClose}
            className="px-4 py-1.5 border rounded-md text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

/* INPUT */
function Input({ label, name, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="text-[11px] text-gray-500">{label}</label>
      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        className="w-full border mt-1 p-1.5 rounded-md text-xs"
      />
    </div>
  );
}

/* SELECT */
function Select({ label, name, value, onChange }) {
  return (
    <div>
      <label className="text-[11px] text-gray-500">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border mt-1 p-1.5 rounded-md text-xs"
      >
        <option value="">Select</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="others">Others</option>
      </select>
    </div>
  );
}