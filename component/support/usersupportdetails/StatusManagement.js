"use client";

import { useState } from "react";
import { axiosInstance } from "@/config/axios";

export default function StatusManagement({ ticket, refresh }) {

  // ✅ STATE
  const [status, setStatus] = useState(ticket?.status || "Open");
  const [priority, setPriority] = useState(ticket?.priority || "Medium");
  const [assignedTo, setAssignedTo] = useState(ticket?.assignedTo?._id || "");
  const [comment, setComment] = useState(ticket?.adminComment || "");

  // 🔥 SAVE HANDLER
  const handleSave = async () => {
    try {
      const res = await axiosInstance.put(`/admin/tickets/${ticket._id}`, {
        status,
        priority,
        assignedTo,
        adminComment: comment,
      });

      console.log("UPDATED:", res.data);

      alert("✅ Updated successfully");

      // 🔄 REFRESH DATA (VERY IMPORTANT)
      if (refresh) refresh();

    } catch (error) {
      console.error("Update error:", error.response?.data || error.message);
      alert("❌ Failed to update");
    }
  };

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border space-y-3">

      <h3 className="font-semibold">Status Management</h3>

      {/* ✅ STATUS */}
      <select
        className="w-full border p-2 rounded"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="Open">Open</option>
        <option value="In Progress">In Progress</option>
        <option value="Resolved">Resolved</option>
      </select>

      {/* ✅ ASSIGNED ADMIN (STATIC FOR NOW) */}
      <select
        className="w-full border p-2 rounded"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
      >
        <option value="">Assign Admin</option>
        <option value="adminId">Admin</option>
      </select>

      {/* ✅ PRIORITY */}
      <select
        className="w-full border p-2 rounded"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      {/* 🔥 OPTIONAL FIELD */}
      <select className="w-full border p-2 rounded">
        <option>Token Type: DAN Order</option>
      </select>

      {/* ✅ COMMENT */}
      <textarea
        className="w-full border p-2 rounded"
        placeholder="Write comments..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      {/* ✅ SAVE BUTTON */}
      <button
        onClick={handleSave}
        className="w-full bg-green-800 text-white p-2 rounded"
      >
        Save Changes
      </button>

    </div>
  );
}