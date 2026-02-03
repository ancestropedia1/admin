"use client";
import { X, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { axiosInstance, axiosInstanceLocal } from "@/config/axios";

const PERMISSION_MAP = {
  "User Management": "usermanagement",
  "Add User": "adduser",
  "Blog Management": "blogmanagement",
  "Wall Art": "wallart",
  "DNA Kit & Report": "dna-kit",
  "Token Request": "tokenmanagement",
  "Vault & Space": "vaultmanagement",
  "Support Ticket": "supportmanagement",
};

export default function CreateExecutive({ onClose }) {
  // FORM STATE
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [permissions, setPermissions] = useState([]);
  
  // ⭐ NEW: temp password state
  const [tempPassword, setTempPassword] = useState("");

  // HANDLE CHECKBOX
  const handlePermissionChange = (label) => {
    const value = PERMISSION_MAP[label];

    setPermissions((prev) =>
      prev.includes(value)
        ? prev.filter((p) => p !== value)
        : [...prev, value]
    );
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      email,
      phone,
      role,
      permissions,
    };

    try {
      const res = await axiosInstance.post(
        "/admin/executive/executivemanage",
        payload
      );

      console.log("Backend response:", res.data);

      // ⭐ NEW: Set Temp Password from backend
      if (res.data?.tempPassword) {
        setTempPassword(res.data.tempPassword);
      }

      // ❌ Remove onClose here if you want admin to see password first
      // onClose();

    } catch (error) {
  console.error("🔥 FULL ERROR:", error);

  if (error.response) {
    console.log("❌ Backend Error:", error.response.data);
  } else {
    console.log("⚠️ No backend response:", error.message);
  }
}

  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative">
        {/* HEADER */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-lg font-semibold text-gray-800">Create Account</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500 hover:text-red-500" />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">

          {/* NAME + EMAIL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Full Name" className="border rounded-md px-3 py-2 w-full"
              value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="email" placeholder="Email Address" className="border rounded-md px-3 py-2 w-full"
              value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          {/* PHONE + ROLE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Phone Number" className="border rounded-md px-3 py-2 w-full"
              value={phone} onChange={(e) => setPhone(e.target.value)} required />

            <select className="border rounded-md px-3 py-2 w-full" value={role}
              onChange={(e) => setRole(e.target.value)} required>
              <option value="">Select Role</option>
              <option value="Admin">Admin Executive</option>
              <option value="Manager">Backend Executive</option>
              <option value="Editor">Content Manager</option>
            </select>
          </div>

          {/* PERMISSIONS */}
          <div className="border rounded-md p-4">
            <p className="font-medium text-sm mb-3">Permissions</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {Object.keys(PERMISSION_MAP).map((label) => (
                <label key={label} className="flex items-center gap-2">
                  <input type="checkbox" onChange={() => handlePermissionChange(label)} />
                  {label}
                </label>
              ))}
            </div>
          </div>

          {/* ⭐ PASSWORD INFO */}
          <div>
            <h1 className="font-bold mt-4">Temporary Password</h1>
            <div className="flex gap-4 mt-2">
              <input
                disabled
                value={tempPassword || "Auto-generated"} // ⭐ Show real password
                className="border rounded-md px-3 py-2 w-full bg-gray-100"
              />
              <button type="button" className="bg-yellow-400 w-15 h-12 rounded-lg flex items-center justify-center">
                <RefreshCcw className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Credentials will be emailed automatically
            </p>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose}
              className="px-4 py-2 border rounded-md hover:bg-gray-100">
              Cancel
            </button>

            <button type="submit"
              className="px-5 py-2 bg-[#265A46] text-white rounded-md hover:bg-green-700">
              Create Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
