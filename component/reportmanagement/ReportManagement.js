"use client";

import { useState, useEffect } from "react";
import { axiosInstance } from "@/config/axios";
import {
  Users, Database, Wallet,
  Image as ImageIcon, TreeDeciduous, FlaskConical,
} from "lucide-react";
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  Tooltip, AreaChart, Area, XAxis, YAxis,
} from "recharts";

export default function ReportManagement() {
  const [stats, setStats]       = useState(null);
  const [loading, setLoading]   = useState(true);

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

  // ✅ Build cards from real API data
  const cardData = stats
    ? [
        {
          title:  "Total Users",
          number: stats.cards.totalUsers.toLocaleString(),
          bg:     "#FFE5D0",
          iconBg: "bg-orange-500",
          icon:   <Users size={22} className="text-white" />,
        },
        {
          title:  "Heritage Folders",
          number: stats.cards.heritageFolders.toLocaleString(),
          bg:     "#D0E7FF",
          iconBg: "bg-blue-500",
          icon:   <Database size={22} className="text-white" />,
        },
        {
          title:  "Tokens Sold",
          number: stats.cards.tokensSold.toLocaleString(),
          bg:     "#DFFFD6",
          iconBg: "bg-green-500",
          icon:   <Wallet size={22} className="text-white" />,
        },
        {
          title:  "Wall Art Orders",
          number: stats.cards.wallArtOrders.toLocaleString(),
          bg:     "#E9D1FF",
          iconBg: "bg-purple-500",
          icon:   <ImageIcon size={22} className="text-white" />,
        },
        {
          title:  "Active Family Trees",
          number: stats.cards.activeFamilyTrees.toLocaleString(),
          bg:     "#FFF1C8",
          iconBg: "bg-yellow-500",
          icon:   <TreeDeciduous size={22} className="text-white" />,
        },
        {
          title:  "DNA Kits Ordered",
          number: stats.cards.dnaKitsOrdered.toLocaleString(),
          bg:     "#FFD6E7",
          iconBg: "bg-pink-500",
          icon:   <FlaskConical size={22} className="text-white" />,
        },
      ]
    : [];

  const alertCards = [
    {
      title:     "Storage Alert",
      iconColor: "bg-red-100 text-red-600",
      desc:      "100 TB left, Immediate action required.",
    },
    {
      title:     "Shipping Delays",
      iconColor: "bg-yellow-100 text-yellow-600",
      desc:      `${stats?.cards.dnaKitsOrdered || 0} DNA kits ordered total.`,
    },
    {
      title:     "User Token Request",
      iconColor: "bg-blue-100 text-blue-600",
      desc:      `${stats?.tokenBreakdown?.[1]?.value || 0} token requests pending.`,
    },
    {
      title:     "Support Queries",
      iconColor: "bg-green-100 text-green-600",
      desc:      "400 unresolved help support queries.",
    },
  ];

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
        <h1 className="text-3xl font-bold text-gray-800">Reports & Analytics</h1>
        <p className="text-gray-500">Track key metrics and gain valuable insights</p>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
        {cardData.map((item, i) => (
          <div
            key={i}
            className="rounded-2xl p-5 shadow-md transition hover:scale-[1.02] hover:shadow-lg duration-200"
            style={{ background: item.bg }}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.iconBg}`}>
              {item.icon}
            </div>
            <div className="mt-4 text-3xl font-bold">{item.number}</div>
            <div className="text-gray-700 text-sm font-medium">{item.title}</div>
          </div>
        ))}
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* PIE 1 — Revenue share */}
        <div className="bg-white shadow-md rounded-xl p-4">
          <h2 className="font-semibold text-gray-700 mb-4">
            Wall Art Orders & DNA Kit Revenue
          </h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats?.revenueBreakdown || []}
                  cx="50%" cy="50%"
                  innerRadius={40} outerRadius={70}
                  paddingAngle={2} dataKey="value"
                >
                  {(stats?.revenueBreakdown || []).map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Legend */}
          <div className="flex gap-4 justify-center text-xs mt-2">
            {(stats?.revenueBreakdown || []).map((e, i) => (
              <span key={i} className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full inline-block" style={{ background: e.color }} />
                {e.name} ({e.value}%)
              </span>
            ))}
          </div>
        </div>

        {/* PIE 2 — Token breakdown */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="font-semibold text-gray-700 mb-4">Token Revenue Breakdown</h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats?.tokenBreakdown || []}
                  cx="50%" cy="50%"
                  innerRadius={45} outerRadius={75}
                  paddingAngle={4} dataKey="value"
                >
                  {(stats?.tokenBreakdown || []).map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 justify-center text-xs mt-2">
            {(stats?.tokenBreakdown || []).map((e, i) => (
              <span key={i} className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full inline-block" style={{ background: e.color }} />
                {e.name}: {e.value}
              </span>
            ))}
          </div>
        </div>

        {/* AREA CHART — Weekly Revenue */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="font-semibold text-gray-700 mb-4">Total Revenue (Last 4 Weeks)</h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats?.weeklyRevenue || []}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="10%" stopColor="#6C63FF" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#6C63FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(v) => `₹${v.toLocaleString()}`} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#6C63FF"
                  fill="url(#colorRev)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* DONUT — Wall Art Status */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="font-semibold text-gray-700 mb-4">Wall Art Order Status</h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats?.wallArtStatus || []}
                  cx="50%" cy="50%"
                  innerRadius={60} outerRadius={80}
                  paddingAngle={3} dataKey="value"
                >
                  {(stats?.wallArtStatus || []).map((_, i) => (
                    <Cell
                      key={i}
                      fill={["#27ae60", "#F6B93B", "#7868E6", "#e67e22"][i % 4]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-3 justify-center text-xs mt-2">
            {(stats?.wallArtStatus || []).map((e, i) => (
              <span key={i} className="flex items-center gap-1 capitalize">
                <span
                  className="w-3 h-3 rounded-full inline-block"
                  style={{ background: ["#27ae60","#F6B93B","#7868E6","#e67e22"][i % 4] }}
                />
                {e.name}: {e.value}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* ALERT CARDS */}
      <div className="bg-[#FBF7EF] shadow-md rounded-xl p-4">
        <h2 className="font-semibold text-gray-700 mb-3">System Alerts</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {alertCards.map((alert, i) => (
            <div key={i} className="p-4 rounded-xl bg-white shadow-sm flex gap-3 items-start">
              <div className={`p-2 rounded-lg ${alert.iconColor} font-bold text-lg`}>!</div>
              <div>
                <p className="font-semibold">{alert.title}</p>
                <p className="text-gray-500 text-sm">{alert.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}