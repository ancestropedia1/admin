"use client";

import { useState, useEffect } from "react";
import { axiosInstance } from "@/config/axios";

import ReportCards from "./ReportCards";
import RevenueBreakdownChart from "./RevenueBreakdownChart";
import TokenBreakdownChart from "./TokenBreakdownChart";
import WeeklyRevenueChart from "./WeeklyRevenueChart";
import WallArtStatusChart from "./WallArtStatusChart";
import SystemAlerts from "./SystemAlerts";

export default function ReportManagement() {
  const [stats, setStats]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosInstance.get("/admin/reports/stats");
        if (res.data.success) setStats(res.data.data);
      } catch (err) {
        console.error("Failed to fetch report stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        Loading reports...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Reports & Analytics
        </h1>
        <p className="text-gray-500">
          Track key metrics and gain valuable insights
        </p>
      </div>

      {/* CARDS */}
      <ReportCards cards={stats?.cards} />

      {/* CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RevenueBreakdownChart data={stats?.revenueBreakdown} />
        <TokenBreakdownChart   data={stats?.tokenBreakdown} />
        <WeeklyRevenueChart    data={stats?.weeklyRevenue} />
        <WallArtStatusChart    data={stats?.wallArtStatus} />
      </div>

      {/* ALERTS */}
      <SystemAlerts stats={stats} />

    </div>
  );
}