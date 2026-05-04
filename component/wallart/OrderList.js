"use client";

import React, { useState } from "react";
import { Eye, Printer, Truck, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { axiosInstance } from "@/config/axios";
import OrderDetailsModal from "./wall-art-tabs/OrderDetailsModal";
import toast from "react-hot-toast";
import { useEffect } from "react";

const STATUSES = [
  { label: "Received",   value: "received" },
  { label: "Preparing",  value: "preparing" },
  { label: "Dispatched", value: "dispatched" },
  { label: "Delivered",  value: "delivered" },
];

const STATUS_COLORS = {
  received:   "bg-blue-100 text-blue-700",
  preparing:  "bg-yellow-100 text-yellow-700",
  dispatched: "bg-indigo-100 text-indigo-700",
  delivered:  "bg-green-100 text-green-700",
};

export default function OrderList() {
  const [orders, setOrders]           = useState([]);
  const [open, setOpen]               = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [page, setPage]               = useState(1);
  const [pagination, setPagination]   = useState({ total: 0, pages: 1 });
  const [openDropdown, setOpenDropdown] = useState(null); // orderId of open dropdown
  const [updatingStatus, setUpdatingStatus] = useState(null); // orderId being updated
  const LIMIT = 10;

  const fetchOrders = async () => {
    try {
      const res = await axiosInstance.get("/admin/wallart/orders", {
        params: { page, limit: LIMIT },
      });
      if (res.data.success) {
        setOrders(res.data.data);
        setPagination(res.data.pagination);
      }
    } catch (error) {
      console.error("Fetch orders error:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = () => setOpenDropdown(null);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  // ✅ Inline status update — no modal needed
  const handleStatusChange = async (orderId, newStatus, currentStatus) => {
    if (newStatus === currentStatus) return setOpenDropdown(null);

    const statusStep = { received: 1, preparing: 2, dispatched: 3, delivered: 4 };
    if (statusStep[newStatus] < statusStep[currentStatus]) {
      toast.error("Cannot set status to a previous step");
      setOpenDropdown(null);
      return;
    }

    try {
      setUpdatingStatus(orderId);
      setOpenDropdown(null);

      await axiosInstance.put(`/admin/wallart/orders/${orderId}/status`, {
        status: newStatus,
      });

      // ✅ Update locally so UI reflects immediately without refetch
      setOrders((prev) =>
        prev.map((o) =>
          o.orderId === orderId ? { ...o, status: newStatus } : o
        )
      );

      toast.success("Status updated");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    } finally {
      setUpdatingStatus(null);
    }
  };

  // ✅ Pagination helpers
  const totalPages = pagination.pages || 1;

  const getPages = () => {
    if (totalPages <= 6) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages = [1];
    if (page > 3) pages.push("...");
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
      pages.push(i);
    }
    if (page < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  return (
    <>
      <div className="bg-[#F4EFE8] border rounded-xl overflow-hidden shadow-sm">

        {/* HEADER */}
        <div className="px-6 py-4 text-2xl font-semibold text-gray-700">
          Order List
        </div>

        {/* TABLE HEADER */}
        <div className="grid grid-cols-7 px-6 py-3 text-sm font-medium border-y bg-[#ECE6DE] text-gray-600">
          <p>Order ID</p>
          <p>Customer</p>
          <p>Layout · Size</p>
          <p>Price</p>
          <p>Order Date</p>
          <p>Status</p>
          <p className="text-center">Action</p>
        </div>

        {/* TABLE BODY */}
        {orders.length > 0 ? (
          orders.map((item, i) => {
            // ✅ FIX: Use correct field names from getAllWallArtOrders response
            // Backend returns: { orderId, name, email, price, status, date }
            const currentStatus = item.status || "received";
            const isUpdating    = updatingStatus === item.orderId;
            const isDropOpen    = openDropdown === item.orderId;

            return (
              <div
                key={item.orderId}
                className={`grid grid-cols-7 px-6 py-4 items-center text-sm border-b transition ${
                  i === 0 ? "bg-[#F7F1C6]" : "bg-white hover:bg-gray-50"
                }`}
              >
                {/* ORDER ID */}
                <p className="font-medium text-gray-700">{item.orderId}</p>

                {/* CUSTOMER — ✅ FIX: backend sends `name` and `email`, not userId object */}
                <div>
                  <p className="font-medium text-gray-800">{item.name || "N/A"}</p>
                  <p className="text-xs text-gray-500">{item.email || ""}</p>
                </div>

                {/* LAYOUT · SIZE — ✅ FIX: these don't exist in list response, show dash */}
                <p className="text-gray-600">-</p>

                {/* PRICE — ✅ FIX: field is `price` not `totalPrice` */}
                <p className="text-[#A45B32] font-semibold">
                  ₹{item.price?.toLocaleString() || 0}
                </p>

                {/* DATE — ✅ FIX: field is `date` not `createdAt` */}
                <p className="text-gray-600">
                  {item.date
                    ? new Date(item.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "-"}
                </p>

                {/* STATUS DROPDOWN — ✅ FIX: now functional */}
                <div className="relative" onClick={(e) => e.stopPropagation()}>
                  <button
                    disabled={isUpdating}
                    onClick={() =>
                      setOpenDropdown(isDropOpen ? null : item.orderId)
                    }
                    className={`flex items-center gap-2 border rounded-md px-3 py-1.5 text-xs font-medium capitalize shadow-sm transition-colors ${
                      STATUS_COLORS[currentStatus] || "bg-white text-gray-700"
                    } ${isUpdating ? "opacity-50 cursor-wait" : "cursor-pointer hover:opacity-80"}`}
                  >
                    {isUpdating ? "Updating..." : currentStatus}
                    <ChevronDown size={12} />
                  </button>

                  {/* DROPDOWN */}
                  {isDropOpen && (
                    <div className="absolute left-0 top-8 z-50 w-36 bg-white border rounded-lg shadow-lg overflow-hidden">
                      {STATUSES.map((s) => {
                        const statusStep   = { received: 1, preparing: 2, dispatched: 3, delivered: 4 };
                        const isPast       = statusStep[s.value] < statusStep[currentStatus];
                        const isCurrent    = s.value === currentStatus;

                        return (
                          <div
                            key={s.value}
                            onClick={() =>
                              !isPast && !isCurrent &&
                              handleStatusChange(item.orderId, s.value, currentStatus)
                            }
                            className={`px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                              isCurrent
                                ? "bg-green-50 text-green-700 font-semibold cursor-default"
                                : isPast
                                ? "text-gray-300 cursor-not-allowed"
                                : "text-gray-700 hover:bg-gray-50 cursor-pointer"
                            }`}
                          >
                            {s.label}
                            {isCurrent && <span className="text-green-500">✓</span>}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* ACTIONS */}
                <div className="flex justify-center gap-3 text-gray-600">
                  <Eye
                    size={16}
                    onClick={() => {
                      setSelectedOrder(item);
                      setOpen(true);
                    }}
                    className="cursor-pointer hover:text-black"
                  />
                  <Printer size={16} className="cursor-pointer hover:text-black" />
                  <Truck size={16} className="cursor-pointer hover:text-black" />
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center py-6 text-gray-500">No orders found</p>
        )}

        {/* ✅ FIX: Pagination — self-contained here, no separate Pagination component needed */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center px-6 py-4 bg-[#ECE6DE] text-sm text-gray-600">
            <p>
              Showing {(page - 1) * LIMIT + 1}–
              {Math.min(page * LIMIT, pagination.total || 0)} of{" "}
              {pagination.total || 0} orders
            </p>

            <div className="flex gap-1 items-center">
              {/* PREV */}
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="p-1.5 rounded hover:bg-white disabled:opacity-40 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>

              {/* PAGE NUMBERS */}
              {getPages().map((p, i) =>
                p === "..." ? (
                  <span key={i} className="px-2 text-gray-400">...</span>
                ) : (
                  <button
                    key={i}
                    onClick={() => setPage(p)}
                    className={`w-8 h-8 rounded border text-sm transition-colors ${
                      page === p
                        ? "bg-[#25543E] text-white border-[#25543E]"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {p}
                  </button>
                )
              )}

              {/* NEXT */}
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="p-1.5 rounded hover:bg-white disabled:opacity-40 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MODAL */}
      <OrderDetailsModal open={open} setOpen={setOpen} order={selectedOrder} />
    </>
  );
}