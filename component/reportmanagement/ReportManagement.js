"use client";

import {
  Users,
  Database,
  Wallet,
  Image as ImageIcon,
  TreeDeciduous,
  FlaskConical,
} from "lucide-react";

import {
  PieChart, Pie, Cell, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, Tooltip, Area, AreaChart
} from "recharts";

export default function ReportManagement() {
  const pieData1 = [
    { name: "Wall Art", value: 38, color: "#F6B93B" },
    { name: "DNA Kit Revenue", value: 62, color: "#7868E6" },
  ];

  const pieData2 = [
    { name: "Family Tree", value: 12, color: "#27ae60" },
    { name: "Others", value: 88, color: "#e67e22" },
  ];

  const lineData = [
    { name: "week 1", value: 20 },
    { name: "week 2", value: 60 },
    { name: "week 3", value: 45 },
    { name: "week 4", value: 80 },
  ];

  const cardData = [
  {
    title: "Total Users",
    number: "24,847",
    bg: "#FFE5D0",
    iconBg: "bg-orange-500",
    icon: <Users size={22} className="text-white" />,
  },
  {
    title: "Heritage Vault",
    number: "7.8 TB",
    bg: "#D0E7FF",
    iconBg: "bg-blue-500",
    icon: <Database size={22} className="text-white" />,
  },
  {
    title: "Token Sold",
    number: "98,234",
    bg: "#DFFFD6",
    iconBg: "bg-green-500",
    icon: <Wallet size={22} className="text-white" />,
  },
  {
    title: "Wall Art Order",
    number: "456",
    bg: "#E9D1FF",
    iconBg: "bg-purple-500",
    icon: <ImageIcon size={22} className="text-white" />,
  },
  {
    title: "Active Family Trees",
    number: "15,632",
    bg: "#FFF1C8",
    iconBg: "bg-yellow-500",
    icon: <TreeDeciduous size={22} className="text-white" />,
  },
  {
    title: "DNA Kits Ordered",
    number: "1,847",
    bg: "#FFD6E7",
    iconBg: "bg-pink-500",
    icon: <FlaskConical size={22} className="text-white" />,
  },
];

  const alertCards = [
    {
      title: "Storage Alert",
      iconColor: "bg-red-100 text-red-600",
      desc: "100 TB left, Immediate action required.",
    },
    {
      title: "Shipping Delays",
      iconColor: "bg-yellow-100 text-yellow-600",
      desc: "300 DNA kits pending delivery.",
    },
    {
      title: "User Token Request",
      iconColor: "bg-blue-100 text-blue-600",
      desc: "150 token requests pending.",
    },
    {
      title: "Support Queries",
      iconColor: "bg-green-100 text-green-600",
      desc: "400 unresolved help support queries.",
    }
  ];

  return (
    <div className="p-6 space-y-8">

      {/* ------------------- HEADER ------------------- */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Reports & Analytics</h1>
        <p className="text-gray-500">Track key metrics and gain valuable insights</p>
      </div>

      {/* ------------------- TOP CARDS ------------------- */}
     {/* ------------------- TOP CARDS (IMPROVED RESPONSIVE) ------------------- */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
  {cardData.map((item, i) => (
    <div
      key={i}
      className="rounded-2xl p-5 shadow-md relative transition hover:scale-[1.02] hover:shadow-lg duration-200"
      style={{ background: item.bg }}
    >
      {/* ICON */}
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl ${item.iconBg}`}
      >
        {item.icon}
      </div>

      <div className="mt-4 text-3xl font-bold">{item.number}</div>
      <div className="text-gray-700 text-sm font-medium">{item.title}</div>
    </div>
  ))}
</div>


      {/* ------------------- CHART GRID ------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Pie Chart 1 */}
        <div className="bg-white shadow-md rounded-xl p-4">
          <h2 className="font-semibold text-gray-700 mb-4">Wall Art Orders & DNA Kit Revenue</h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData1}
                  cx="50%" cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData1.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart 2 */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="font-semibold text-gray-700 mb-4">Token Revenue Breakdown</h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData2}
                  cx="50%" cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData2.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="font-semibold text-gray-700 mb-4">Total Revenue</h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={lineData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="10%" stopColor="#6C63FF" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#6C63FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#6C63FF" fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="font-semibold text-gray-700 mb-4">Token Expenses</h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData2}
                  cx="50%" cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {pieData2.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* ------------------- ALERT CARDS ------------------- */}
      <div className="bg-[#FBF7EF] shadow-md rounded-xl p-4">
        <h2 className="font-semibold text-gray-700 mb-3">Active Blogs</h2>

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
