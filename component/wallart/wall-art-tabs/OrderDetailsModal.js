"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { axiosInstance } from "@/config/axios";
import toast from "react-hot-toast";

export default function OrderDetailsModal({ open, setOpen, order }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedLab, setSelectedLab] = useState("");

  if (!open || !order) return null;

  const timeline = order.adminTimeline || [];

  // 🔥 UPDATE STATUS
  const handleStatusUpdate = async () => {
    if (!selectedStatus) return toast.error("Select status");

    try {
      setLoading(true);

      await axiosInstance.put(
        `/admin/wallart/orders/${order.orderId}/status`,
        { status: selectedStatus }
      );

      toast.success("Status updated");
      setActiveTab("overview");
    } catch (err) {
      toast.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 ASSIGN LAB
  const handleAssignLab = async () => {
    if (!selectedLab) return toast.error("Select lab");

    try {
      setLoading(true);

      await axiosInstance.put(
        `/admin/wallart/orders/${order.orderId}/assign-lab`,
        {
          labId: selectedLab,
          labName: selectedLab,
        }
      );

      toast.success("Lab assigned");
      setActiveTab("overview");
    } catch (err) {
      toast.error("Failed to assign lab");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-start p-8 overflow-auto">
      <div className="bg-white rounded-xl w-full max-w-5xl shadow-xl">

        {/* HEADER */}
        <div className="flex justify-between items-center border-b px-6 py-4">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold">
              Order #{order.orderId}
            </h2>

            <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-md capitalize">
              {order.adminStatus}
            </span>
          </div>

          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        {/* TABS */}
        <div className="flex gap-3 px-6 py-4 border-b">
          {["overview", "status", "lab"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm capitalize ${
                activeTab === tab
                  ? "bg-[#25543E] text-white"
                  : "border"
              }`}
            >
              {tab === "overview"
                ? "Order Overview"
                : tab === "status"
                ? "Update Status"
                : "Assigned Lab"}
            </button>
          ))}
        </div>

        {/* BODY */}
        <div className="p-6">

          {/* ================= OVERVIEW ================= */}
          {activeTab === "overview" && (
            <div className="grid md:grid-cols-2 gap-6">

              {/* TIMELINE */}
              <div className="border rounded-xl p-5">
                <h3 className="font-semibold mb-4">
                  Order Status Timeline
                </h3>

                {timeline.length > 0 ? (
                  timeline.map((t, i) => (
                    <div key={i} className="mb-3">
                      <p className="font-medium capitalize">
                        {t.status}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(t.updatedAt).toLocaleString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No timeline</p>
                )}
              </div>

              {/* SUMMARY */}
              <div className="border rounded-xl p-5">
                <h3 className="font-semibold mb-4">Order Summary</h3>

                <p><b>Name:</b> {order.userId?.name}</p>
                <p><b>Email:</b> {order.userId?.email}</p>
                <p><b>Price:</b> ₹{order.totalPrice}</p>
                <p><b>Date:</b> {new Date(order.createdAt).toDateString()}</p>
              </div>
            </div>
          )}

          {/* ================= STATUS ================= */}
          {activeTab === "status" && (
            <div className="grid md:grid-cols-2 gap-6">

              {/* Timeline */}
              <div className="border rounded-xl p-5">
                <h3 className="font-semibold mb-4">
                  Timeline
                </h3>

                {timeline.map((t, i) => (
                  <p key={i} className="mb-2 capitalize">
                    {t.status}
                  </p>
                ))}
              </div>

              {/* Status Select */}
              <div className="border rounded-xl p-5">
                <h3 className="font-semibold mb-4">
                  Select Status
                </h3>

                {["received", "preparing", "dispatched", "delivered"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedStatus(s)}
                    className={`w-full py-2 mb-2 rounded border capitalize ${
                      selectedStatus === s
                        ? "bg-green-600 text-white"
                        : ""
                    }`}
                  >
                    {s}
                  </button>
                ))}

                <button
                  onClick={handleStatusUpdate}
                  disabled={loading}
                  className="mt-4 w-full bg-[#25543E] text-white py-2 rounded"
                >
                  Update Status
                </button>
              </div>
            </div>
          )}

          {/* ================= LAB ================= */}
          {activeTab === "lab" && (
            <div className="grid md:grid-cols-2 gap-6">

              <div className="border rounded-xl p-5">
                <img
                  src="https://images.unsplash.com/photo-1581091215367-59ab6b6c6f53"
                  className="rounded-md w-full h-56 object-cover"
                />
              </div>

              <div className="border rounded-xl p-5">
                <h3 className="font-semibold mb-4">
                  Assign Lab
                </h3>

                {[
                  "YRS Printing Agency",
                  "Bharti Painting Agency",
                  "Alpha Painting House",
                  "Astha Printing Lab",
                ].map((lab) => (
                  <div
                    key={lab}
                    onClick={() => setSelectedLab(lab)}
                    className={`border p-3 mb-2 rounded cursor-pointer ${
                      selectedLab === lab ? "bg-green-100" : ""
                    }`}
                  >
                    {lab}
                  </div>
                ))}

                <button
                  onClick={handleAssignLab}
                  disabled={loading}
                  className="mt-4 w-full bg-[#25543E] text-white py-2 rounded"
                >
                  Assign Lab
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}