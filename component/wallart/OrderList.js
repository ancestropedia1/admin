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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axiosInstance.get("/admin/wallart/orders", {
        params: { page, limit: 10 },
      });

      if (res.data.success) {
        setOrders(res.data.data);
        setPagination(res.data.pagination);
      } else {
        setOrders([]);
        setError("Failed to fetch orders");
      }
    } catch (err) {
      console.error("Fetch orders error:", err);
      setError("Unauthorized or failed to fetch orders");
      setOrders([]);
    } finally {
      setLoading(false);
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
        <div className="grid grid-cols-7 px-6 py-3 text-sm font-medium border-y bg-[#ECE6DE] text-gray-600">
          <p>Order ID</p>
          <p>Customer</p>
          <p>Price</p>
          <p>Order Date</p>
          <p>Status</p>
          <p className="text-center col-span-2">Action</p>
        </div>

        {/* TABLE BODY */}
        {loading ? (
          <p className="text-center py-10 text-gray-400">
            Loading orders...
          </p>
        ) : error ? (
          <p className="text-center py-10 text-red-500">
            {error}
          </p>
        ) : orders.length > 0 ? (
          orders.map((item, i) => (
            <div
              key={item.orderId}
              className={`grid grid-cols-7 px-6 py-4 items-center text-sm border-b transition ${
                i === 0
                  ? "bg-[#F7F1C6]"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              {/* ORDER ID */}
              <p className="font-medium text-gray-700">
                #{item.orderId}
              </p>

              {/* CUSTOMER */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold">
                  {item.name?.charAt(0) || "U"}
                </div>

                <div>
                  <p className="font-medium text-gray-800">
                    {item.name || "N/A"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item.email || ""}
                  </p>
                </div>
              </div>

              {/* PRICE */}
              <p className="text-[#A45B32] font-semibold">
                ₹{item.price?.toLocaleString() || 0}
              </p>

              {/* DATE */}
              <p className="text-gray-600">
                {item.date
                  ? new Date(item.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : "-"}
              </p>

              {/* STATUS */}
              <div>
                <button className="flex items-center gap-2 border rounded-md px-3 py-1 text-xs bg-white capitalize shadow-sm hover:bg-gray-50">
                  {item.status || "received"}
                  <ChevronDown size={14} />
                </button>
              </div>

              {/* ACTIONS */}
              <div className="flex justify-center gap-3 col-span-2 text-gray-600">
                <Eye
                  size={16}
                  onClick={() => {
                    setSelectedOrder(item);
                    setOpen(true);
                  }}
                  className="cursor-pointer hover:text-black"
                />
                <Printer className="cursor-pointer hover:text-black" size={16} />
                <Truck className="cursor-pointer hover:text-black" size={16} />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center py-10 text-gray-500">
            No orders found
          </p>
        )}

        {/* FOOTER */}
        <div className="flex justify-between items-center px-6 py-4 bg-[#ECE6DE] text-sm text-gray-600">
          <p>
            Showing {(page - 1) * 10 + 1}–
            {Math.min(page * 10, pagination.total || 0)} of{" "}
            {pagination.total || 0} orders
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
      <OrderDetailsModal
        open={open}
        setOpen={setOpen}
        order={selectedOrder}
      />
    </>
  );
}