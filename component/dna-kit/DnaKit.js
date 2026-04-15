"use client";
import React, { useState } from "react";
import { Lato, Playfair_Display } from "next/font/google";
import {
  ArrowRightFromLine,
} from "lucide-react";

import OrderList from "./OrderList";
import OrderDetailsModal from "./OrderDetailsModal";
import LabsManagement from "./LabsManagement";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
});

/* ---------------- REPORTS ---------------- */
const ReportsList = () => {
  return (
    <div className="bg-white border border-gray-300 mt-6 rounded-xl shadow-sm p-4 md:p-6">
      <h2 className="text-lg md:text-xl font-bold text-gray-700 mb-3">
        Reports
      </h2>
      <p className="text-sm md:text-base text-gray-600">
        No reports available right now.
      </p>
    </div>
  );
};

/* ---------------- MAIN COMPONENT ---------------- */
const DnaKit = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [filters, setFilters] = useState({
    date: "",
    status: "",
    category: "",
  });

  const [appliedFilters, setAppliedFilters] = useState(null);

  const applyFilters = () => {
    setAppliedFilters({ ...filters });
  };

  const resetFilters = () => {
    setFilters({ date: "", status: "", category: "" });
    setAppliedFilters(null);
  };

  return (
    <div className="w-full min-h-screen p-3 sm:p-4 md:p-6">

      {/* HEADER */}
      <div className="bg-[#F6F1E9] border mt-4 border-gray-300 p-4 sm:p-6 md:p-8 rounded-xl shadow-sm">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">

          <div>
            <h1
              className={`${playfair.className} text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800`}
            >
              DNA Kit
            </h1>

            <p
              className={`${lato.className} text-sm sm:text-base md:text-lg text-gray-600 mt-2 md:mt-3`}
            >
              Upload, verify, and publish DNA reports.
            </p>
          </div>

          <button className="bg-[#265A46] flex items-center justify-center gap-2 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg w-full sm:w-auto">
            <ArrowRightFromLine size={18} />
            Export List
          </button>
        </div>
      </div>

      {/* ---------------- TABS ---------------- */}
      <div className="border-b border-gray-400 bg-[#F6F1E9] mt-6 overflow-x-auto">
        <div className="flex min-w-max">
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 sm:px-6 py-3 text-sm sm:text-base whitespace-nowrap ${
              activeTab === "orders"
                ? "border-b-2 text-[#99512F]"
                : ""
            }`}
          >
            Orders
          </button>

          <button
            onClick={() => setActiveTab("reports")}
            className={`px-4 sm:px-6 py-3 text-sm sm:text-base whitespace-nowrap ${
              activeTab === "reports"
                ? "border-b-2 text-[#99512F]"
                : ""
            }`}
          >
            Reports
          </button>

          <button
            onClick={() => setActiveTab("labs")}
            className={`px-4 sm:px-6 py-3 text-sm sm:text-base whitespace-nowrap ${
              activeTab === "labs"
                ? "border-b-2 text-[#99512F]"
                : ""
            }`}
          >
            Labs
          </button>
        </div>
      </div>

      {/* ---------------- FILTER (ONLY ORDERS) ---------------- */}
      {activeTab === "orders" && (
        <div className="bg-[#F6F1E9] border border-[#E4E6E2] p-3 sm:p-4 mt-5 rounded-lg">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">

            {/* Date */}
            <input
              type="date"
              value={filters.date}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  date: e.target.value,
                }))
              }
              className="bg-white border border-[#D6D9D3] px-3 py-2 text-sm rounded-md outline-none w-full"
            />

            {/* Status */}
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  status: e.target.value,
                }))
              }
              className="bg-white border border-[#D6D9D3] px-3 py-2 text-sm rounded-md outline-none w-full"
            >
              <option value="">By Status</option>
              <option value="order_confirmed">Order Confirmed</option>
              <option value="order_dispatched">Dispatched</option>
              <option value="delivered">Delivered</option>
            </select>

            {/* Category */}
            <select
              value={filters.category || ""}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  category: e.target.value,
                }))
              }
              className="bg-white border border-[#D6D9D3] px-3 py-2 text-sm rounded-md outline-none w-full"
            >
              <option value="">By Category</option>
              <option value="dna">DNA</option>
              <option value="health">Health</option>
            </select>

            {/* Apply */}
            <button
              onClick={applyFilters}
              className="bg-[#8B4A2F] hover:bg-[#6f3a24] text-white px-4 py-2 text-sm rounded-md w-full"
            >
              Apply Filter
            </button>

            {/* Reset */}
            <button
              onClick={resetFilters}
              className="bg-gray-200 hover:bg-gray-300 px-3 py-2 text-sm rounded-md w-full"
            >
              Reset
            </button>

          </div>
        </div>
      )}

      {/* ---------------- MAIN CONTENT ---------------- */}
      {activeTab === "orders" ? (
        <OrderList
          onView={setSelectedOrder}
          filters={appliedFilters}
        />
      ) : activeTab === "reports" ? (
        <ReportsList />
      ) : (
        <LabsManagement />
      )}

      {/* MODAL */}
      {selectedOrder && (
        <OrderDetailsModal
          orderId={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default DnaKit;