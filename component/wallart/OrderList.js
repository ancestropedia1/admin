"use client";

import React, { useState } from "react";
import {
  Eye,
  Printer,
  Truck,
  ChevronDown,
} from "lucide-react";

import Pagination from "./Pagination";
import OrderDetailsModal from "./OrderDetailsModal";

const data = [
  {
    id: "#701637",
    name: "John Doe",
    userId: "ID-813764",
    frame: "Canvas Print",
    size: "80*180 cm",
    price: "Rs. 12,99",
    date: "12/05/2025",
    status: "Dispatched",
  },
];

export default function OrderList() {
  const [open, setOpen] = useState(false);

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

        {data.map((item, i) => (
          <div
            key={i}
            className="grid grid-cols-8 px-6 py-4 items-center text-sm border-b bg-white"
          >
            <p>{item.id}</p>

            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-xs text-gray-500">{item.userId}</p>
            </div>

            <p>{item.frame}</p>
            <p>{item.size}</p>
            <p className="text-[#A45B32] font-medium">{item.price}</p>
            <p>{item.date}</p>

            <button className="border rounded px-3 py-1 flex items-center gap-2 text-xs bg-white">
              {item.status}
              <ChevronDown size={14} />
            </button>

            <div className="flex gap-3 text-gray-600">
              <Eye
                size={16}
                onClick={() => setOpen(true)}
                className="cursor-pointer hover:text-black"
              />
              <Printer size={16} className="cursor-pointer" />
              <Truck size={16} className="cursor-pointer" />
            </div>
          </div>
        ))}

        <Pagination />
      </div>

      {/* MODAL */}
      <OrderDetailsModal open={open} setOpen={setOpen} />
    </>
  );
}