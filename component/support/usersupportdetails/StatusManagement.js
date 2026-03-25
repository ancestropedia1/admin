"use client";

import { useEffect, useState } from "react";
import { axiosInstance } from "@/config/axios";

export default function StatusManagement({ ticket, refresh }) {

  const [status, setStatus] = useState("Open");
  const [priority, setPriority] = useState("Medium");
  const [assignedTo, setAssignedTo] = useState("");
  const [comment, setComment] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ticket) {
      setStatus(ticket.status || "Open");
      setPriority(ticket.priority || "Medium");
      setAssignedTo(ticket.assignedTo?._id || "");
      setComment(ticket.adminComment || "");
      setCategory(ticket.category || "");
    }
  }, [ticket]);

  const handleSave = async () => {
    if (!ticket?._id) return alert("❌ Ticket not loaded");

    try {
      setLoading(true);

      await axiosInstance.put(`/admin/tickets/${ticket._id}`, {
        status,
        priority,
        assignedTo: assignedTo || null,
        adminComment: comment,
        category,
      });

      alert("✅ Updated successfully");
      if (refresh) refresh();

    } catch (error) {
      console.error(error);
      alert("❌ Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border space-y-5">

      {/* HEADER */}
      <h3 className="text-lg font-semibold border-b pb-2">
        Status Management
      </h3>

      {/* STATUS */}
      <div className="space-y-1">
        <label className="text-sm text-gray-600">Update Status</label>
        <select
          className="w-full border rounded-lg p-2 bg-gray-50"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Open">Open</option>
          <option value="In Progress">Processing</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      {/* ASSIGNED */}
      <div className="space-y-1">
        <label className="text-sm text-gray-600">Assigned Status</label>
        <select
          className="w-full border rounded-lg p-2 bg-gray-50"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        >
          <option value="">Select Admin</option>
          <option value="adminId">Admin</option>
        </select>
      </div>

      {/* PRIORITY */}
      <div className="space-y-1">
        <label className="text-sm text-gray-600">Priority Level</label>
        <select
          className="w-full border rounded-lg p-2 bg-gray-50"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Low">Low Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="High">High Priority</option>
        </select>
      </div>

      {/* CATEGORY (Token Type UI) */}
      <div className="space-y-1">
        <label className="text-sm text-gray-600">Token Type</label>
        <select
          className="w-full border rounded-lg p-2 bg-gray-50"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Type</option>
          <option value="DNA Kit">DNA Kit</option>
          <option value="Heritage Vault">Heritage Vault</option>
          <option value="Token">DAN Order</option>
          <option value="Family Tree">Family Tree</option>
        </select>
      </div>

      {/* COMMENT */}
      <div className="space-y-1">
        <label className="text-sm text-gray-600">Comments</label>
        <textarea
          className="w-full border rounded-lg p-3 bg-gray-50"
          rows={4}
          placeholder="Write resolutions comments"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      {/* BUTTON */}
      <button
        onClick={handleSave}
        disabled={!ticket?._id || loading}
        className="w-full bg-green-800 hover:bg-green-900 transition text-white py-3 rounded-lg font-medium disabled:opacity-50"
      >
        {loading ? "Saving..." : "💾 Save Changes"}
      </button>

    </div>
  );
}