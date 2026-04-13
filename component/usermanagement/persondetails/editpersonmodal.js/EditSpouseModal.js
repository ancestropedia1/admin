"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { axiosInstance } from "@/config/axios";

export default function EditSpouseModal({ spouses = [], userId, onClose, onUpdate }) {

  const [list, setList] = useState(spouses);

  const handleChange = (index, field, value) => {
    const updated = [...list];
    updated[index][field] = value;
    setList(updated);
  };

  const handleSave = async () => {
    try {
      await axiosInstance.put(`/admin/person/${userId}`, {
        spouses: list,
      });

      onUpdate(list);
      onClose();
    } catch (error) {
      console.error("Update spouse failed", error);
      alert("Failed ❌");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[500px] max-h-[90vh] overflow-y-auto rounded-lg p-4">

        <div className="flex justify-between mb-3">
          <h2 className="font-semibold">Edit Spouse</h2>
          <X onClick={onClose} className="cursor-pointer" />
        </div>

        <div className="space-y-3">
          {list.map((s, i) => (
            <div key={i} className="border p-3 rounded-md bg-gray-50">

              <input
                value={s.spouse?.firstName || ""}
                onChange={(e) =>
                  handleChange(i, "spouse", {
                    ...s.spouse,
                    firstName: e.target.value,
                  })
                }
                placeholder="First Name"
                className="w-full border p-2 rounded mb-2 text-sm"
              />

              <select
                value={s.status}
                onChange={(e) => handleChange(i, "status", e.target.value)}
                className="w-full border p-2 rounded mb-2 text-sm"
              >
                <option value="">Status</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
              </select>

              <input
                type="date"
                value={s.fromDate || ""}
                onChange={(e) => handleChange(i, "fromDate", e.target.value)}
                className="w-full border p-2 rounded mb-2 text-sm"
              />

              <input
                type="date"
                value={s.toDate || ""}
                onChange={(e) => handleChange(i, "toDate", e.target.value)}
                className="w-full border p-2 rounded text-sm"
              />

            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={handleSave} className="bg-yellow-400 px-4 py-1 rounded">
            Save
          </button>
          <button onClick={onClose} className="border px-4 py-1 rounded">
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}