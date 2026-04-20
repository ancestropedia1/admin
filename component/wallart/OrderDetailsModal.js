"use client";

import React from "react";
import { X, CheckCircle } from "lucide-react";

export default function OrderDetailsModal({ open, setOpen }) {
  if (!open) return null;

  const timeline = [
    { title: "Report Ready", done: false, date: "Not Yet Completed" },
    { title: "Sample Received by Lab", done: true, date: "Aug 18, 2025" },
    { title: "Kit Shipped", done: true, date: "Aug 15, 2025" },
    { title: "Order Placed", done: true, date: "Aug 14, 2025" },
  ];

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-start p-8 overflow-auto">
      <div className="bg-white rounded-xl w-full max-w-5xl shadow-xl animate-in fade-in zoom-in-95">

        {/* HEADER */}
        <div className="flex justify-between items-center border-b px-6 py-4">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-gray-700">
              Order ID #701637
            </h2>

            <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-md">
              Dispatched
            </span>
          </div>

          <button onClick={() => setOpen(false)}>
            <X className="text-gray-600 hover:text-black" />
          </button>
        </div>

        {/* TABS */}
        <div className="flex gap-3 px-6 py-4 border-b">
          <button className="bg-[#25543E] text-white px-4 py-2 rounded-md text-sm">
            Order Overview
          </button>

          <button className="border px-4 py-2 rounded-md text-sm">
            Update Status
          </button>

          <button className="border px-4 py-2 rounded-md text-sm">
            Assigned Lab
          </button>
        </div>

        {/* BODY */}
        <div className="grid md:grid-cols-2 gap-6 p-6">

          {/* TIMELINE */}
          <div className="border rounded-xl p-5">
            <h3 className="text-xl font-semibold mb-5 text-gray-700">
              Order Status Timeline
            </h3>

            <div className="space-y-5">
              {timeline.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center ${
                        step.done
                          ? "bg-green-500 text-white"
                          : "bg-gray-300 text-white"
                      }`}
                    >
                      ✓
                    </div>

                    {i !== timeline.length - 1 && (
                      <div className="w-[2px] h-10 bg-gray-300 mt-1" />
                    )}
                  </div>

                  <div>
                    <p className="font-semibold text-gray-700">{step.title}</p>
                    <p className="text-sm text-gray-500">{step.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SUMMARY */}
          <div className="border rounded-xl p-5">
            <h3 className="text-xl font-semibold mb-5 text-gray-700">
              Order Summary
            </h3>

            <div className="grid grid-cols-2 gap-y-5 text-sm">
              <div>
                <p className="text-gray-400">Customer</p>
                <p className="font-medium">John Doe</p>
              </div>

              <div>
                <p className="text-gray-400">Date Placed</p>
                <p className="font-medium">Aug 14, 2023</p>
              </div>

              <div>
                <p className="text-gray-400">Email</p>
                <p className="font-medium break-all">
                  gauravsingh.mini@gmail.com
                </p>
              </div>

              <div>
                <p className="text-gray-400">Order Total</p>
                <p className="font-medium">Rs. 2,031</p>
              </div>

              <div>
                <p className="text-gray-400">Shipping Address</p>
                <p className="font-medium">
                  Vill: Kishunapli, Deoria, UP, 274001
                </p>
              </div>

              <div>
                <p className="text-gray-400">Family Tree</p>
                <p className="font-medium">Gaurav’s Family Tree</p>
              </div>

              <div>
                <p className="text-gray-400">Wall Art ID</p>
                <p className="font-medium">WallArt ID</p>
              </div>

              <div>
                <p className="text-gray-400">Partner</p>
                <p className="font-medium">Printing Lab</p>
              </div>
            </div>
          </div>

          {/* IMAGE SECTION */}
          <div className="border rounded-xl p-5">
            <h3 className="text-xl font-semibold mb-4">
              Gaurav Singh Family Tree
            </h3>

            <div className="bg-black h-56 rounded-lg flex items-center justify-center text-white">
              Family Tree Preview
            </div>
          </div>

          {/* QUOTES */}
          <div className="border rounded-xl p-5">
            <h3 className="text-xl font-semibold mb-4">Quotes</h3>

            <p className="text-sm text-gray-400">Name of Wall Art</p>
            <p className="font-semibold mb-4">Gaurav Kushwaha Legacy</p>

            <p className="text-sm text-gray-400 mb-1">Quotes on Wall Art</p>
            <p className="text-gray-700 text-sm leading-6">
              The greatest purpose of life is to live it for something that
              will last longer than you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}