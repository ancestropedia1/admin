"use client";

import React, { useState, useEffect } from "react";
import {
  Eye,
  Printer,
  Truck,
  ChevronDown,
} from "lucide-react";

import { axiosInstance } from "@/config/axios";
import Pagination from "./Pagination";
import OrderDetailsModal from "./wall-art-tabs/OrderDetailsModal";

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});

  // 🔥 Fetch orders from backend
  const fetchOrders = async () => {
    try {
      const res = await axiosInstance.get("/admin/wallart/orders", {
        params: {
          page,
          limit: 10,
        },
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
        {/* Header */}
        <div className="px-6 py-4 text-2xl font-semibold text-gray-700">
          Order List
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-8 px-6 py-3 text-sm font-medium border-y bg-[#ECE6DE]">
          <p>Order ID</p>
          <p>Family Tree</p>
          <p>Frame</p>
          <p>Size</p>
          <p>Price</p>
          <p>Order Date</p>
          <p>Status</p>
          <p>Action</p>
        </div>

        {/* Data */}
        {orders.length > 0 ? (
          orders.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-8 px-6 py-4 items-center text-sm border-b bg-white"
            >
              <p>{item.orderId}</p>

              <div>
                <p className="font-medium">{item.userId?.name}</p>
                <p className="text-xs text-gray-500">
                  {item.userId?._id}
                </p>
              </div>

              <p>{item.frameType || "-"}</p>
              <p>{item.size || "-"}</p>
              <p className="text-[#A45B32] font-medium">
                ₹{item.totalPrice}
              </p>

              <p>
                {new Date(item.createdAt).toLocaleDateString()}
              </p>

              {/* Status */}
              <button className="border rounded px-3 py-1 flex items-center gap-2 text-xs bg-white capitalize">
                {item.adminStatus || "received"}
                <ChevronDown size={14} />
              </button>

              {/* Actions */}
              <div className="flex gap-3 text-gray-600">
                <Eye
                  size={16}
                  onClick={() => {
                    setSelectedOrder(item);
                    setOpen(true);
                  }}
                  className="cursor-pointer hover:text-black"
                />
                <Printer size={16} className="cursor-pointer" />
                <Truck size={16} className="cursor-pointer" />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center py-6">No orders found</p>
        )}

        {/* Pagination */}
        <Pagination
          page={page}
          setPage={setPage}
          totalPages={pagination.pages || 1}
        />
      </div>

      {/* MODAL */}
      <OrderDetailsModal
        open={open}
        setOpen={setOpen}
        order={selectedOrder}
      />
    </>
  );
}