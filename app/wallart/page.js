"use client";

import React, { useState } from "react";
import Header from "@/component/wallart/Header";
import FilterBar from "@/component/wallart/FilterBar";
import OrderList from "@/component/wallart/OrderList";

export default function Page() {
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <div className="min-h-screen bg-[#EAF3EE] p-5">
      <div className="max-w-7xl mx-auto space-y-5">

        <Header />

    
        <FilterBar />

  

        {activeTab === "orders" ? (
          <OrderList />
        ) : (
          <div className="bg-white rounded-xl border p-8 text-center text-gray-500">
            No reports found.
          </div>
        )}

      </div>
    </div>
  );
}