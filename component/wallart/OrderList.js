"use client";

import React, { useState, useEffect } from "react";
import { Eye, Printer, Truck, ChevronDown } from "lucide-react";

import { axiosInstance } from "@/config/axios";
import Pagination from "./Pagination";
import OrderDetailsModal from "./wall-art-tabs/OrderDetailsModal";

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});

  const fetchOrders = async () => {
    try {
      const res = await axiosInstance.get("/admin/wallart/orders", {
        params: { page, limit: 10 },
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

  return (
    <>
      <div className="bg-[#F4EFE8] border rounded-xl overflow-hidden shadow-sm">
        {/* HEADER */}
        <div className="px-6 py-4 text-2xl font-semibold text-gray-700">
          Order List
        </div>

        {/* TABLE HEADER */}
        <div className="grid grid-cols-8 px-6 py-3 text-sm font-medium border-y bg-[#ECE6DE] text-gray-600">
          <p>Order ID</p>
          <p>Family Tree</p>
          <p>Frame</p>
          <p>Size</p>
          <p>Price</p>
          <p>Order Date</p>
          <p>Status</p>
          <p className="text-center">Action</p>
        </div>

        {/* TABLE BODY */}
        {orders.length > 0 ? (
          orders.map((item, i) => (
            <div
              key={i}
              className={`grid grid-cols-8 px-6 py-4 items-center text-sm border-b transition
                ${
                  i === 0
                    ? "bg-[#F7F1C6]" // 🔥 Highlight first row
                    : "bg-white hover:bg-gray-50"
                }
              `}
            >
              {/* ORDER ID */}
              <p className="font-medium text-gray-700">#{item.orderId}</p>

              {/* USER */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold">
                  {item.userId?.name?.charAt(0)}
                </div>

                <div>
                  <p className="font-medium text-gray-800">
                    {item.userId?.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    ID-{item.userId?._id?.slice(-6)}
                  </p>
                </div>
              </div>

              {/* FRAME */}
              <p>{item.frameType || "-"}</p>

              {/* SIZE */}
              <p>{item.size || "-"}</p>

              {/* PRICE */}
              <p className="text-[#A45B32] font-semibold">₹{item.totalPrice}</p>

              {/* DATE */}
              <p className="text-gray-600">
                {new Date(item.createdAt).toLocaleDateString()}
              </p>

              {/* STATUS */}
              <div>
                <button className="flex items-center gap-2 border rounded-md px-3 py-1 text-xs bg-white capitalize shadow-sm hover:bg-gray-50">
                  {item.adminStatus || "received"}
                  <ChevronDown size={14} />
                </button>
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
                <Printer
                  size={16}
                  className="cursor-pointer hover:text-black"
                />
                <Truck size={16} className="cursor-pointer hover:text-black" />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center py-6 text-gray-500">No orders found</p>
        )}

        {/* FOOTER */}
        <div className="flex justify-between items-center px-6 py-4 bg-[#ECE6DE] text-sm text-gray-600">
          <p>
            Showing {orders.length} of {pagination.total || 0} Requests
          </p>

          <Pagination
            page={page}
            setPage={setPage}
            totalPages={pagination.pages || 1}
            total={pagination.total || 0}
            limit={10}
          />
        </div>
      </div>

      {/* MODAL */}
      <OrderDetailsModal open={open} setOpen={setOpen} order={selectedOrder} />
    </>
  );
}
