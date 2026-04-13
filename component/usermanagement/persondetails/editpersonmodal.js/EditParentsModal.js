"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { axiosInstance } from "@/config/axios";

export default function EditParentsModal({ parents = {}, userId, onClose, onUpdate }) {

  const [form, setForm] = useState({
    father: {
      firstName: parents?.father?.firstName || "",
      lastName: parents?.father?.lastName || "",
      gender: parents?.father?.gender || "male",
    },
    mother: {
      firstName: parents?.mother?.firstName || "",
      lastName: parents?.mother?.lastName || "",
      gender: parents?.mother?.gender || "female",
    },
  });

  const handleChange = (type, field, value) => {
    setForm({
      ...form,
      [type]: {
        ...form[type],
        [field]: value,
      },
    });
  };

  const handleSave = async () => {
    try {
      // ⚠️ NOTE: backend expects IDs normally
      // For now sending full objects (you may handle in backend)

      const res = await axiosInstance.put(
        `/admin/person/${userId}`,
        {
          father: form.father,
          mother: form.mother,
        }
      );

      onUpdate(res.data.person);
      onClose();
    } catch (error) {
      console.error("Update parents failed", error);
      alert("Failed ❌");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[480px] rounded-lg p-4 shadow-md">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold">Edit Parents</h2>
          <X onClick={onClose} className="cursor-pointer" />
        </div>

        {/* FATHER */}
        <div className="border rounded-md p-3 mb-3 bg-gray-50">
          <h3 className="text-sm font-semibold text-green-700 mb-2">
            Father
          </h3>

          <Input
            placeholder="First Name"
            value={form.father.firstName}
            onChange={(e) =>
              handleChange("father", "firstName", e.target.value)
            }
          />

          <Input
            placeholder="Last Name"
            value={form.father.lastName}
            onChange={(e) =>
              handleChange("father", "lastName", e.target.value)
            }
          />

          <select
            value={form.father.gender}
            onChange={(e) =>
              handleChange("father", "gender", e.target.value)
            }
            className="w-full border p-2 rounded text-sm mt-2"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* MOTHER */}
        <div className="border rounded-md p-3 bg-gray-50">
          <h3 className="text-sm font-semibold text-green-700 mb-2">
            Mother
          </h3>

          <Input
            placeholder="First Name"
            value={form.mother.firstName}
            onChange={(e) =>
              handleChange("mother", "firstName", e.target.value)
            }
          />

          <Input
            placeholder="Last Name"
            value={form.mother.lastName}
            onChange={(e) =>
              handleChange("mother", "lastName", e.target.value)
            }
          />

          <select
            value={form.mother.gender}
            onChange={(e) =>
              handleChange("mother", "gender", e.target.value)
            }
            className="w-full border p-2 rounded text-sm mt-2"
          >
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </div>

        {/* ACTION */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={handleSave}
            className="bg-yellow-400 px-4 py-1 rounded text-sm"
          >
            Save
          </button>

          <button
            onClick={onClose}
            className="border px-4 py-1 rounded text-sm"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}

/* INPUT */
function Input({ value, onChange, placeholder }) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border p-2 rounded text-sm mt-2"
    />
  );
}