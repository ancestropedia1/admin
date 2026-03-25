"use client";

import { useEffect, useState } from "react";
import { axiosInstance } from "@/config/axios";

export default function StatusManagement({ ticket, refresh }) {

  // ✅ STATE
  const [status, setStatus] = useState("Open");
  const [priority, setPriority] = useState("Medium");
  const [assignedTo, setAssignedTo] = useState("");
  const [comment, setComment] = useState("");

  // ✅ SYNC STATE WHEN TICKET LOADS
  useEffect(() => {
    if (ticket) {
      setStatus(ticket.status || "Open");
      setPriority(ticket.priority || "Medium");
      setAssignedTo(ticket.assignedTo?._id || "");
      setComment(ticket.adminComment || "");
    }
  }, [ticket]);

  // 🔥 SAVE HANDLER
  const handleSave = async () => {
    if (!ticket?._id) {
      alert("❌ Ticket not loaded yet");
      return;
    }

    try {
      const res = await axiosInstance.put(`/admin/tickets/${ticket._id}`, {
        status,
        priority,
        assignedTo,
        adminComment: comment,
      });

      console.log("UPDATED:", res.data);
      alert("✅ Updated successfully");

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

      {/* ✅ ASSIGNED ADMIN */}
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

      {/* OPTIONAL */}
      <select className="w-full border p-2 rounded">
        <option>Token Type: DAN Order</option>
         <option> DAN Order</option>
      </select>

      {/* ✅ COMMENT */}
      <textarea
        className="w-full border p-2 rounded"
        placeholder="Write comments..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      {/* ✅ SAVE */}
      <button
        onClick={handleSave}
        className="w-full bg-green-800 text-white p-2 rounded"
      >
        Save Changes
      </button>

    </div>
  );
}